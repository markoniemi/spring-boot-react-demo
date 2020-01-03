import React, { Component } from "react";
import User from "../domain/User";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

interface UserProps {
    user: User;

    deleteUser(id: number);
}

class UserItem extends Component<RouteComponentProps & UserProps, Readonly<{}>> {
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
                <td>
                    <button id="edit" className="far fa-edit" onClick={this.editUser} />
                </td>
                <td>
                    <button id="delete" className="fas fa-trash" onClick={this.delete} />
                </td>
            </tr>
        );
    }
}

export default withRouter(UserItem);
