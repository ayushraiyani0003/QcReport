/**
 * @fileoverview Client-side service for IS Report API operations
 * @version 1.0.0
 */

class ISReportService {
  constructor(baseURL = "/api/isreports") {
    this.baseURL = baseURL;
  }

  async _makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  /**
   * Create a new IS report
   * @param {Object} reportData - IS report data
   */
  async createReport(reportData) {
    return await this._makeRequest(this.baseURL, {
      method: "POST",
      body: JSON.stringify(reportData),
    });
  }

  /**
   * Get all IS reports
   */
  async getAllReports() {
    return await this._makeRequest(this.baseURL);
  }

  /**
   * Get an IS report by ID
   * @param {string} id - UUID of the report
   */
  async getReportById(id) {
    if (!id) throw new Error("Report ID is required");
    return await this._makeRequest(`${this.baseURL}/${id}`);
  }

  /**
   * Update an IS report by ID
   * @param {string} id - UUID of the report
   * @param {Object} reportData - Updated report data
   */
  async updateReport(id, reportData) {
    if (!id) throw new Error("Report ID is required");
    return await this._makeRequest(`${this.baseURL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(reportData),
    });
  }

  /**
   * Delete an IS report by ID
   * @param {string} id - UUID of the report
   */
  async deleteReport(id) {
    if (!id) throw new Error("Report ID is required");
    return await this._makeRequest(`${this.baseURL}/${id}`, {
      method: "DELETE",
    });
  }

  /**
   * Validate IS report data on client side
   * @param {Object} reportData - Report data to validate
   */
  validateReportData(reportData) {
    const errors = [];

    if (!reportData.senderSupplier || !reportData.senderSupplier.trim()) {
      errors.push("Sender supplier name is required");
    }
    if (!reportData.receiverCustomer || !reportData.receiverCustomer.trim()) {
      errors.push("Receiver customer name is required");
    }
    if (reportData.reportType && typeof reportData.reportType !== "string") {
      errors.push("Invalid report type format");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate UUID format
   */
  isValidUUID(uuid) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Format IS report for display
   */
  formatReportForDisplay(report) {
    return {
      ...report,
      displayName: `${report.senderSupplier || "Unknown"} → ${
        report.receiverCustomer || "Unknown"
      }`,
      createdAt: new Date(report.createdAt).toLocaleDateString(),
      updatedAt: new Date(report.updatedAt).toLocaleDateString(),
    };
  }

  /**
   * Format multiple IS reports for display
   */
  formatReportsForDisplay(reports) {
    return reports.map((report) => this.formatReportForDisplay(report));
  }
}

export default ISReportService;
