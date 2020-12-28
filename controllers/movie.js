const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Movie = require("../models/movie");
const { errorHandler } = require("../helpers/dbErrorHandler");


// middlewares rest 

exports.movieById = (req, res, next, id) => {
    Movie.findById(id)
        .populate("category")
        .populate("director")
        .exec((err, movie) => {
            if (err || !movie) {
                return res.status(400).json({
                    error: "Movie not found"
                });
            }
            req.movie = movie;
            next();
        });
};

exports.read = (req, res) => {
    req.movie.photo = undefined;
    return res.json(req.movie);
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            name,
            summary,
            date_emit,
            category,
            director
        } = fields;
        if (
            !name ||
            !summary ||
            !date_emit ||
            !category ||
            !director
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        
        let movie = new Movie(fields);

        // 1kb = 1000
        // 1mb = 1000000
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            movie.photo.data = fs.readFileSync(files.photo.path);
            movie.photo.contentType = files.photo.type;
        }
        if(files.photo.size==0){
            return res.status(400).json({
                error: "Image is required"
            });
        }

        movie.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let movie = req.movie;
    movie.remove((err, deletedMovie) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Movie deleted successfully"
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        let movie = req.movie;
        movie = _.extend(movie, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            movie.photo.data = fs.readFileSync(files.photo.path);
            movie.photo.contentType = files.photo.type;
        }
        movie.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

/**
 * name / date emit 
 * by name = /movies?sortBy=name&order=desc&limit=4
 * by date emit = /movies?sortBy=date_emit&order=desc&limit=4
 * if no params are sent, then all movies are returned
 */
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Movie.find()
        .select("-photo")
        .populate("category")
        .populate("director")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, movies) => {
            if (err) {
                return res.status(400).json({
                    error: "Movie not found"
                });
            }
            res.json(movies);
        });
};

/**
 * it will find the movies based on the req movie category
 * other movies that has the same category, will be returned
 */

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Movie.find({ _id: { $ne: req.movie }, category: req.movie.category })
        .limit(limit)
        .populate("category", "_id name")
        .populate("director", "_id name")
        .exec((err, movies) => {
            if (err) {
                return res.status(400).json({
                    error: "Movies  not found"
                });
            }
            res.json(movies);
        });
};

exports.listCategories = (req, res) => {
    Movie.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(categories);
    });
};

exports.photo = (req, res, next) => {
    if (req.movie.photo.data) {
        res.set("Content-Type", req.movie.photo.contentType);
        return res.send(req.movie.photo.data);
    }
    next();
};

exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: "i" };
        // assign category value to query.category
        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category;
        }
        // find the movie based on query object with 2 properties
        // search and category
        Movie.find(query, (err, movies) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(movies);
        }).select("-photo");
    }
};