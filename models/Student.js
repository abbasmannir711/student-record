
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
   },
  password: {
        type:String,
        required: true,
        minLength: 8
}
}, {
    timestamps: true
});

studentSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();

});

studentSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Student", studentSchema);


