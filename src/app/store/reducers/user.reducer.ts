import { createReducer, on } from '@ngrx/store';
import { storeUsers, updateUser } from '../actions/user.actions';
import { initialState } from '../states/user.state';

export const userReducer = createReducer(
    initialState,

    // Store user
    on(storeUsers, (state, { users }) => ({
        ...state,
        users: users,
    })),

    // Update user
    on(updateUser, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? { ...user } : u),
    }))
);
