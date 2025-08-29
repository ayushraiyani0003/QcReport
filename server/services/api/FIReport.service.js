const { Op } = require("sequelize");
const { FIReport } = require("../../models"); // ✅ index.js માંથી import

/**
 * @fileoverview Service class for managing FI Report operations
 * @module FlReportService
 */

/**
 * Service class for handling FI Report database operations
 * Provides CRUD operations for FIReport model with error handling and logging
 */
class FlReportService {
  /**
   * Create a new FIReport record in the database
   */
  createFIReport = async (data) => {
    try {
      console.log(
        "💾 [Service] Creating FIReport with data:",
        JSON.stringify(data, null, 2)
      );

      const report = await FIReport.create(data);
      const result = report.toJSON();

      console.log("✅ [Service] FIReport created successfully:", result.id);
      return result;
    } catch (error) {
      console.error("❌ [Service] Failed to create FIReport:", error);
      throw new Error(`Failed to create FIReport: ${error.message}`);
    }
  };

  /**
   * Retrieve all FIReport records from the database
   */
  getAllFIReports = async () => {
    try {
      console.log("📌 [Service] getAllFIReports called");

      const reports = await FIReport.findAll();
      console.log("✅ [Service] Raw reports from DB:", reports.length);

      if (!reports || reports.length === 0) {
        console.log("⚠️ [Service] No reports found in DB");
        return [];
      }

      const filteredReports = reports.map((report) => report.toJSON());
      console.log("✅ [Service] Filtered Reports:", filteredReports.length);

      return filteredReports;
    } catch (error) {
      console.error("❌ [Service] Error in getAllFIReports:", error);
      throw new Error(error.message || "Failed to fetch reports");
    }
  };

  /**
   * Retrieve a single FIReport by its primary key ID
   */
  getFIReportById = async (id) => {
    try {
      console.log("🔍 [Service] Fetching FIReport by ID:", id);

      const report = await FIReport.findByPk(id);
      if (!report) {
        console.log("❌ [Service] FIReport not found for ID:", id);
        throw new Error("FIReport not found");
      }

      const result = report.toJSON();
      console.log("✅ [Service] FIReport found:", result.id);
      return result;
    } catch (error) {
      console.error("❌ [Service] Failed to fetch FIReport:", error);
      throw new Error(`Failed to fetch FIReport: ${error.message}`);
    }
  };

  /**
   * Update an existing FIReport by ID
   */
  /**
   * Update an existing FIReport by ID
   * Now properly handles null values to overwrite existing data
   */
  updateFIReport = async (id, data) => {
    try {
      console.log("🔄 [Service] Updating FIReport ID:", id);
      console.log("🔄 [Service] Update data:", JSON.stringify(data, null, 2));

      const report = await FIReport.findByPk(id);
      if (!report) {
        console.log("❌ [Service] FIReport not found for update, ID:", id);
        throw new Error("FIReport not found");
      }

      console.log("🔍 [Service] Found existing report:", report.id);

      // Use the update method with explicit null handling
      const [updatedRowsCount] = await FIReport.update(data, {
        where: { id: id },
        // This ensures null values overwrite existing data
        individualHooks: false, // Better performance for single updates
        // Don't exclude null values - let them update the database
        fields: Object.keys(data), // Explicitly specify which fields to update
      });

      console.log("📊 [Service] Updated rows count:", updatedRowsCount);

      if (updatedRowsCount === 0) {
        console.log("⚠️ [Service] No rows were updated");
        throw new Error("No rows were updated");
      }

      // Fetch the updated report to return latest data
      const updatedReport = await FIReport.findByPk(id);
      if (!updatedReport) {
        throw new Error("Failed to fetch updated report");
      }

      const result = updatedReport.toJSON();
      console.log("✅ [Service] FIReport updated successfully:", result.id);

      return result;
    } catch (error) {
      console.error("❌ [Service] Failed to update FIReport:", error);
      throw new Error(`Failed to update FIReport: ${error.message}`);
    }
  };
  /**
   * Delete a FIReport by ID
   */
  deleteFIReport = async (id) => {
    try {
      const report = await FIReport.findByPk(id);
      if (!report) throw new Error("FIReport not found");

      await report.destroy();
      return { success: true, message: "FIReport deleted successfully" };
    } catch (error) {
      console.error("❌ [Service] Failed to delete FIReport:", error);
      throw new Error(`Failed to delete FIReport: ${error.message}`);
    }
  };
}

module.exports = new FlReportService();
