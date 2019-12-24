import React, {Component} from "react";

export default class UserItem extends Component<any, any> {
    private nameInput: any;
    private gradeInput: any;
    private schoolInput: any;

    constructor(props) {
        super(props);
        this.state = {isEdit: false};
        this.editStudent = this.editStudent.bind(this);
        this.editStudentSubmit = this.editStudentSubmit.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    public deleteStudent() {
        const {id} = this.props.student;
        this.props.deleteStudent(id);
    }

    public editStudent() {
        this.setState((prevState, props) => ({
            isEdit: !prevState.isEdit,
        }));
    }

    public editStudentSubmit() {
        const {id} = this.props.student;
        this.setState((prevState, props) => ({
            isEdit: !prevState.isEdit,
        }));
        this.props.editStudentSubmit(id, this.nameInput.value, this.gradeInput.value, this.schoolInput.value);
    }

    public render() {
        const {username, password, email} = this.props.student;
        return (
            this.state.isEdit === true ?
                <tr className="bg-warning" key={this.props.index}>
                    <td><input ref={(nameInput) => this.nameInput = nameInput} defaultValue={username}/></td>
                    <td><input type="password" defaultValue={password} ref={(gradeInput) => this.gradeInput = gradeInput}/></td>
                    <td><input ref={(schoolInput) => this.schoolInput = schoolInput} defaultValue={email}/></td>
                    <td><button className="far fa-save" onClick={this.editStudentSubmit}/></td>
                    <td><button className="fas fa-trash"/></td>
                </tr>
                :
                <tr key={this.props.index}>
                    <td>{username}</td>
                    {/*<td>{password}</td>*/}
                    <td></td>
                    <td>{email}</td>
                    <td><button className="far fa-edit" onClick={this.editStudent}/></td>
                    <td><button className="fas fa-trash" onClick={this.deleteStudent}/></td>
                </tr>
        );
    }
}
