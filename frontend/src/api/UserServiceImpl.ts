import User from "../domain/User";
import { UserService } from "./UserService";

export default class UserServiceImpl implements UserService {
    public async fetchUsers(): Promise<User[]> {
        const request: RequestInit = {
            headers: this.getHeaders(),
            method: "GET",
        };
        const response: Response = await fetch(this.getApiUrl(), request);
        return response.json();
    }

    public async findById(id: number): Promise<User> {
        const request: RequestInit = {
            headers: this.getHeaders(),
            method: "GET",
        };
        const response: Response = await fetch(this.getApiUrl() + id, request);
        return response.json();
    }

    public async newUser(): Promise<User[]> {
        return [...(await this.fetchUsers()), new User("", "", "")];
    }

    public async create(user: User): Promise<User> {
        const request: RequestInit = {
            body: JSON.stringify(user),
            headers: this.getHeaders(),
            method: "POST",
        };
        const response: Response = await fetch(this.getApiUrl(), request);
        return response.json();
    }

    public async delete(id: number): Promise<void> {
        const request: RequestInit = {
            headers: this.getHeaders(),
            method: "DELETE",
        };
        await fetch(this.getApiUrl() + id, request);
    }

    public async update(user: User): Promise<User> {
        const request: RequestInit = {
            body: JSON.stringify(user),
            headers: this.getHeaders(),
            method: "PUT",
        };
        const response: Response = await fetch(this.getApiUrl() + user.id, request);
        return response.json();
    }

    public getApiUrl(): string {
        // return `http://${process.env.HOST}:${process.env.PORT}/api/rest/users/`;
        // return `http://localhost:8081/api/rest/users/`;
        return `/api/rest/users/`;
    }

    private getHeaders(): Headers {
        return new Headers({ "content-type": "application/json" });
    }
}
