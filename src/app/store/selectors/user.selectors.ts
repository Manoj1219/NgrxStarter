import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../states/user.state';

// Feature selector
export const selectUserState = createFeatureSelector<UserState>('users');

// Get all users
export const selectAllUsers = createSelector(
    selectUserState,
    (state: UserState) => state.users
);
