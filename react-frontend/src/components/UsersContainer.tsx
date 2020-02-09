import React, { Component } from "react";
import User from "../domain/User";
import UserService from "../api/UserService";
import UserServiceImpl from "../api/UserServiceImpl";
import Hello from "./Hello";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Button, Table, Card } from "react-bootstrap";
import UserItem from "./UserRow";
import Message, { MessageType } from "../domain/Message";
import Messages from "./Messages";

export interface UsersContainerState {
    users: User[];
    messages?: ReadonlyArray<Message>;
}

class UsersContainer extends Component<RouteComponentProps, UsersContainerState> {
    private userService: UserService = new UserServiceImpl();

    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    public async componentWillMount(): Promise<void> {
        try {
            await this.fetchUsers();
        } catch (error) {
            this.setState({ messages: [{ text: error.toString(), type: MessageType.ERROR }] });
        }
    }

    public addUser(): void {
        this.props.history.push("/users/new");
    }

    public async deleteUser(id: number): Promise<void> {
        if (window.confirm("Do you want to delete this item") === true) {
            try {
                await this.userService.delete(id);
            } catch (error) {
                this.setState({ messages: [{ text: error.toString(), type: MessageType.ERROR }] });
            }
            this.fetchUsers();
        }
    }

    public render(): JSX.Element {
        let userItems;
        if (this.state.users) {
            userItems = this.state.users.map((item, index) => (
                <UserItem key={index} user={item} index={index} deleteUser={this.deleteUser} />
            ));
        }
        return (
            <Card>
                <Card.Title>
                    <FormattedMessage id="users" />
                </Card.Title>
                <Card.Body>
                    <Messages messages={this.state.messages} />
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    <FormattedMessage id="username" />
                                </th>
                                <th>
                                    <FormattedMessage id="email" />
                                </th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>{userItems}</tbody>
                    </Table>
                    <Button id="addUser" variant="primary" onClick={this.addUser}>
                        Plus
                        {/*<Glyphicon glyph="glyphicon glyphicon-plus" />*/}
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <Hello />
                </Card.Footer>
            </Card>
        );
    }

    private async fetchUsers(): Promise<void> {
        let users: User[];
        try {
            users = await this.userService.fetchUsers();
        } catch (error) {
            this.setState({ messages: [{ text: error.toString(), type: MessageType.ERROR }] });
        }
        this.setState((prevState, props) => ({ users: users }));
    }
}

export default withRouter(UsersContainer);
