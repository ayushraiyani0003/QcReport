// =================== controllers/FIReport.controller.js ===================
const FlReportService = require("../../services/api/FIReport.service");

/**
 * @module reportController
 *
 * This controller handles the operations related to FI Reports such as creating, retrieving,
 * updating, and deleting reports.
 */
const reportController = {
  /**
   * Create a new report
   *
   * @async
   * @function createReport
   * @param {Object} req - The request object containing the report data in the body.
   * @param {Object} res - The response object to send the result or error back to the client.
   * @returns {Object} - JSON response with success status and created report data.
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
      // console.error("Failed to create report:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create report",
      });
    }
  },

  /**
   * Get all reports without any filters or pagination.
   *
   * @async
   * @function getAllReports
   * @param {Object} req - The request object.
   * @param {Object} res - The response object to send the result or error back to the client.
   * @returns {Object} - JSON response with success status and list of all reports.
   */
  getAllReports: async (req, res) => {
    try {
      const result = await FlReportService.getAllFIReports(); // No pagination or filters anymore
      //   console.log("this is result", result);

      // Use the length of the result array for the report count
      res.status(200).json({
        success: true,
        message: `Found ${result.length} report(s)`, // Use result.length instead of result.pagination.totalRecords
        data: result,
      });
    } catch (error) {
      //   console.error("Failed to fetch reports:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch reports",
      });
    }
  },

  /**
   * Get a specific report by ID
   *
   * @async
   * @function getReportById
   * @param {Object} req - The request object containing the report ID in the URL params.
   * @param {Object} res - The response object to send the result or error back to the client.
   * @returns {Object} - JSON response with success status, retrieved report data, and meta information.
   */
  getReportById: async (req, res) => {
    try {
      const { id } = req.params;
      const report = await getFIReportById(id);

      res.status(200).json({
        success: true,
        message: "Report retrieved successfully",
        data: report,
        meta: {
          retrievedAt: new Date().toISOString(),
          reportAge: Math.floor(
            (new Date() - new Date(report.created_at)) / (1000 * 60 * 60 * 24)
          ), // days
        },
      });
    } catch (error) {
      console.error("Failed to fetch report:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch report",
      });
    }
  },

  /**
   * Update a specific report by ID
   *
   * @async
   * @function updateReport
   * @param {Object} req - The request object containing the report ID in the URL params and the updated data in the body.
   * @param {Object} res - The response object to send the result or error back to the client.
   * @returns {Object} - JSON response with success status, updated report data, and meta information.
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
      //   console.error("Failed to update report:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update report",
      });
    }
  },

  /**
   * Delete a specific report by ID
   *
   * @async
   * @function deleteReport
   * @param {Object} req - The request object containing the report ID in the URL params.
   * @param {Object} res - The response object to send the result or error back to the client.
   * @returns {Object} - JSON response with success status, deletion message, and meta information.
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
      //   console.error("Failed to delete report:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete report",
      });
    }
  },
};

module.exports = reportController;
