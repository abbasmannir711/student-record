const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Student Database (temporary)
let students = [];

// GET all students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// ADD student
app.post("/api/students", (req, res) => {
    const student = {
        id: Date.now().toString(),
        ...req.body
    };

    students.push(student);

    res.status(201).json(student);
});

// UPDATE student
app.put("/api/students/:id", (req, res) => {

    const id = req.params.id;

    const index = students.findIndex(student => student.id === id);

    if(index === -1){
        return res.status(404).json({
            message:"Student not found"
        });
    }

    students[index] = {
        ...students[index],
        ...req.body
    };

    res.json(students[index]);
});

// DELETE student
app.delete("/api/students/:id",(req,res)=>{

    const id=req.params.id;

    students=students.filter(student=>student.id!==id);

    res.json({
        message:"Student deleted successfully"
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
