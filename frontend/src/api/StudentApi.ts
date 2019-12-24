class StudentApi {
    private static studentList = JSON.parse(localStorage.getItem("students"));

    public static initialize() {
        const studentList = [{id: 1, username: "username1", password: "password", email: "email1"},
            {id: 2, username: "username2", password: "password", email: "email2"},
            {id: 3, username: "username3", password: "password", email: "email3"},
            {id: 4, username: "username4", password: "password", email: "email4"}];
        if (localStorage.getItem("students") === null) {
            localStorage.setItem("students", JSON.stringify(studentList));
        }
    }

    public static getStudents() {
        return StudentApi.studentList;
    }

    public static create() {
        let newStudentList = [...StudentApi.studentList, {
            id: StudentApi.createId(), username: "", password: 1, email: "",
        }];
        StudentApi.studentList = newStudentList;
        localStorage.setItem("students", JSON.stringify(newStudentList));
    }

    private static createId() {
        return Math.max(...StudentApi.studentList.map((o) => o.id)) + 1;
    }

    public static update(editedStudent) {
        let studentListCopy = StudentApi.studentList.map((student) => {
            if (student.id === editedStudent.id) {
                student.username = editedStudent.username;
                student.password = editedStudent.password;
                student.email = editedStudent.email;
            }
            return student;
        });
        StudentApi.studentList = studentListCopy;
        localStorage.setItem("students", JSON.stringify(studentListCopy));
    }

    public static delete(id) {
        let filteredStudentList = StudentApi.studentList.filter(x => x.id !== id);
        StudentApi.studentList = filteredStudentList;
        localStorage.setItem("students", JSON.stringify(filteredStudentList));
    }
}

StudentApi.initialize();

export default StudentApi;
