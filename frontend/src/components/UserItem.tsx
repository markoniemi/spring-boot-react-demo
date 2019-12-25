import React, {Component} from "react";

export default class UserItem extends Component<any, any> {
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
        const {id} = this.props.student;
        this.props.deleteStudent(id);
    }

    public edit() {
        this.setState((prevState, props) => ({
            isEdit: !prevState.isEdit,
        }));
    }

    public submit() {
        const {id} = this.props.student;
        this.setState((prevState, props) => ({
            isEdit: !prevState.isEdit,
        }));
        this.props.editStudentSubmit(id, this.usernameInput.value, this.passwordInput.value, this.emailInput.value);
    }

    public render() {
        const {username, password, email} = this.props.student;
        return (
            this.state.isEdit === true ?
                <tr id={username} className="bg-warning" key={this.props.index}>
                    <td><input id="usernameInput" ref={(usernameInput) => this.usernameInput = usernameInput} defaultValue={username}/></td>
                    <td><input id="passwordInput" type="password" defaultValue={password} ref={(passwordInput) => this.passwordInput = passwordInput}/></td>
                    <td><input id="emailInput" ref={(emailInput) => this.emailInput = emailInput} defaultValue={email}/></td>
                    <td><button id="submit" className="far fa-save" onClick={this.submit}/></td>
                    <td><button id="delete" className="fas fa-trash"/></td>
                </tr>
                :
                <tr id={username} key={this.props.index}>
                    <td id="username">{username}</td>
                    {/*<td>{password}</td>*/}
                    <td></td>
                    <td id="email">{email}</td>
                    <td><button id="edit" className="far fa-edit" onClick={this.edit}/></td>
                    <td><button id="delete" className="fas fa-trash" onClick={this.delete}/></td>
                </tr>
        );
    }
}
