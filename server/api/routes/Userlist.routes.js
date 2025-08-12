const express = require("express")
const router = express.Router()
const userController = require("../controllers/Userlist.controller")

// All routes in this file will be prefixed with /api/users

// POST /api/users - Create a new user
router.post("/", userController.createUser)

// GET /api/users - Get all users
router.get("/", userController.getAllUsers)

// GET /api/users/:id - Get a user by ID
router.get("/:id", userController.getUserById)

// PUT /api/users/:id - Update a user by ID
router.put("/:id", userController.updateUser)

// DELETE /api/users/:id - Delete a user by ID (soft delete)
router.delete("/:id", userController.deleteUser)

module.exports = router
