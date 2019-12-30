import React, { Component } from "react";
import "../App.css";
import UserList from "./UserList";
import UserServiceMock from "../api/UserServiceMock";
import User from "../domain/User";
import { UserService } from "../api/UserService";

interface UserContainerState {
    users: User[];
}

class UserContainer extends Component<Readonly<{}>, UserContainerState> {
    private userService: UserService = new UserServiceMock();

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.submitUser = this.submitUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    public async componentWillMount(): Promise<void> {
        await this.fetchUsers();
    }

    public addUser(): void {
        const updatedUsers = [...this.state.users, new User("", "", "")];
        this.setState((prevState, props) => ({ users: updatedUsers }));
    }

    public async deleteUser(id: number): Promise<void> {
        if (window.confirm("Do you want to delete this item") === true) {
            await this.userService.delete(id);
            this.fetchUsers();
        }
    }

    public async submitUser(user: User): Promise<void> {
        if (user.id == undefined) {
            await this.userService.create(user);
        } else {
            await this.userService.update(user);
        }
        this.fetchUsers();
    }

    private async fetchUsers(): Promise<void> {
        const users: User[] = await this.userService.fetchUsers();
        this.setState((prevState, props) => ({ users: users }));
    }

    public render(): JSX.Element {
        return (
            <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">Users</div>
                        <div className="card-body">
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Email</th>
                                    <th>Edit/Save</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <UserList
                                    deleteUser={this.deleteUser}
                                    users={this.state.users}
                                    submitUser={this.submitUser}
                                />
                            </table>
                            <button id="addUser" className="btn btn-dark pull-left" onClick={this.addUser}>
                                Add New
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserContainer;
