import { User } from '../models/user.model';

export interface UserState {
    users: User[];
}

export const initialState: UserState = {
    users: [],
};
