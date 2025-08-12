const { Op } = require("sequelize");
const { ISReport } = require("../../models");

class ISReportService {
  /**
   * Create a new ISReport
   * @param {Object} reportData - The report data
   * @returns {Promise<Object>} Created report
   */
  async createReport(reportData) {
    try {
      const report = await ISReport.create(reportData);
      return {
        success: true,
        data: report,
        message: "ISReport created successfully",
      };
    } catch (error) {
      console.error("Error creating ISReport:", error); // Add logging for errors
      return {
        success: false,
        error: error.message,
        message: "Failed to create ISReport",
      };
    }
  }

  /**
   * Get all ISReports
   * @returns {Promise<Object>} List of reports
   */
  async getAllReports() {
    try {
      const reports = await ISReport.findAll(); // Fetching all reports
      return {
        success: true,
        data: reports,
        message: "Reports retrieved successfully",
      };
    } catch (error) {
      console.error("Error retrieving ISReports:", error); // Add logging for errors
      return {
        success: false,
        error: error.message,
        message: "Failed to retrieve reports",
      };
    }
  }

  /**
   * Get ISReport by ID
   * @param {string} id - Report ID
   * @returns {Promise<Object>} Report data
   */
  async getReportById(id) {
    try {
      const report = await ISReport.findByPk(id);

      if (!report) {
        return {
          success: false,
          message: "Report not found",
        };
      }

      return {
        success: true,
        data: report,
        message: "Report retrieved successfully",
      };
    } catch (error) {
      console.error("Error retrieving ISReport by ID:", error); // Add logging for errors
      return {
        success: false,
        error: error.message,
        message: "Failed to retrieve report",
      };
    }
  }

  /**
   * Update ISReport
   * @param {string} id - Report ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated report
   */
  async updateReport(id, updateData) {
    try {
      const report = await ISReport.findByPk(id);

      if (!report) {
        return {
          success: false,
          message: "Report not found",
        };
      }

      const updatedReport = await report.update(updateData);

      return {
        success: true,
        data: updatedReport,
        message: "Report updated successfully",
      };
    } catch (error) {
      console.error("Error updating ISReport:", error); // Add logging for errors
      return {
        success: false,
        error: error.message,
        message: "Failed to update report",
      };
    }
  }

  /**
   * Delete ISReport
   * @param {string} id - Report ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteReport(id) {
    try {
      const report = await ISReport.findByPk(id);

      if (!report) {
        return {
          success: false,
          message: "Report not found",
        };
      }

      await report.destroy();

      return {
        success: true,
        message: "Report deleted successfully",
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

module.exports = new ISReportService();
