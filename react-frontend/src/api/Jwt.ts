export default class Jwt {
    // private static readonly debug: Debug.IDebugger = Debug("Jwt");
    public static readonly JWT_TOKEN_KEY = "jwt";

    public static getHeaders(): Headers {
        const jwtToken: string = sessionStorage.getItem(Jwt.JWT_TOKEN_KEY);
        // this.debug(`setting jwt to header: ${jwtToken}`);
        return new Headers({ "content-type": "application/json", Authorization: `Bearer ${jwtToken}` });
    }

    public static isAuthenticated(): boolean {
        // TODO verify token and timestamp
        return !(Jwt.getToken() === null);
    }

    public static setToken(token: string): void {
        sessionStorage.setItem(Jwt.JWT_TOKEN_KEY, token);
    }

    public static getToken(): string {
        return sessionStorage.getItem(Jwt.JWT_TOKEN_KEY);
    }

    public static clearToken(): void {
        sessionStorage.removeItem(Jwt.JWT_TOKEN_KEY);
    }
}
