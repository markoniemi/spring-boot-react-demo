class StudentApi {
    private static studentList = JSON.parse(localStorage.getItem("students"));

    private static initialize() {
        const studentList = [{id: 1, name: "John Doe", grade: 1, school: "React Redux School"}, {
            id: 2,
            name: "Jane Doe",
            grade: 2,
            school: "React Redux School",
        }, {id: 3, name: "Terry Adams", grade: 3, school: "React Redux School"}, {
            id: 4,
            name: "Jenny Smith",
            grade: 4,
            school: "React Redux School",
        }];

        if (localStorage.getItem("students") === null) {
            localStorage.setItem("students", JSON.stringify(studentList));
        }
    }

    public static getStudents() {
        return StudentApi.studentList;
    }

    public static create() {
        let newStudentList = [...(StudentApi.studentList), {
            id: Math.max(...(StudentApi.studentList).map(function (o) {
                return o.id
            })) + 1, name: "", grade: 1, school: ""
        }];
        StudentApi.studentList = newStudentList;
        localStorage.setItem("students", JSON.stringify(newStudentList));
    }

    public static update(editedStudent) {
        let studentListCopy = StudentApi.studentList.map((student) => {
            if (student.id === editedStudent.id) {
                student.name = editedStudent.name;
                student.grade = editedStudent.grade;
                student.school = editedStudent.school;
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
