/**
 * UserList Service
 * Handles all business logic for user management operations
 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { UserList } = require("../../models"); // Adjusted to import 'UserList' model directly
require("dotenv").config(); // Ensure environment variables are loaded

// Set up logger with fallback
let logger;
try {
    logger = require("../utils/logger");
} catch (error) {
    logger = {
        info: (msg) => console.log(msg),
        error: (msg, meta) => console.error(msg, meta),
    };
}

class UserListService {
    constructor() {
        this.model = UserList; // Use the directly imported UserList model
        this.jwtSecret = process.env.JWT_SECRET || "your-secret-key";
        this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";
    }

    /**
     * Create a new user
     * @param {Object} userData - User data
     * @returns {Promise<Object>} Created user
     */
    async createUser(userData) {
        try {
            // Check if userName already exists
            const existingUser = await this.model.findOne({
                where: { userName: userData.userName },
            });
            if (existingUser) {
                return {
                    success: false,
                    message: "Username already exists",
                };
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(userData.password, 12);

            // Create user
            const user = await this.model.create({
                ...userData,
                password: hashedPassword,
                status: userData.status || "pending", // Ensure status is set, default to 'pending'
            });

            // Remove password from response
            const userResponse = user.toJSON();
            delete userResponse.password;
            logger.info(`User created: ${user.id}`);
            return {
                success: true,
                data: userResponse,
                message: "User created successfully",
            };
        } catch (error) {
            logger.error("Error creating user", {
                error: error.message,
                stack: error.stack,
                userData,
            });
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    /**
     * Get all users with filtering and pagination
     * @param {Object} options - Query options
     * @returns {Promise<Object>} Paginated users
     */
    async getAllUsers() {
        try {
            // const where = this._buildWhereClause(filters);
            const users = await this.model.findAll();
            logger.info(`Retrieved ${users.length} users.`);

            return {
                success: true,
                data: users,
                message: "Users retrieved successfully",
            };
        } catch (error) {
            logger.error("Error in getAllUsers", {
                error: error.message,
                stack: error.stack,
                options,
            });
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }

    /**
     * Get user by ID
     * @param {string} id - User UUID
     * @returns {Promise<Object>} User details
     */
    async getUserById(id) {
        try {
            const user = await this.model.findByPk(id, {
                attributes: { exclude: ["password"] },
            });
            if (!user) {
                logger.info(`User not found: ${id}`);
                return {
                    success: false,
                    message: "User not found",
                };
            }
            logger.info(`User retrieved: ${id}`);
            return {
                success: true,
                data: user,
            };
        } catch (error) {
            logger.error(`Error in getUserById for ID: ${id}`, {
                error: error.message,
                stack: error.stack,
            });
            throw new Error(`Failed to fetch user: ${error.message}`);
        }
    }

    /**
     * Update user
     * @param {string} id - User UUID
     * @param {Object} updateData - Data to update
     * @returns {Promise<Object>} Updated user
     */
    async updateUser(id, updateData) {
        try {
            const user = await this.model.findByPk(id);
            if (!user) {
                logger.info(`User not found for update: ${id}`);
                return {
                    success: false,
                    message: "User not found",
                };
            }
            // If updating userName, check for conflicts
            if (updateData.userName && updateData.userName !== user.userName) {
                const existingUser = await this.model.findOne({
                    where: {
                        userName: updateData.userName,
                        id: { [Op.ne]: id },
                    },
                });
                if (existingUser) {
                    return {
                        success: false,
                        message: "Username already exists",
                    };
                }
            }
            // Hash password if provided
            if (updateData.password) {
                updateData.password = await bcrypt.hash(
                    updateData.password,
                    12
                );
            }
            await user.update(updateData);
            // Return updated user without password
            const updatedUser = await this.model.findByPk(id, {
                attributes: { exclude: ["password"] },
            });
            logger.info(`User updated: ${id}`);
            return {
                success: true,
                data: updatedUser,
                message: "User updated successfully",
            };
        } catch (error) {
            logger.error(`Error in updateUser for ID: ${id}`, {
                error: error.message,
                stack: error.stack,
                updateData,
            });
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    /**
     * Soft delete user by setting status to 'inactive'
     * @param {string} id - User UUID
     * @returns {Promise<Object>} Result
     */
    async deleteUser(id) {
        try {
            const user = await this.model.findByPk(id);
            if (!user) {
                return {
                    success: false,
                    message: "User not found",
                };
            }
            await user.destroy();
            return {
                success: true,
                message: "User deleted successfully (status set to inactive)",
            };
        } catch (error) {
            // console.error("Error deleting ISReport:", error); // Add logging for errors
            return {
                success: false,
                error: error.message,
                message: "Failed to delete report",
            };
        }
    }
}

module.exports = new UserListService();
