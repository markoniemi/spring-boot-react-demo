import User from "../domain/User";
import {UserService} from "./UserService";

export default class UserServiceMock implements UserService {
    private users: User[] = JSON.parse(localStorage.getItem("users"));

    constructor() {
        this.initialize();
    }

    public initialize() {
        const users = [new User("username1", "password", "email1", 1),
            new User("username2", "password", "email2", 2),
            new User("username3", "password", "email3", 3),
            new User("username4", "password", "email4", 4)
        ];
        if (localStorage.getItem("users") === null) {
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    public async fetchUsers(): Promise<User[]> {
        return this.users;
    }

    private createId(): number {
        return Math.max(...this.users.map((user: User) => user.id)) + 1;
    }

    public async create(newUser: User): Promise<User> {
        newUser.id = this.createId();
        let updatedUsers = [...this.users, newUser];
        this.users = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return newUser;
    }

    public async update(editedUser: User): Promise<User> {
        let updatedUsers = this.users.map((user: User) => {
            if (user.id === editedUser.id) {
                user.username = editedUser.username;
                user.password = editedUser.password;
                user.email = editedUser.email;
            }
            return user;
        });
        this.users = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return editedUser;
    }

    public async delete(id: number): Promise<void> {
        let filteredUsers = this.users.filter((user: User) => user.id !== id);
        this.users = filteredUsers;
        localStorage.setItem("users", JSON.stringify(filteredUsers));
    }
}

