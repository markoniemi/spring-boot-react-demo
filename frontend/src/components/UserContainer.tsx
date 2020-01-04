import React, { Component } from "react";
import "../App.css";
import UserList from "./UserList";
import User from "../domain/User";
import { UserService } from "../api/UserService";
import UserServiceImpl from "../api/UserServiceImpl";
import Hello from "./Hello";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Panel, Button, Glyphicon, Table } from "react-bootstrap";

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
            <Panel>
                <Panel.Heading>Users</Panel.Heading>
                <Panel.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <UserList deleteUser={this.deleteUser} users={this.state.users} />
                    </Table>
                    <Button id="addUser" bsStyle="primary" onClick={this.addUser}>
                        <Glyphicon glyph="glyphicon glyphicon-plus" />
                    </Button>
                </Panel.Body>
                <Panel.Footer>
                    <Hello />
                </Panel.Footer>
            </Panel>
        );
    }

    private async fetchUsers(): Promise<void> {
        const users: User[] = await this.userService.fetchUsers();
        this.setState((prevState, props) => ({ users: users }));
    }
}

export default withRouter(UserContainer);
