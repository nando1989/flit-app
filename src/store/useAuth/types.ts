import { Unsubscribe, User } from 'firebase/auth';

export type TActions = {
  checkAuth(): Unsubscribe;
  signIn(data: ISignInPayload): Promise<void>;
  signOut(): Promise<void>;
};

export type TState = TActions & {
  currentUser: User | null;
  loadingAuth: boolean;
};

interface ISignInPayload {
  email: string;
  password: string;
}
