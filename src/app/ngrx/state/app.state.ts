import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { authReducer, AuthState, initialAuthState } from '../reducers/auth.reducer';

export interface BaseState {
  isLoading: boolean;
  errorStatus: number | null;
}

export interface AppState {
  authState: AuthState;
}

export const initialAppState: AppState = {
  authState: initialAuthState,
};

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze]
  : [];
