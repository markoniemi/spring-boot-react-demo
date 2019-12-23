import React, {Component} from "react";
import "../App.css";
import StudentList from "./StudentList";
import Hello from "./Hello";
import StudentApi from "../api/StudentApi";

class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
        };
        this.editStudentSubmit = this.editStudentSubmit.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.addNewStudent = this.addNewStudent.bind(this);
    }

    private setStudentsToState(studentList) {
        this.setState((prevState, props) => ({studentList: studentList}));
    }

    public componentWillMount() {
        this.setStudentsToState(StudentApi.getStudents());
    }

    public addNewStudent() {
        StudentApi.create();
        this.setStudentsToState(StudentApi.getStudents());
    }

    public deleteStudent(id) {
        if (window.confirm("Do you want to delete this item") === true) {
            StudentApi.delete(id);
            this.setStudentsToState(StudentApi.getStudents());
        }
    }

    public editStudentSubmit(id, name, grade, school) {
        StudentApi.update({id: id, name: name, grade: grade, school: school});
        this.setStudentsToState(StudentApi.getStudents());
    }

    public render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    Student Registry
                                </div>
                                <div className="card-body">
                                    <table className="table table-hover">
                                        <thead className="thead-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Grade</th>
                                            <th>School</th>
                                            <th>Edit/Save</th>
                                            <th>Delete</th>
                                        </tr>
                                        </thead>
                                        <StudentList
                                            deleteStudent={this.deleteStudent}
                                            studentList={this.state.studentList}
                                            editStudentSubmit={this.editStudentSubmit}
                                        />
                                    </table>
                                    <button className="btn btn-dark pull-left" onClick={this.addNewStudent}>Add New
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
