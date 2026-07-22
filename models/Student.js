const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    rollNo: {
        type: String,
        required: true,
        unique: true
    },

    department: {
        type: String,
        required: true
    },

    faculty: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
