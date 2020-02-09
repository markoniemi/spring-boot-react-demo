import React, { Component } from "react";
import User from "../domain/User";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

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
                        <FontAwesomeIcon icon={Icons.faEdit} />
                    </Button>
                    <Button id="delete" size="sm" onClick={this.delete}>
                        <FontAwesomeIcon icon={Icons.faTrashAlt} />
                    </Button>
                </td>
            </tr>
        );
    }
}

export default withRouter(UserRow);
