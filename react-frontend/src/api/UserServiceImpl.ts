import User from "../domain/User";
import UserService from "./UserService";

export default class UserServiceImpl implements UserService {
    public async fetchUsers(): Promise<User[]> {
        const request: RequestInit = {
            headers: this.getHeaders(),
            method: "GET",
        };
        const response: Response = await fetch(this.getApiUrl(), request);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error loading users");
        }
    }

    public async findById(id: number): Promise<User> {
        const request: RequestInit = {
            headers: this.getHeaders(),
            method: "GET",
        };
        const response: Response = await fetch(this.getApiUrl() + id, request);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error loading user");
        }
    }

    public async create(user: User): Promise<User> {
        const request: RequestInit = {
            body: JSON.stringify(user),
            headers: this.getHeaders(),
            method: "POST",
        };
        const response: Response = await fetch(this.getApiUrl(), request);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error saving user");
        }
    }

    public async delete(id: number): Promise<void> {
        const request: RequestInit = {
            headers: this.getHeaders(),
            method: "DELETE",
        };
        const response: Response = await fetch(this.getApiUrl() + id, request);
        if (!response.ok) {
            throw new Error("Error deleting user");
        }
    }

    public async update(user: User): Promise<User> {
        const request: RequestInit = {
            body: JSON.stringify(user),
            headers: this.getHeaders(),
            method: "PUT",
        };
        const response: Response = await fetch(this.getApiUrl() + user.id, request);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error updating user");
        }
    }

    public getApiUrl(): string {
        // return `http://${process.env.HOST}:${process.env.PORT}/api/rest/users/`;
        // return `http://localhost:8081/api/rest/users/`;
        return `/api/rest/users/`;
    }

    // need to import isomorphic-fetch in test case for Headers to work
    private getHeaders(): Headers {
        return new Headers({ "content-type": "application/json" });
    }
}
