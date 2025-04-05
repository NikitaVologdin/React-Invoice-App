import { UserInfo } from "./user";

export interface authError extends Error {
  code: string;
  message: string;
  stack: string;
}

export interface AuthState {
  loading: boolean;
  userInfo: UserInfo | null;
  error: string | null;
  success: boolean;
}
