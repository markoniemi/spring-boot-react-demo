import User from "../domain/User";

export default class UserApi {
    private static users: User[] = JSON.parse(localStorage.getItem("users"));

    public static initialize() {
        const users: User[] = [{id: 1, username: "username1", password: "password", email: "email1"},
            {id: 2, username: "username2", password: "password", email: "email2"},
            {id: 3, username: "username3", password: "password", email: "email3"},
            {id: 4, username: "username4", password: "password", email: "email4"}];
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
