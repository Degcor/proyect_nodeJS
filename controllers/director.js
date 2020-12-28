const Director = require("../models/director");
const { errorHandler } = require("../helpers/dbErrorHandler");
// middlewares rest

exports.directorById = (req, res, next, id) => {
    Director.findById(id).exec((err, director) => {
        if (err || !director) {
            return res.status(404).json({
                error: "Director does not exist"
            });
        }
        req.director = director;
        next();
    });
};

exports.create = (req, res) => {
    const director = new Director(req.body);
    director.birthdate= new Date(req.body.birthdate);
    director.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};

exports.read = (req, res) => {
    return res.json(req.director);
};

exports.update = (req, res) => {
    const director = req.director;
    director.name = (req.body.name==undefined)?director.name:req.body.name;
    director.summary = (req.body.summary==undefined)?director.name:req.body.summary;
    director.birthdate= (req.body.birthdate==undefined)?director.birthdate:new Date(req.body.birthdate);
    director.nationality = (req.body.nationality==undefined)?director.nationality:req.body.nationality;
    director.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const director = req.director;
    director.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Director deleted"
        });
    });
};

exports.list = (req, res) => {
    Director.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};