import React, {Component} from "react";
import UserItem from "./UserItem";

export default class UserList extends Component<any, any> {
    public render() {
        const students = this.props.studentList;
        const trItem = students.map((item, index) =>
            <UserItem
                key={index}
                student={item}
                index={index}
                editStudentSubmit={this.props.editStudentSubmit}
                deleteStudent={this.props.deleteStudent}/>)
        return (
            <tbody>{trItem}</tbody>
        );
    }
}