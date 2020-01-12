export default class User {
    public id?: number;
    public username: string;
    public password: string;
    public email: string;

    constructor(username?: string, password?: string, email?: string, id?: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
