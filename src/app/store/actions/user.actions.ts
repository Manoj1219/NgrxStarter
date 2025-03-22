import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

// Store Users
export const storeUsers = createAction(
  '[User] Store Users',
  props<{ users: User[] }>()
);

// Update User
export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);
