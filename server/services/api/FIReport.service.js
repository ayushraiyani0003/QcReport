const { Op } = require("sequelize");
const { FIReport } = require("../../models"); // ✅ index.js માંથી import

/**
 * @fileoverview Service class for managing FI Report operations
 * @module FlReportService
 */

/**
 * Service class for handling FI Report database operations
 * Provides CRUD operations for FIReport model with error handling and logging
 *
 * @class FlReportService
 * @description Manages all database interactions for FI Reports including
 * create, read, update, delete operations with proper error handling
 */
class FlReportService {
  /**
   * Create a new FIReport record in the database
   *
   * @async
   * @method createFIReport
   * @param {Object} data - The report data to create
   * @param {string} [data.title] - Report title
   * @param {string} [data.description] - Report description
   * @param {string} [data.status] - Report status (draft, in_progress, completed)
   * @param {string} [data.category] - Report category
   * @param {Object} [data.metadata] - Additional report metadata
   * @returns {Promise<Object>} The created report object as JSON
   * @throws {Error} Throws error if report creation fails
   *
   * @example
   * const reportData = {
   *   title: "Financial Investigation Report",
   *   description: "Investigation of suspicious transactions",
   *   status: "draft",
   *   category: "financial_crime"
   * };
   * const newReport = await service.createFIReport(reportData);
   * console.log(newReport.id); // Newly created report ID
   */
  createFIReport = async (data) => {
    try {
      const report = await FIReport.create(data);
      return report.toJSON();
    } catch (error) {
      // console.error("❌ [Service] Failed to create FIReport:", error);
      throw new Error(`Failed to create FIReport: ${error.message}`);
    }
  };

  /**
   * Retrieve all FIReport records from the database
   *
   * @async
   * @method getAllFIReports
   * @returns {Promise<Array<Object>>} Array of report objects as JSON
   * @throws {Error} Throws error if fetching reports fails
   *
   * @example
   * const allReports = await service.getAllFIReports();
   * console.log(`Found ${allReports.length} reports`);
   * allReports.forEach(report => {
   *   console.log(`Report: ${report.title} - Status: ${report.status}`);
   * });
   */
  getAllFIReports = async () => {
    try {
      // console.log("📌 [Service] getAllFIReports called");

      const reports = await FIReport.findAll();
      // console.log("✅ [Service] Raw reports from DB:", reports);

      if (!reports || reports.length === 0) {
        // console.log("⚠️ [Service] No reports found in DB");
        return [];
      }

      const filteredReports = reports.map((report) => report.toJSON());
      // console.log("✅ [Service] Filtered Reports:", filteredReports);

      return filteredReports;
    } catch (error) {
      // console.error("❌ [Service] Error in getAllFIReports:", error);
      throw new Error(error.message || "Failed to fetch reports");
    }
  };

  /**
   * Retrieve a single FIReport by its primary key ID
   *
   * @async
   * @method getFIReportById
   * @param {string|number} id - The unique identifier of the report
   * @returns {Promise<Object>} The report object as JSON
   * @throws {Error} Throws "FIReport not found" if report doesn't exist
   * @throws {Error} Throws error if database operation fails
   *
   * @example
   * try {
   *   const report = await service.getFIReportById(123);
   *   console.log(`Found report: ${report.title}`);
   *   console.log(`Created: ${report.created_at}`);
   * } catch (error) {
   *   if (error.message === "FIReport not found") {
   *     console.log("Report does not exist");
   *   }
   * }
   */
  getFIReportById = async (id) => {
    try {
      const report = await FIReport.findByPk(id);
      if (!report) throw new Error("FIReport not found");
      return report.toJSON();
    } catch (error) {
      // console.error("❌ [Service] Failed to fetch FIReport:", error);
      throw new Error(`Failed to fetch FIReport: ${error.message}`);
    }
  };

  /**
   * Update an existing FIReport by ID
   *
   * @async
   * @method updateFIReport
   * @param {string|number} id - The unique identifier of the report to update
   * @param {Object} data - The updated report data
   * @param {string} [data.title] - Updated report title
   * @param {string} [data.description] - Updated report description
   * @param {string} [data.status] - Updated report status
   * @param {string} [data.category] - Updated report category
   * @param {Object} [data.metadata] - Updated report metadata
   * @returns {Promise<Object>} The updated report object as JSON
   * @throws {Error} Throws "FIReport not found" if report doesn't exist
   * @throws {Error} Throws error if update operation fails
   *
   * @example
   * const updateData = {
   *   status: "completed",
   *   description: "Investigation completed with findings"
   * };
   * const updatedReport = await service.updateFIReport(123, updateData);
   * console.log(`Report updated: ${updatedReport.title}`);
   */
  updateFIReport = async (id, data) => {
    try {
      const report = await FIReport.findByPk(id);
      if (!report) throw new Error("FIReport not found");

      await report.update(data);
      await report.reload();
      return report.toJSON();
    } catch (error) {
      // console.error("❌ [Service] Failed to update FIReport:", error);
      throw new Error(`Failed to update FIReport: ${error.message}`);
    }
  };

  /**
   * Delete a FIReport by ID
   *
   * @async
   * @method deleteFIReport
   * @param {string|number} id - The unique identifier of the report to delete
   * @returns {Promise<Object>} Success response object
   * @returns {boolean} returns.success - Always true for successful deletion
   * @returns {string} returns.message - Success message
   * @throws {Error} Throws "FIReport not found" if report doesn't exist
   * @throws {Error} Throws error if deletion fails
   *
   * @example
   * try {
   *   const result = await service.deleteFIReport(123);
   *   console.log(result.message); // "FIReport deleted successfully"
   * } catch (error) {
   *   if (error.message === "FIReport not found") {
   *     console.log("Cannot delete - report does not exist");
   *   }
   * }
   */
  deleteFIReport = async (id) => {
    try {
      const report = await FIReport.findByPk(id);
      if (!report) throw new Error("FIReport not found");

      await report.destroy();
      return { success: true, message: "FIReport deleted successfully" };
    } catch (error) {
      // console.error("❌ [Service] Failed to delete FIReport:", error);
      throw new Error(`Failed to delete FIReport: ${error.message}`);
    }
  };
}

module.exports = new FlReportService();
