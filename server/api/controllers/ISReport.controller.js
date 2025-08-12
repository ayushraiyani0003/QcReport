const ISReportService = require("../../services/api/ISReport.service");

class ISReportController {
  /**
   * Create a new ISReport
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createReport(req, res) {
    try {
      const result = await ISReportService.createReport(req.body);

      if (result.success) {
        return res.status(201).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error in createReport controller:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "Internal server error",
      });
    }
  }

  /**
   * Get all ISReports
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllReports(req, res) {
    try {
      const result = await ISReportService.getAllReports();

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error in getAllReports controller:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "Internal server error",
      });
    }
  }

  /**
   * Get ISReport by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getReportById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const result = await ISReportService.getReportById(id);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in getReportById controller:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "Internal server error",
      });
    }
  }

  /**
   * Update ISReport
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateReport(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Update data is required",
        });
      }

      const result = await ISReportService.updateReport(id, req.body);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in updateReport controller:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "Internal server error",
      });
    }
  }

  /**
   * Delete ISReport
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteReport(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const result = await ISReportService.deleteReport(id);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in deleteReport controller:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new ISReportController();
