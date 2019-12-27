import User from "../domain/User";

export default class UserApi {
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

    public static getUsers(): User[] {
        return UserApi.users;
    }

    public static create() {
        let updatedUsers = [...UserApi.users, new User("", "", "", UserApi.createId())];
        UserApi.users = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    private static createId() {
        return Math.max(...UserApi.users.map((user: User) => user.id)) + 1;
    }

    public static update(editedUser: User) {
        let updatedUsers = UserApi.users.map((user: User) => {
            if (user.id === editedUser.id) {
                user.username = editedUser.username;
                user.password = editedUser.password;
                user.email = editedUser.email;
            }
            return user;
        });
        UserApi.users = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    public static delete(id: number) {
        let filteredUsers = UserApi.users.filter((user: User) => user.id !== id);
        UserApi.users = filteredUsers;
        localStorage.setItem("users", JSON.stringify(filteredUsers));
    }
}

UserApi.initialize();
