const FlReportService = require("../../services/api/FIReport.service");

/**
 * @fileoverview Report controller for handling FI Report operations
 * @module reportController
 */

/**
 * Controller object containing all report-related endpoint handlers
 * @namespace reportController
 */
const reportController = {
  /**
   * Create a new FI report
   * @async
   * @function createReport
   * @memberof reportController
   * @param {Object} req - Express request object
   * @param {Object} req.body - Report data to create
   * @param {Object} res - Express response object
   * @returns {Promise<void>} JSON response with created report data
   * @throws {Error} 500 - Internal server error if creation fails
   *
   * @example
   * // POST /api/reports
   * // Request body:
   * {
   *   "title": "Financial Investigation Report",
   *   "description": "Investigation details...",
   *   "status": "draft"
   * }
   *
   * // Response:
   * {
   *   "success": true,
   *   "message": "Report created successfully",
   *   "data": { id: 1, title: "...", ... }
   * }
   */
  createReport: async (req, res) => {
    try {
      const reportData = req.body;
      const newReport = await FlReportService.createFIReport(reportData);

      res.status(201).json({
        success: true,
        message: "Report created successfully",
        data: newReport,
      });
    } catch (error) {
      console.error("❌ [Controller] Failed to create report:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to create report",
      });
    }
  },

  /**
   * Retrieve all FI reports
   * @async
   * @function getAllReports
   * @memberof reportController
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<void>} JSON response with array of all reports
   * @throws {Error} 500 - Internal server error if retrieval fails
   *
   * @example
   * // GET /api/reports
   * // Response:
   * {
   *   "success": true,
   *   "message": "Found 5 report(s)",
   *   "data": [
   *     { id: 1, title: "Report 1", ... },
   *     { id: 2, title: "Report 2", ... }
   *   ]
   * }
   */
  getAllReports: async (req, res) => {
    try {
      const result = await FlReportService.getAllFIReports();
      // console.log("📌 [Controller] Total Reports Found:", result.length);

      res.status(200).json({
        success: true,
        message: `Found ${result.length} report(s)`,
        data: result,
      });
    } catch (error) {
      // console.error("❌ [Controller] Failed to fetch reports:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch reports",
      });
    }
  },

  /**
   * Retrieve a specific FI report by ID
   * @async
   * @function getReportById
   * @memberof reportController
   * @param {Object} req - Express request object
   * @param {string} req.params.id - Report ID to retrieve
   * @param {Object} res - Express response object
   * @returns {Promise<void>} JSON response with report data and metadata
   * @throws {Error} 404 - Report not found
   * @throws {Error} 500 - Internal server error if retrieval fails
   *
   * @example
   * // GET /api/reports/123
   * // Response:
   * {
   *   "success": true,
   *   "message": "Report retrieved successfully",
   *   "data": { id: 123, title: "...", ... },
   *   "meta": {
   *     "retrievedAt": "2024-01-15T10:30:00.000Z",
   *     "reportAge": 5
   *   }
   * }
   */
  getReportById: async (req, res) => {
    try {
      const { id } = req.params;
      const report = await FlReportService.getFIReportById(id);

      res.status(200).json({
        success: true,
        message: "Report retrieved successfully",
        data: report,
        meta: {
          retrievedAt: new Date().toISOString(),
          reportAge: Math.floor(
            (new Date() - new Date(report.created_at)) / (1000 * 60 * 60 * 24)
          ),
        },
      });
    } catch (error) {
      // console.error("❌ [Controller] Failed to fetch report:", error);
      res.status(error.message === "FIReport not found" ? 404 : 500).json({
        success: false,
        message: error.message || "Failed to fetch report",
      });
    }
  },

  /**
   * Update an existing FI report
   * @async
   * @function updateReport
   * @memberof reportController
   * @param {Object} req - Express request object
   * @param {string} req.params.id - Report ID to update
   * @param {Object} req.body - Updated report data
   * @param {Object} res - Express response object
   * @returns {Promise<void>} JSON response with updated report data
   * @throws {Error} 500 - Internal server error if update fails
   *
   * @example
   * // PUT /api/reports/123
   * // Request body:
   * {
   *   "title": "Updated Report Title",
   *   "status": "completed"
   * }
   *
   * // Response:
   * {
   *   "success": true,
   *   "message": "Report updated successfully",
   *   "data": { id: 123, title: "Updated Report Title", ... }
   * }
   */
  updateReport: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedReport = await FlReportService.updateFIReport(
        id,
        updateData
      );

      res.status(200).json({
        success: true,
        message: "Report updated successfully",
        data: updatedReport,
      });
    } catch (error) {
      // console.error("❌ [Controller] Failed to update report:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update report",
      });
    }
  },

  /**
   * Delete an FI report
   * @async
   * @function deleteReport
   * @memberof reportController
   * @param {Object} req - Express request object
   * @param {string} req.params.id - Report ID to delete
   * @param {Object} res - Express response object
   * @returns {Promise<void>} JSON response confirming deletion
   * @throws {Error} 500 - Internal server error if deletion fails
   *
   * @example
   * // DELETE /api/reports/123
   * // Response:
   * {
   *   "success": true,
   *   "message": "Report deleted successfully"
   * }
   */
  deleteReport: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FlReportService.deleteFIReport(id);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      // console.error("❌ [Controller] Failed to delete report:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to delete report",
      });
    }
  },
};

module.exports = reportController;
