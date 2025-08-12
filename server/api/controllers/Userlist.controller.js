const { UserList } = require("../../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize"); // For Sequelize operators like Op.ne
const { v4: uuidv4 } = require("uuid"); // For generating UUIDs for user IDs
const UserListService = require("../../services/api/UserList.service");

class UserListController {
    /**
     * Create a new User
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async createUser(req, res) {
        try {
            const result = await UserListService.createUser(req.body);

            if (result.success) {
                return res.status(201).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            console.error("Error in createUser controller:", error);
            return res.status(500).json({
                success: false,
                error: error.message,
                message: "Internal server error",
            });
        }
    }

    /**
     * Get all Users
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async getAllUsers(req, res) {
        try {
            const result = await UserListService.getAllUsers();

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            console.error("Error in getAllUsers controller:", error);
            return res.status(500).json({
                success: false,
                error: error.message,
                message: "Internal server error",
            });
        }
    }

    /**
     * Get User by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async getUserById(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "User ID is required",
                });
            }

            const result = await UserListService.getUserById(id);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            console.error("Error in getUserById controller:", error);
            return res.status(500).json({
                success: false,
                error: error.message,
                message: "Internal server error",
            });
        }
    }

    /**
     * Update User
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async updateUser(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "User ID is required",
                });
            }

            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Update data is required",
                });
            }

            const result = await UserListService.updateUser(id, req.body);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            console.error("Error in updateUser controller:", error);
            return res.status(500).json({
                success: false,
                error: error.message,
                message: "Internal server error",
            });
        }
    }

    /**
     * Delete User
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "User ID is required",
                });
            }

            const result = await UserListService.deleteUser(id);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            console.error("Error in deleteUser controller:", error);
            return res.status(500).json({
                success: false,
                error: error.message,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new UserListController();
//const InterviewService = require("../../services/api/Interview.service");
//ApplicantEducationService.addEducation

//controller
//module.exports = new ApplicantTrackingController();
