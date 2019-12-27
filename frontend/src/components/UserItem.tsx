import React, {Component} from "react";
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
}

export default class UserItem extends Component<UserProps, UserState> {
    private usernameInput: any;
    private passwordInput: any;
    private emailInput: any;

    constructor(props) {
        super(props);
        this.state = {isEdit: false};
        this.edit = this.edit.bind(this);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
    }

    public delete() {
        const {id} = this.props.user;
        this.props.deleteUser(id);
    }

    public edit() {
        this.setState((prevState, props) => ({
            isEdit: !prevState.isEdit,
        }));
    }

    public submit() {
        const {id} = this.props.user;
        this.setState((prevState, props) => ({
            isEdit: !prevState.isEdit,
        }));
        this.props.submitUser(new User(this.usernameInput.value, this.passwordInput.value, this.emailInput.value, id));
    }

    public render() {
        const user: User = this.props.user;
        return (
            this.state.isEdit === true ?
                <tr id={user.username} className="bg-warning" key={this.props.index}>
                    <td><input id="usernameInput" ref={(usernameInput) => this.usernameInput = usernameInput}
                               defaultValue={user.username}/></td>
                    <td><input id="passwordInput" type="password" defaultValue={user.password}
                               ref={(passwordInput) => this.passwordInput = passwordInput}/></td>
                    <td><input id="emailInput" ref={(emailInput) => this.emailInput = emailInput}
                               defaultValue={user.email}/>
                    </td>
                    <td>
                        <button id="submit" className="far fa-save" onClick={this.submit}/>
                    </td>
                    <td>
                        <button id="delete" className="fas fa-trash"/>
                    </td>
                </tr>
                :
                <tr id={user.username} key={this.props.index}>
                    <td id="username">{user.username}</td>
                    {/*<td>{password}</td>*/}
                    <td></td>
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
}
