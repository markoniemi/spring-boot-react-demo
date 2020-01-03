import React, { Component } from "react";
import "../App.css";
import UserList from "./UserList";
import User from "../domain/User";
import { UserService } from "../api/UserService";
import UserServiceImpl from "../api/UserServiceImpl";
import Hello from "./Hello";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface UserContainerState {
    users: User[];
}

class UserContainer extends Component<RouteComponentProps, UserContainerState> {
    private userService: UserService = new UserServiceImpl();

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    public async componentWillMount(): Promise<void> {
        await this.fetchUsers();
    }

    public addUser(): void {
        this.props.history.push("/users/new");
    }

    public async deleteUser(id: number): Promise<void> {
        if (window.confirm("Do you want to delete this item") === true) {
            await this.userService.delete(id);
            this.fetchUsers();
        }
    }

    public render(): JSX.Element {
        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">Users</div>
                            <div className="card-body">
                                <table className="table table-hover">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <UserList deleteUser={this.deleteUser} users={this.state.users} />
                                </table>
                                <button id="addUser" className="btn btn-dark pull-left" onClick={this.addUser}>
                                    Add New
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Hello />
            </div>
        );
    }

    private async fetchUsers(): Promise<void> {
        const users: User[] = await this.userService.fetchUsers();
        this.setState((prevState, props) => ({ users: users }));
    }
}

export default withRouter(UserContainer);
