// =================== Fixed routes/FIReport.routes.js ===================
const express = require("express");
const router = express.Router();
const reportController = require("../controllers/FIReport.controller");

/**
 * Route to create a new report.
 *
 * @route POST /reports
 * @group FI Reports - Operations related to FI reports
 * @param {Object} req.body - The report data to be created.
 * @returns {Object} 201 - Success message and the created report data
 * @returns {Object} 500 - Error message if report creation fails
 */
router.post("/", reportController.createReport);

/**
 * Route to get all reports.
 *
 * @route GET /reports
 * @group FI Reports - Operations related to FI reports
 * @param {Object} req.query - The query parameters for filters, pagination, and sorting (no longer supported)
 * @returns {Object} 200 - Success message and all report data without filters or pagination
 * @returns {Object} 500 - Error message if fetching reports fails
 */
router.get("/", reportController.getAllReports);

/**
 * Route to get a specific report by ID.
 *
 * @route GET /reports/{id}
 * @group FI Reports - Operations related to FI reports
 * @param {string} id.path - The ID of the report to retrieve.
 * @returns {Object} 200 - Success message and the retrieved report data
 * @returns {Object} 500 - Error message if fetching the report fails
 */
router.get("/:id", reportController.getReportById);

/**
 * Route to update a specific report by ID.
 *
 * @route PUT /reports/{id}
 * @group FI Reports - Operations related to FI reports
 * @param {string} id.path - The ID of the report to update.
 * @param {Object} req.body - The updated report data.
 * @returns {Object} 200 - Success message and the updated report data
 * @returns {Object} 500 - Error message if updating the report fails
 */
router.put("/:id", reportController.updateReport);

/**
 * Route to delete a specific report by ID.
 *
 * @route DELETE /reports/{id}
 * @group FI Reports - Operations related to FI reports
 * @param {string} id.path - The ID of the report to delete.
 * @returns {Object} 200 - Success message and meta information of the deleted report
 * @returns {Object} 500 - Error message if deleting the report fails
 */
router.delete("/:id", reportController.deleteReport);

module.exports = router;
