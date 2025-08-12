const { DataTypes } = require("sequelize");

/**
 * Creates and returns the FIReport Sequelize model
 * This model represents Final Inspection (FI) reports used in quality control
 * and automotive industry compliance processes
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance
 * @param {typeof import('sequelize').DataTypes} DataTypes - Sequelize DataTypes (optional, already imported)
 * @returns {import('sequelize').Model} The FIReport model
 */
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "FIReport",
    {
      /** @type {string} Primary key - UUID identifier for the report */
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Fixed: should be UUIDV4, not UUID
        primaryKey: true,
        allowNull: false,
      },

      // === Basic Report Information ===
      /** @type {string} Name/title of the inspection report */
      reportName: {
        type: DataTypes.STRING,
        allowNull: true, // Fixed: removed duplicate allowNull declarations
      },
      /** @type {string} Name of the client/customer for whom the report is created */
      clientName: {
        type: DataTypes.STRING,
        allowNull: true, // Fixed: removed duplicate allowNull declarations
      },
      /** @type {string} Current status of the report (e.g., 'draft', 'pending', 'approved', 'rejected') */
      status: {
        type: DataTypes.STRING,
        allowNull: true, // Fixed: removed duplicate allowNull declarations
      },

      // === Report Types and Components ===
      /** @type {boolean} Indicates if final inspection report follows VDA standards */
      finalINSReportVDA: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if dimensional inspection report is included */
      dimensionReport: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if haptics/visual inspection (VI) is included */
      hapticsVI: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if material inspection report is included */
      materialReport: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if materials/bought parts inspection is included */
      materialsBoughtParts: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },

      // === Supplier Information ===
      /** @type {number} Supplier identification number */
      supplierNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      /** @type {string} Name of the supplier company */
      supplierName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {Date} Date of the inspection/report creation */
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      /** @type {string} Test report number assigned by supplier */
      testRepNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Part/sub-part number with cavity information */
      partSubNoCavity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Part identification code/description */
      identification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Technical drawing number */
      drawingNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Level/date index for drawing version control */
      levelDateIndex: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // === Customer Information ===
      /** @type {string} Test report number assigned by customer */
      customerTestReNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer's part/sub-part number with cavity information */
      customerPartSubNoCavity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer's part identification code/description */
      customerIdentification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer's technical drawing number */
      customerDrawingNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer's level/date index for drawing version control */
      customerLevelDateIndex: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // === Report Data Storage ===
      /**
       * @type {Object} Blank/template report data structure
       * Contains the base template or empty form structure for the report
       */
      blankReportData: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      /**
       * @type {Object} Supplier-filled data
       * Contains all data and measurements filled in by the supplier
       */
      supplierFiledData: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      /**
       * @type {Object} Customer-filled data
       * Contains customer responses, approvals, and feedback data
       */
      customerFiledData: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      // === Additional Information ===
      /** @type {string} Additional remarks or notes from the supplier */
      remarkSupplier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "FIReport",
      timestamps: true,
      underscored: true,
    }
  );

  return Report;
};
