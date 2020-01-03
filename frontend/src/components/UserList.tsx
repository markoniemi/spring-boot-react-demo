import React, { Component } from "react";
import UserItem from "./UserItem";
import User from "../domain/User";

interface UserListProps {
    users: User[];

    deleteUser(id: number): void;
}

export default class UserList extends Component<UserListProps, Readonly<{}>> {
    public render(): JSX.Element {
        const userItems = this.props.users.map((item, index) => (
            <UserItem key={index} user={item} index={index} deleteUser={this.props.deleteUser} />
        ));
        return <tbody>{userItems}</tbody>;
    }
}
