const express = require("express");
const router = express.Router();
const ISReportController = require("../controllers/ISReport.controller");

// Create a new ISReport
// POST /api/isreports
router.post("/", ISReportController.createReport);

// Get all ISReports
// GET /api/isreports
router.get("/", ISReportController.getAllReports);

// Get ISReport by ID
// GET /api/isreports/:id
router.get("/:id", ISReportController.getReportById);

// Update ISReport by ID
// PUT /api/isreports/:id
router.put("/:id", ISReportController.updateReport);

// Delete ISReport by ID
// DELETE /api/isreports/:id
router.delete("/:id", ISReportController.deleteReport);

module.exports = router;
