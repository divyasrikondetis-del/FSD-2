// array-crud.js
// 1. INITIALIZE DATA
const students = [
    { id: 1, name: 'Jimin', age: 20 },
    { id: 2, name: 'jk', age: 22 },
    { id: 3, name: 'v', age: 23 }
];
// 2. CREATE A NEW STUDENT
const newStudent = { id: 4, name: 'suresh', age: 23 };
students.push(newStudent);
// 3. READ ALL STUDENTS
console.log("All students:", students);
// 4. READ A STUDENT BY ID
const studentIdToRead = 2;
const studentToRead = students.find(student => student.id === studentIdToRead);
if (studentToRead) {
    console.log(`Student with ID ${studentIdToRead}:`, studentToRead);
} else {
    console.log(`Student with ID ${studentIdToRead} not found.`);
}
// 5. UPDATE A STUDENT BY ID
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
    console.log(`Student with ID ${studentIdToUpdate} updated:`, students[studentIndexToUpdate]);
} else {
    console.log(`Student with ID ${studentIdToUpdate} not found.`);
}
// 6. DELETE A STUDENT BY ID
const studentIdToDelete = 2;
const studentIndexToDelete = students.findIndex(
    student => student.id === studentIdToDelete
);
if (studentIndexToDelete !== -1) {
    // splice returns an array; [0] extracts the deleted student object directly
    const deletedStudent = students.splice(studentIndexToDelete, 1)[0];
    console.log(`Student with ID ${studentIdToDelete} deleted:`, deletedStudent);
} else {
    console.log(`Student with ID ${studentIdToDelete} not found.`);
}
// 7. FINAL LOG (To verify the final list)
console.log("Final list of students:", students);