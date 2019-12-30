import React, { Component } from "react";
import User from "../domain/User";

interface UserProps {
    key: number;
    user: User;
    index: number;

    deleteUser(id: number);

    submitUser(user: User);
}

interface UserState {
    isEdit: boolean;
    username: string;
    password: string;
    email: string;
}

export default class UserItem extends Component<UserProps, UserState> {

    constructor(props) {
        super(props);
        this.state = { isEdit: false, username: props.user.username, password: props.user.password, email: props.user.email };
        this.edit = this.edit.bind(this);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    public delete(): void {
        const { id } = this.props.user;
        this.props.deleteUser(id);
    }

    public edit(): void {
        this.setEdit(true);
    }

    public submit(): void {
        const { id } = this.props.user;
        this.setEdit(false);
        this.props.submitUser(new User(this.state.username, this.state.password, this.state.email, id));
    }

    public render(): JSX.Element {
        if (this.state.isEdit === true) {
            return this.renderEdit(this.props.user);
        } else {
            return this.renderView(this.props.user);
        }
    }

    private renderEdit(user: User): JSX.Element {
        return (
            <tr id={user.username} className="bg-warning" key={this.props.index}>
                <td>
                    <input
                        id="usernameInput"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                </td>
                <td>
                    <input
                        id="passwordInput"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                </td>
                <td>
                    <input
                        id="emailInput"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                </td>
                <td>
                    <button id="submit" className="far fa-save" onClick={this.submit}/>
                </td>
                <td>
                    <button id="delete" className="fas fa-trash"/>
                </td>
            </tr>
        );
    }

    private renderView(user: User): JSX.Element {
        return (
            <tr id={user.username} key={this.props.index}>
                <td id="username">{user.username}</td>
                {/*<td>{password}</td>*/}
                <td/>
                <td id="email">{user.email}</td>
                <td>
                    <button id="edit" className="far fa-edit" onClick={this.edit}/>
                </td>
                <td>
                    <button id="delete" className="fas fa-trash" onClick={this.delete}/>
                </td>
            </tr>
        );
    }

    private setEdit(isEdit: boolean): void {
        this.setState({
            ...this.state,
            isEdit: isEdit,
        });
    }

    private onChange(event) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value,
        });
    }
}
