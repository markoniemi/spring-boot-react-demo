import React, {Component} from "react";
import "../App.css";
import UserList from "./UserList";
import Hello from "./Hello";
import UserApi from "../api/UserApi";
import User from "../domain/User";

interface AppState {
    users: User[];
}

class App extends Component<Readonly<{}>, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.submitUser = this.submitUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    public componentWillMount() {
        this.fetchUsers();
    }

    public addUser() {
        UserApi.create();
        this.fetchUsers();
    }

    public deleteUser(id: number) {
        if (window.confirm("Do you want to delete this item") === true) {
            UserApi.delete(id);
            this.fetchUsers();
        }
    }

    public submitUser(user: User) {
        UserApi.update(user);
        this.fetchUsers();
    }

    private fetchUsers() {
        let users: User[] = UserApi.getUsers();
        this.setState((prevState, props) => ({users: users}));
    }

    public render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    Users
                                </div>
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
                </div>
                <Hello/>
            </div>
        );
    }
}

export default App;
