const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const movieSchema = new mongoose.Schema(
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
        date_emit: {
            type: Date,
            required: true,
            default: new Date()
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        director: {
            type: ObjectId,
            ref: "Director",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);