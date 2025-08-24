/**
 * UserList Sequelize Model
 *
 * @description Defines the UserList model for managing user accounts in the system.
 * Handles both Admin and regular User account types with authentication capabilities.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance
 * @param {import('sequelize').DataTypes} DataTypes - Sequelize data types
 * @returns {import('sequelize').Model} The UserList model
 */
/**
 * UserList Model Definition
 *
 * @typedef {Object} UserListAttributes
 * @property {string} id - Unique UUID identifier for the user
 * @property {string} userName - Unique username for login
 * @property {string} name - Full display name of the user
 * @property {'Admin'|'User'} requirement_type - User role/permission level
 * @property {string} joined - Date when user joined (YYYY-MM-DD format)
 * @property {string} password - Encrypted password (6-255 characters)
 * @property {Date} createdAt - Timestamp when record was created (auto-generated)
 * @property {Date} updatedAt - Timestamp when record was last updated (auto-generated)
 */
module.exports = (sequelize, DataTypes) => {
    const UserList = sequelize.define(
        "UserList",
        {
            /**
             * Primary key UUID for the user
             * @type {string}
             */
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            /**
             * Username for authentication
             * @type {string}
             */
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * Full display name of the user
             * @type {string}
             */
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * User role - determines access permissions
             * @type {'Admin'|'User'}
             */
            userRoll: {
                type: DataTypes.ENUM("Admin", "User"),
                allowNull: false,
            },
            /**
             * Date user joined the system
             * @type {string} Format: YYYY-MM-DD
             */
            joined: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            /**
             * User password - must be 6-255 characters
             * @type {string}
             */
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [6, 255],
                },
            },
        },
        {
            tableName: "UserList",
            timestamps: true,
            underscored: true,
        }
    );

    return UserList;
};
