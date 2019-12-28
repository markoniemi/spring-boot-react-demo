import User from "../domain/User";

export interface UserService {
    fetchUsers(): Promise<User[]>;

    create(newUser: User): Promise<User[]>;

    update(editedUser: User): Promise<User[]>;

    delete(id: number): Promise<User[]>;
}