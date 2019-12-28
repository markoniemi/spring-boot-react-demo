import User from "../domain/User";

export default class UserServiceImpl {
  public static async fetchUsers(): Promise<User[]> {
    const request: RequestInit = {
      // headers: Jwt.getHeaders(),
      method: "GET",
    };
    const response: Response = await fetch(UserServiceImpl.getApiUrl(), request);
    return response.json();
  }

  public static async create(): Promise<User[]> {
    let updatedUsers = [...await this.fetchUsers(), new User("", "", "")];
    return updatedUsers;
  }
  public static async addUser(user: User): Promise<User> {
    const request: RequestInit = {
      body: JSON.stringify(user),
      // headers: Jwt.getHeaders(),
      method: "POST",
    };
    const response: Response = await fetch(UserServiceImpl.getApiUrl(), request);
    return response.json();
  }

  public static async removeUser(user: User): Promise<void> {
    const request: RequestInit = {
      // headers: Jwt.getHeaders(),
      method: "DELETE",
    };
    await fetch(UserServiceImpl.getApiUrl() + user.id, request);
  }

  public static async editUser(user: User): Promise<void> {
    const request: RequestInit = {
      body: JSON.stringify(user),
      // headers: Jwt.getHeaders(),
      method: "PUT",
    };
    await fetch(UserServiceImpl.getApiUrl() + user.id, request);
  }
  public static getApiUrl(): string {
    return `http://${process.env.HOST}:${process.env.PORT}/api/users/`;
  }
}
