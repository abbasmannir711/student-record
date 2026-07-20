const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary database
const students = [];

// Home route
app.get("/", (req, res) => {
    res.send("Student Backend is running successfully!");
});

// Register Student
app.post("/register", (req, res) => {

    const { name, email,matricNumber, department, faculty} = req.body;

    const student = {
        id: students.length + 1,
        name,
        email,
        matricNumber,
        department,
        faculty 
    };

    students.push(student);

    res.json({
        message: "Student Registered Successfully!",
        student
    });
});

// Get All Students
app.get("/students", (req, res) => {
    res.json(students);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
