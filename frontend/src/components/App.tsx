import React, {Component} from "react";
import "../App.css";
import UserList from "./UserList";
import Hello from "./Hello";
import StudentApi from "../api/StudentApi";

class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
        };
        this.submitUser = this.submitUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    private setUsersToState(studentList) {
        this.setState((prevState, props) => ({studentList: studentList}));
    }

    public componentWillMount() {
        this.setUsersToState(StudentApi.getStudents());
    }

    public addUser() {
        StudentApi.create();
        this.setUsersToState(StudentApi.getStudents());
    }

    public deleteUser(id) {
        if (window.confirm("Do you want to delete this item") === true) {
            StudentApi.delete(id);
            this.setUsersToState(StudentApi.getStudents());
        }
    }

    public submitUser(id, username, password, email) {
        StudentApi.update({id: id, username: username, password: password, email: email});
        this.setUsersToState(StudentApi.getStudents());
    }

    public render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    Users
                                </div>
                                <div className="card-body">
                                    <table className="table table-hover">
                                        <thead className="thead-dark">
                                        <tr>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Email</th>
                                            <th>Edit/Save</th>
                                            <th>Delete</th>
                                        </tr>
                                        </thead>
                                        <UserList
                                            deleteStudent={this.deleteUser}
                                            studentList={this.state.studentList}
                                            editStudentSubmit={this.submitUser}
                                        />
                                    </table>
                                    <button className="btn btn-dark pull-left" onClick={this.addUser}>Add New
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Hello/>
            </div>
        );
    }
}

export default App;
