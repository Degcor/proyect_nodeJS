const express = require("express");
const router = express.Router();

const { directorCreateValidator, directorUpdateValidator } = require("../validator");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { directorById } = require("../controllers/director");
const {
    create,
    read,
    update,
    remove,
    list
} = require("../controllers/director");

// routes
/**
 * @swagger   
 * /api/director/{directorId}: 
 *  get:
 *    summary: Get a director by ID
 *    description: Use to request to get director
 *    parameters:
 *      - in: path
 *        name: directorId
 *        schema:
 *          type: string
 *        required: true
 *        description: Numeric ID of the director to get
 *    responses:
 *      "200":
 *         description: A successful response and director
 *      "400":
 *         description: A bad request response
 */
router.get("/director/:directorId", read);
router.post("/director/create/:userId", directorCreateValidator, requireSignin, isAuth, isAdmin, create);
router.put(
    "/director/:directorId/:userId",
    directorUpdateValidator,
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/director/:directorId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/directors", list);

// params
router.param("directorId", directorById);
router.param("userId", userById);

module.exports = router;