const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Temporary Database
let students = [];

// Home Route
app.get("/", (req, res) => {
    res.send("Student Backend is running successfully!");
});

// Get All Students
app.get("/students", (req, res) => {
    res.json(students);
});

// Register Student
app.post("/register", (req, res) => {

    const { name, email, rollNo, department, faculty } = req.body;

    const student = {
        id: Date.now().toString(),
        name,
        email,
        rollNo,
        department,
        faculty
    };

    students.push(student);

    res.status(201).json({
        message: "Student Registered Successfully!",
        student
    });

});

// Update Student
app.put("/students/:id", (req, res) => {

    const { id } = req.params;

    const { name, email, rollNo, department, faculty } = req.body;

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students[index] = {
        id,
        name,
        email,
        rollNo,
        department,
        faculty
    };

    res.json({
        message: "Student Updated Successfully!",
        student: students[index]
    });

});

// Delete Student
app.delete("/students/:id", (req, res) => {

    const { id } = req.params;

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student Deleted Successfully!"
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
