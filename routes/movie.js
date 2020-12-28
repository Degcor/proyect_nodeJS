const express = require("express");
const router = express.Router();

const { movieCreateValidator } = require("../validator");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
    create,
    movieById,
    read,
    update,
    remove,
    list,
    listRelated,
    listCategories,
    photo,
    listSearch
} = require("../controllers/movie");

// routes
router.get("/movie/:movieId", read);
router.post("/movie/create/:userId",  requireSignin, isAuth, isAdmin, create);
router.put(
    "/movie/:movieId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/movie/:movieId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/movies", list);
router.get("/movies/search", listSearch);
router.get("/movies/related/:movieId", listRelated);
router.get("/movies/categories", listCategories);
router.get("/movie/photo/:movieId", photo);

// params
router.param("movieId", movieById);
router.param("userId", userById);

module.exports = router;