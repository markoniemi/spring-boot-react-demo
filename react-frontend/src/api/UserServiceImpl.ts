import User from "../domain/User";
import UserService from "./UserService";
import Http from "./Http";

export default class UserServiceImpl implements UserService {
    public async fetchUsers(): Promise<User[]> {
        const response: Response = await Http.get(this.getApiUrl());
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("error.load.users");
        }
    }

    public async findById(id: number): Promise<User> {
        const response: Response = await Http.get(this.getApiUrl() + id);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("error.load.user");
        }
    }

    public async create(user: User): Promise<User> {
        const response: Response = await Http.post(this.getApiUrl(), JSON.stringify(user));
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("error.save.user");
        }
    }

    public async delete(id: number): Promise<void> {
        const response: Response = await Http.delete(this.getApiUrl() + id);
        if (!response.ok) {
            throw new Error("error.delete.user");
        }
    }

    public async update(user: User): Promise<User> {
        const response: Response = await Http.update(this.getApiUrl() + user.id, JSON.stringify(user));
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("error.save.user");
        }
    }

    public getApiUrl(): string {
        // return `http://${process.env.HOST}:${process.env.PORT}/api/rest/users/`;
        // return `http://localhost:8081/api/rest/users/`;
        return `/api/rest/users/`;
    }
}
