const { Op } = require("sequelize");
const { FIReport } = require("../../models");

class FlReportService {
    /**
     * Create a new FIReport record
     */
    createFIReport = async (data) => {
        try {
            const report = await FIReport.create(data);
            return report.toJSON();
        } catch (error) {
            throw new Error(`Failed to create FIReport: ${error.message}`);
        }
    };

    /**
     * Get all FIReports with optional filters and pagination
     */
    getAllFIReports = async () => {
        try {
            // Fetch all reports from the database
            const reports = await FIReport.findAll();

            if (!reports || reports.length === 0) {
                console.log("No reports found.");
                return []; // Return an empty array if no reports are found
            }

            // Extract the dataValues from each report
            const filteredReports = reports.map((report) => {
                return report.dataValues; // Extract only the necessary data from each report
            });

            // console.log("Filtered Reports:", filteredReports);

            // Return the filtered reports
            return filteredReports;
        } catch (error) {
            console.error("Error fetching reports:", error);
            throw new Error("Failed to fetch reports");
        }
    };

    /**
     * Get a single FIReport by ID
     */
    getFIReportById = async (id) => {
        try {
            const report = await FIReport.findByPk(id);
            if (!report) throw new Error("FIReport not found");
            return report.toJSON();
        } catch (error) {
            throw new Error(`Failed to fetch FIReport: ${error.message}`);
        }
    };

    /**
     * Update a FIReport by ID
     */
    updateFIReport = async (id, data) => {
        try {
            const report = await FIReport.findByPk(id);
            if (!report) throw new Error("FIReport not found");

            await report.update(data);
            await report.reload();
            return report.toJSON();
        } catch (error) {
            throw new Error(`Failed to update FIReport: ${error.message}`);
        }
    };

    /**
     * Delete a FIReport (permanent delete)
     */
    deleteFIReport = async (id) => {
        try {
            const report = await FIReport.findByPk(id);
            if (!report) throw new Error("FIReport not found");

            await report.destroy();
            return { success: true, message: "FIReport deleted successfully" };
        } catch (error) {
            throw new Error(`Failed to delete FIReport: ${error.message}`);
        }
    };
}

module.exports = new FlReportService();

// 5 methord need
// 1. createFIReport
// 2. getAllFIReports
// 3. getFIReportById
// 4. updateFIReport
// 5. deleteFIReport

// not other function i need
