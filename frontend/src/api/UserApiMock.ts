import User from "../domain/User";

export default class UserApiMock {
    private static users: User[] = JSON.parse(localStorage.getItem("users"));

    public static initialize() {
        const users = [new User("username1", "password", "email1", 1),
            new User("username2", "password", "email2", 2),
            new User("username3", "password", "email3", 3),
            new User("username4", "password", "email4", 4)
        ]
        if (localStorage.getItem("users") === null) {
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    public static fetchUsers(): User[] {
        return UserApiMock.users;
    }

    public static create(): User[] {
        let updatedUsers = [...UserApiMock.users, new User("", "", "", UserApiMock.createId())];
        UserApiMock.users = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return UserApiMock.users;
    }

    private static createId() {
        return Math.max(...UserApiMock.users.map((user: User) => user.id)) + 1;
    }

    public static update(editedUser: User): User[] {
        let updatedUsers = UserApiMock.users.map((user: User) => {
            if (user.id === editedUser.id) {
                user.username = editedUser.username;
                user.password = editedUser.password;
                user.email = editedUser.email;
            }
            return user;
        });
        UserApiMock.users = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return UserApiMock.users;
    }

    public static delete(id: number): User[] {
        let filteredUsers = UserApiMock.users.filter((user: User) => user.id !== id);
        UserApiMock.users = filteredUsers;
        localStorage.setItem("users", JSON.stringify(filteredUsers));
        return UserApiMock.users;
    }
}

UserApiMock.initialize();
