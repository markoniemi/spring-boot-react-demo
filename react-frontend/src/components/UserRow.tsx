import React, { Component } from "react";
import User from "../domain/User";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export interface UserProps {
    user: User;

    deleteUser(id: number);
}

class UserRow extends Component<RouteComponentProps & UserProps, Readonly<{}>> {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    public delete(): void {
        const { id } = this.props.user;
        this.props.deleteUser(id);
    }

    public editUser(): void {
        const { id } = this.props.user;
        this.props.history.push("/users/" + id);
    }

    public render(): JSX.Element {
        const user: User = this.props.user;
        return (
            <tr id={user.username} key={this.props.user.id}>
                <td id="username">
                    <NavLink to={"/users/" + user.id}>{user.username}</NavLink>
                </td>
                <td id="email">{user.email}</td>
                <td id="role"><FormattedMessage id={"role." + user.role} /></td>
                <td>
                    <Button id="edit" size="sm" onClick={this.editUser}>
                        Edit
                        {/*<Glyphicon glyph="glyphicon glyphicon-edit" />*/}
                    </Button>
                    <Button id="delete" size="sm" onClick={this.delete}>
                        Remove
                        {/*<Glyphicon glyph="glyphicon glyphicon-remove" />*/}
                    </Button>
                </td>
            </tr>
        );
    }
}

export default withRouter(UserRow);
