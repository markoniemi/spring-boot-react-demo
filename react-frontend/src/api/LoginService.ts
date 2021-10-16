import { ILoginForm } from "../components/LoginForm";
import User from "../domain/User";
import Http from "./Http";
import Jwt from "./Jwt";

export default class LoginService {
    // private static readonly debug: Debug.IDebugger = Debug("LoginApi");

    public static async login(loginForm: ILoginForm): Promise<string> {
        const response: Response = await Http.post(this.getApiUrl(), JSON.stringify(loginForm));
        if (!response.ok) {
            throw new Error("login.error");
        }
        return response.text();
    }

    public static async logout(): Promise<void> {
        Jwt.clearToken();
    }

    public static getApiUrl(): string {
        return `http://localhost:8080/api/rest/auth/login/`;
        // return `http://${process.env.HOST}:${process.env.PORT}/api/rest/auth/login/`;
    }
}
