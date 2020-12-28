const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        summary: {
            type: String,
            required: true,
            maxlength: 200
        },
        birthdate: {
            type: Date,
            required: true,
            default: new Date()
        },
        nationality: {
            type: String,
            required: true,
            maxlength: 32
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Director", directorSchema);