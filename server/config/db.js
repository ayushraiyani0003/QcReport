/**
 * @fileoverview Database configuration and connection setup using Sequelize ORM
 * This module sets up the database connection with environment variables
 * and provides utilities for testing the connection.
 */

const { Sequelize } = require("sequelize");
require("dotenv").config();

/**
 * Sequelize database connection instance
 * Configured using environment variables for security and flexibility
 *
 * @type {Sequelize}
 * @description Creates a new Sequelize instance with the following configuration:
 * - Database name from DB_NAME environment variable
 * - Username from DB_USER environment variable
 * - Password from DB_PASSWORD environment variable
 * - Host from DB_HOST environment variable
 * - Dialect from DB_DIALECT environment variable (defaults to 'mysql')
 * - Port from DB_PORT environment variable (defaults to 3306)
 * - Logging is disabled for cleaner output
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    /** @type {string} Database host address */
    host: process.env.DB_HOST,

    /** @type {string} Database dialect (mysql, postgres, sqlite, mariadb, etc.) */
    dialect: process.env.DB_DIALECT || "mysql",

    /** @type {boolean} Disable SQL query logging to console */
    logging: false,

    /** @type {number} Database port number */
    port: process.env.DB_PORT || 3306,
  }
);

/**
 * Tests the database connection by attempting to authenticate
 *
 * @async
 * @function testDbConnection
 * @returns {Promise<boolean>} Promise that resolves to true if connection is successful, false otherwise
 *
 * @example
 * // Test database connection
 * const isConnected = await testDbConnection();
 * if (isConnected) {
 *   console.log('Database is ready');
 * } else {
 *   console.log('Database connection failed');
 * }
 */

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    return false;
  }
};

/**
 * Module exports
 * @exports sequelize - The configured Sequelize instance for database operations
 * @exports testDbConnection - Async function to test database connectivity
 */
module.exports = {
  /**
   * @type {Sequelize}
   * @description Configured Sequelize instance ready for model definitions and queries
   */
  sequelize,

  /**
   * @type {Function}
   * @description Async function that tests database connection and returns boolean result
   */
  testDbConnection,
};

// convert my mysql to sequelize, i give the demo of my other app.

// // =================== config/db.js ===================
// const { Sequelize } = require("sequelize");
// const path = require("path");
// const fs = require("fs");
// require("dotenv").config();

// // Set up logger - we can't import directly to avoid circular dependencies
// let logger;
// try {
//   logger = require("../utils/logger");
// } catch (error) {
//   // Simple logger as fallback
//   const logDir = path.join(__dirname, "../../logs");
//   if (!fs.existsSync(logDir)) {
//     fs.mkdirSync(logDir, { recursive: true });
//   }

//   logger = {
//     info: (msg) => {
//       if (process.env.NODE_ENV === "development") console.log(msg);
//     },
//     error: (msg, meta) => {
//       console.error(msg, meta);
//       // Also log to file as fallback
//       fs.appendFileSync(
//         path.join(logDir, "db-errors.log"),
//         `${new Date().toISOString()} - ${msg} - ${JSON.stringify(meta)}\n`
//       );
//     },
//   };
// }

// // Custom logging function that ignores schema queries
// const customLogger = (query) => {
//   // Skip logging for schema/information queries
//   if (
//     query.includes("INFORMATION_SCHEMA") ||
//     query.includes("SHOW INDEX") ||
//     query.includes("SELECT 1+1") ||
//     query.startsWith("SELECT TABLE_NAME")
//   ) {
//     return;
//   }

//   // Log other queries if in development mode
//   if (
//     process.env.NODE_ENV === "development" &&
//     process.env.LOG_QUERIES === "true"
//   ) {
//     logger.info(`SQL: ${query}`);
//   }
// };

// // Create a connection to the HR payroll database
// const sequelize = new Sequelize(
//   process.env.HR_DB_NAME,
//   process.env.HR_DB_USER,
//   process.env.HR_DB_PASSWORD,
//   {
//     host: process.env.HR_DB_HOST,
//     dialect: process.env.HR_DB_DIALECT || "mysql",
//     port: process.env.HR_DB_PORT || 3306,
//     logging: customLogger,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );

// // Test the database connections
// const testDbConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     logger.info("HR database connection has been established successfully.");
//     return true;
//   } catch (error) {
//     logger.error("Unable to connect to the database", {
//       error: error.message,
//       stack: error.stack,
//     });
//     return false;
//   }
// };

// module.exports = {
//   sequelize,
//   testDbConnection,
// };
