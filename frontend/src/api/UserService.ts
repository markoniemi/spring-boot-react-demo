import User from "../domain/User";

export interface UserService {
    fetchUsers(): User[];

    create(newUser: User): User[];

    update(editedUser: User): User[];

    delete(id: number): User[];
}