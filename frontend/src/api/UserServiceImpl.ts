import User from "../domain/User";
import {UserService} from "./UserService";

export default class UserServiceImpl {
    public async fetchUsers(): Promise<User[]> {
        const request: RequestInit = {
            // headers: Jwt.getHeaders(),
            method: "GET",
        };
        const response: Response = await fetch(this.getApiUrl(), request);
        return response.json();
    }

    public async newUser(): Promise<User[]> {
        let updatedUsers = [...await this.fetchUsers(), new User("", "", "")];
        return updatedUsers;
    }

    public async create(user: User): Promise<User> {
        const request: RequestInit = {
            body: JSON.stringify(user),
            // headers: Jwt.getHeaders(),
            method: "POST",
        };
        const response: Response = await fetch(this.getApiUrl(), request);
        return response.json();
    }

    public async delete(user: User): Promise<void> {
        const request: RequestInit = {
            // headers: Jwt.getHeaders(),
            method: "DELETE",
        };
        await fetch(this.getApiUrl() + user.id, request);
    }

    public async update(user: User): Promise<void> {
        const request: RequestInit = {
            body: JSON.stringify(user),
            // headers: Jwt.getHeaders(),
            method: "PUT",
        };
        await fetch(this.getApiUrl() + user.id, request);
    }

    public getApiUrl(): string {
        return `http://${process.env.HOST}:${process.env.PORT}/api/users/`;
    }
}
