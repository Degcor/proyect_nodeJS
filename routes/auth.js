const express = require("express");
const router = express.Router();

const { userSignupValidator } = require("../validator");
const {
    signup,
    signin,
    signout
} = require("../controllers/auth");

/**
 * @swagger   
 * /api/signup: 
 *  post:
 *    summary: signup user
 *    description: Use to request signup user
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                  type: string
 *                  description: name user valid
 *              email:
 *                  type: string
 *                  description: email user valid
 *              password:
 *                  type: string
 *                  description: password user valid
 *    responses:
 *      "200":
 *         description: A successful response and user profile
 *      "400":
 *         description: A bad request response
 */
router.post("/signup", userSignupValidator, signup);

/**
 * @swagger   
 * /api/signin: 
 *  post:
 *    summary: signin user
 *    description: Use to request signin user
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                  type: string
 *                  description: email user valid
 *              password:
 *                  type: string
 *                  description: password user valid
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.post("/signin", signin);

/**
 * @swagger
 * /api/signout:
 *  get:
 *    summary: signout user
 *    description: Use to request logout user
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.get("/signout", signout);

module.exports = router;