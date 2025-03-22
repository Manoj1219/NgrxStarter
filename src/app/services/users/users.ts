import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment"
import { User } from "../../store/models/user.model";

@Injectable({
    providedIn: "root",
})
export class UsersService {
    private apiUrl = environment.API_URL;
    constructor(private httpClient: HttpClient) { }
    getUsersList(): Observable<any> {
        return this.httpClient.get(this.apiUrl + "users");
    }
    updateUser(user: User): Observable<any> {
        return this.httpClient.patch(this.apiUrl + "users/" + user.id, { user });
    }
    getUser(id: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + "users/" + id);
    }
}
