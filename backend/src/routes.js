const express = require("express");
const crypto = require("crypto");
const connection = require("./database/connection");

const UsersController = require("./controllers/UsersController");
const QuotesController = require("./controllers/QuotesController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

/**
 * @route    post /users
 * @desc     Add Users to Database
 * @access   Private
 */
routes.post("/users", UsersController.create);

/**
 * @route    get /users
 * @desc     List all NGO entries
 * @access   Public
 */
routes.get("/users", UsersController.index);

/**
 * @route    post /quotes
 * @desc     Add Quotes to Database
 * @access   Public
 */
routes.post("/quotes", QuotesController.create);

/**
 * @route    get /quotes
 * @desc     List all Quotes entries
 * @access   Public
 */
routes.get("/quotes", QuotesController.index);

/**
 * @route    delete /quotes
 * @desc     Delete selected Quotes
 * @access   Public
 */
routes.delete("/quotes/:id", QuotesController.delete);

/**
 * @route    get /profile
 * @desc     List quotes of specific NGO
 * @access   Public
 */
routes.get("/profile", ProfileController.index);

/**
 * @route    post /sessions
 * @desc     List quotes of specific NGO
 * @access   Public
 */
routes.post("/sessions", SessionController.index);

module.exports = routes;
