const express = require("express");
const router = express.Router();

const { categoryFormValidator } = require("../validator");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
    create,
    categoryById,
    read,
    update,
    remove,
    list
} = require("../controllers/category");

// routes
/**
 * @swagger   
 * /api/category/{categoryId}: 
 *  get:
 *    summary: Get a category by ID
 *    description: Use to request to get category
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        schema:
 *          type: string
 *        required: true
 *        description: Numeric ID of the categroy to get
 *    responses:
 *      "200":
 *         description: A successful response and category
 *      "400":
 *         description: A bad request response
 */
router.get("/category/:categoryId", read);

router.post("/category/create/:userId", categoryFormValidator, requireSignin, isAuth, isAdmin, create);
router.put(
    "/category/:categoryId/:userId",
    categoryFormValidator,
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

/**
 * @swagger   
 * /api/categories:
 *  get:
 *    summary: Get a list of categories
 *    description: Use to request to get a list of category
 *    responses:
 *      "200":
 *         description: A successful
 *      "400":
 *         description: A bad request response
 */
router.get("/categories", list);

// params
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;