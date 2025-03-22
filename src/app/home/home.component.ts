import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';
import { UsersService } from '../services/users/users';
import { selectAllUsers } from '../store/selectors/user.selectors';
import { storeUsers, updateUser } from '../store/actions/user.actions';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styles: [``]
})
export class HomeComponent implements OnInit {
    users$: Observable<User[]>; // Users from store
    userForm: FormGroup;
    isLoading = true;

    constructor(private store: Store, private us: UsersService, private fb: FormBuilder) {
        this.users$ = this.store.select(selectAllUsers);

        this.userForm = this.fb.group({
            users: this.fb.array([])
        });
    }

    ngOnInit(): void {
        this.getUsersList();
    }

    get users(): FormArray {
        return this.userForm.get('users') as FormArray;
    }

    getUsersList() {
        this.isLoading = true;
        this.us.getUsersList().subscribe({
            next: (resp: any) => {
                this.userForm.setControl('users', this.fb.array(
                    resp.map((u: any) => this.fb.group({
                        id: u.id,
                        name: u.name,
                        username: u.username,
                        email: u.email,
                        isEditing: false,
                        isLoading: false
                    }))
                ));
                const filteredUsers = this.userForm.value.users.map((user: { isEditing: boolean; isLoading: boolean;[key: string]: any }) => {
                    const { isEditing, isLoading, ...rest } = user;
                    return rest;
                });
                this.store.dispatch(storeUsers({ users: filteredUsers }));
            },
            error: (err: any) => console.log(err)
        });
        this.isLoading = false;
    }

    saveUser(i: number) {
        const user = this.users.at(i).value;
        delete user.isEditing;
        delete user.isLoading;
        this.users.at(i).disable();
        this.users.at(i).patchValue({ isLoading: true });
        this.us.updateUser(user).subscribe({
            next: () => {
                this.store.dispatch(updateUser({ user: { ...user } }));
                this.users.at(i).patchValue({ ...user, isEditing: false, isLoading: false });
                this.users.at(i).reset(this.users.at(i).value);
                this.users.at(i).enable();
            },
            error: (err: any) => console.log(err)
        });
    }

    toggleEdit(i: number) {
        const isEditing = this.users.at(i).value.isEditing;
        if (isEditing) {
            this.users$.subscribe({
                next: (users: any) => {
                    if (users) {
                        const userFromStore = users[i];
                        this.users.at(i).patchValue({ ...userFromStore, isEditing: false });
                        this.users.at(i).reset(this.users.at(i).value);
                    }
                }
            });
        } else {
            this.users.at(i).patchValue({ isEditing: true });
        }
    }
}
