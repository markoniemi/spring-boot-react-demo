import Jwt from "./Jwt";

export default class Http {
    public static async post(url: string, body: any): Promise<Response> {
        return fetch(url, Http.createRequest("POST", body));
    }

    public static async update(url: string, body: any): Promise<Response> {
        return fetch(url, Http.createRequest("PUT", body));
    }

    public static async get(url: string, body?: any): Promise<Response> {
        return fetch(url, Http.createRequest("GET", body));
    }

    public static async delete(url: string, body?: any): Promise<Response> {
        return fetch(url, Http.createRequest("DELETE", body));
    }

    private static createRequest(method: string, body: any) {
        return {
            method: method,
            headers: Jwt.getHeaders(),
            body: body,
        };
    }
}
