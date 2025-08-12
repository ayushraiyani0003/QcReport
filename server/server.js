const express = require("express");
const path = require("path");
const morgan = require("morgan");
const initDb = require("./config/initDb");
require("dotenv").config();
const logger = require("./utils/logger");

// Import main router
const apiRoutes = require("./api/routes");

// Create Express app
const app = express();

// Use morgan with winston logger
app.use(
    morgan("combined", {
        stream: {
            write: (message) => {
                // Remove line breaks to avoid duplicate log entries
                logger.info(message.trim());
            },
        },
    })
);

app.use(express.json());

// Mount all API routes
app.use("/api", apiRoutes);

// API health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

app.use((err, req, res, next) => {
    logger.error("Server error", {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "An unexpected error occurred",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});

// Initialize database and start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Initialize database with force: false to preserve existing data
        logger.info("Initializing database connection...");
        const dbInitialized = await initDb(false);

        if (dbInitialized) {
            // Create uploads directory if it doesn't exist
            const fs = require("fs");
            const uploadDir = path.join(__dirname, "uploads");
            const tempDir = path.join(__dirname, "uploads/temp");

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
                logger.info("Created uploads directory");
            }

            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
                logger.info("Created uploads/temp directory");
            }

            // Start the server
            app.listen(PORT, () => {
                logger.info(`Server running on port ${PORT}`);
                logger.info(
                    `Environment: ${process.env.NODE_ENV || "development"}`
                );
                logger.info(
                    `API available at http://192.168.10.132:${PORT}/api`
                );
            });
        } else {
            logger.error(
                "Failed to start server due to database initialization error"
            );
            process.exit(1);
        }
    } catch (error) {
        logger.error("Server startup error", {
            error: error.message,
            stack: error.stack,
        });
        process.exit(1);
    }
};

// Handle uncaught exceptions and rejections
process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception", {
        error: err.message,
        stack: err.stack,
    });
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection", {
        reason: reason.message || reason,
        stack: reason.stack || "No stack trace",
        promise,
    });
    process.exit(1);
});

// Start the server
startServer();

module.exports = app; // For testing purposes
