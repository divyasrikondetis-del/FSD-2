
const util = require("util");

module.exports = (req, res) => {
    const students = [
        { id: 1, name: 'Jimin', age: 20 },
        { id: 2, name: 'jk', age: 22 },
        { id: 3, name: 'v', age: 23 }
    ];

    const output = [];

    const newStudent = { id: 4, name: 'suresh', age: 23 };
    students.push(newStudent);

    output.push(util.format("All students:", students));

    const studentIdToRead = 2;
    const studentToRead = students.find(student => student.id === studentIdToRead);

    if (studentToRead) {
        output.push(util.format(`Student with ID ${studentIdToRead}:`, studentToRead));
    } else {
        output.push(`Student with ID ${studentIdToRead} not found.`);
    }

    const studentIdToUpdate = 3;
    const updatedStudentData = { name: 'karthik kumar', age: 22 };

    const studentIndexToUpdate = students.findIndex(
        student => student.id === studentIdToUpdate
    );

    if (studentIndexToUpdate !== -1) {
        students[studentIndexToUpdate] = {
            ...students[studentIndexToUpdate],
            ...updatedStudentData
        };

        output.push(util.format(
            `Student with ID ${studentIdToUpdate} updated:`,
            students[studentIndexToUpdate]
        ));
    }

    const studentIdToDelete = 2;
    const studentIndexToDelete = students.findIndex(
        student => student.id === studentIdToDelete
    );

    if (studentIndexToDelete !== -1) {
        const deletedStudent = students.splice(studentIndexToDelete, 1)[0];

        output.push(util.format(
            `Student with ID ${studentIdToDelete} deleted:`,
            deletedStudent
        ));
    }

    output.push(util.format("Final list of students:", students));

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(output.join("\n"));
};
