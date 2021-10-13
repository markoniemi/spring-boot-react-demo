import User from "./User";

export interface ILoginState {
    isAuthenticated: boolean;
    token?: string;
    user?: User;
}
