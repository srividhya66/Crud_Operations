const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/studentsDB")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

const studentSchema = new mongoose.Schema({
    registerNumber: String,
    cgpa: Number,
});

const Student = mongoose.model("Student", studentSchema);

// Insert Data
app.post("/insert", async (req, res) => {
    const { registerNumber, cgpa } = req.body;
    const newStudent = new Student({ registerNumber, cgpa });
    await newStudent.save();
    res.json({ message: "Student inserted successfully" });
});

// Update Data
app.put("/update", async (req, res) => {
    const { registerNumber, cgpa } = req.body;
    await Student.findOneAndUpdate({ registerNumber }, { cgpa });
    res.json({ message: "Student data updated" });
});

// Delete Data
app.delete("/delete/:registerNumber", async (req, res) => {
    await Student.findOneAndDelete({ registerNumber: req.params.registerNumber });
    res.json({ message: "Student deleted" });
});

// Get All Data
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.listen(5000, () => console.log("Server running on port 5000"));
