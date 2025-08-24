/**
 * @fileoverview Client-side service for FI Report API operations
 * @version 1.0.0
 */

class FIReportService {
  constructor(baseURL = "/api/reports/fl") {
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
   * Create a new FI report
   * @param {Object} reportData - FI report data
   */
  async createReport(reportData) {
    return await this._makeRequest(this.baseURL, {
      method: "POST",
      body: JSON.stringify(reportData),
    });
  }

  /**
   * Get all FI reports
   */
  async getAllReports() {
    return await this._makeRequest(this.baseURL);
  }

  /**
   * Get a FI report by ID
   * @param {string} id - UUID of the report
   */
  async getReportById(id) {
    if (!id) throw new Error("Report ID is required");
    return await this._makeRequest(`${this.baseURL}/${id}`);
  }

  /**
   * Update a FI report by ID
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
   * Delete a FI report by ID
   * @param {string} id - UUID of the report
   */
  async deleteReport(id) {
    if (!id) throw new Error("Report ID is required");
    return await this._makeRequest(`${this.baseURL}/${id}`, {
      method: "DELETE",
    });
  }

  /**
   * Validate FI report data on client side
   * @param {Object} reportData - Report data to validate
   */
  validateReportData(reportData) {
    const errors = [];

    if (!reportData.reportName || !reportData.reportName.trim()) {
      errors.push("Report name is required");
    }
    if (!reportData.clientName || !reportData.clientName.trim()) {
      errors.push("Client name is required");
    }
    if (reportData.status && typeof reportData.status !== "string") {
      errors.push("Invalid status format");
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
   * Format FI report for display
   */
  formatReportForDisplay(report) {
    return {
      ...report,
      displayName: report.reportName || `Report ${report.id}`,
      createdAt: new Date(report.createdAt).toLocaleDateString(),
      updatedAt: new Date(report.updatedAt).toLocaleDateString(),
      date: report.date ? new Date(report.date).toLocaleDateString() : null,
    };
  }

  /**
   * Format multiple reports for display
   */
  formatReportsForDisplay(reports) {
    return reports.map((report) => this.formatReportForDisplay(report));
  }
}

export default FIReportService;
