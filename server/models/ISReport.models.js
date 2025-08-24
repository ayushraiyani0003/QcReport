const { DataTypes } = require("sequelize");

/**
 * Creates and returns the ISReport Sequelize model
 * This model represents Initial Sample (IS) reports used in automotive industry
 * for part approval processes following VDA/PPAP guidelines
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance
 * @returns {import('sequelize').Model} The ISReport model
 */
module.exports = (sequelize) => {
  const ISReport = sequelize.define(
    "ISReport",
    {
      /** @type {string} Primary key - UUID identifier for the report */
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      // === Basic Report Information ===
      /** @type {string} Name/title of the report (usually Drawing No.) */
      reportName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Name of the client/customer for easy reference */
      clientName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {Object} Complete form data structure stored as JSON for editing */
      // blankReportData: {
      //   type: DataTypes.JSON,
      //   allowNull: true,
      // },
      /** @type {string} Name of the supplier sending the report */
      senderSupplier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Name of the customer receiving the report */
      receiverCustomer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Type of report being submitted */
      reportType: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // === Sample Type Indicators ===
      /** @type {boolean} Indicates if this is a first sample submission */
      firstSample: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if this is a following/subsequent sample */
      followingSample: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if this includes test reports of other samples */
      testReportOfOtherSamples: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },

      // === Report Content Types ===
      /** @type {boolean} Indicates if functional test report is included */
      functionReport: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if dimensional report is included */
      dimensionReport: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if material report is included */
      materialReport: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if reliability test results are included */
      reliabilityTest: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if process capability study is included */
      processCapability: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if process flow chart is included */
      flowChart: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if testing device capability study is included */
      testingDeviceCapability: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if measuring methods documentation is included */
      measuringMethods: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if security data sheets are included */
      securityDataSheets: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },

      // === Sensory Test Results ===
      /** @type {boolean} Indicates if haptic (touch/feel) test results are included */
      haptics: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if acoustic test results are included */
      acoustics: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if odour test results are included */
      odour: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },

      // === Documentation ===
      /** @type {boolean} Indicates if list of used components is included */
      listUsedCompon: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if certificates are included */
      certificates: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if release of construction documentation is included */
      releaseOfConstruction: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if materials/parts documentation is included */
      materialsParts: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if other reports are included */
      otherReport: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if deviation report is included */
      deviationReport: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },

      // === Supplier Information ===
      /** @type {string} Supplier identification number */
      supplierNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Test report number assigned by supplier */
      testReportNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Part number */
      partNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Part identification */
      identification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Drawing number */
      drawingNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Level index of the drawing/specification */
      levelIndex: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Ordering call number */
      odderingCallNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Delivery note number */
      deliveryNoteNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {number} Quantity of parts supplied */
      suppliedQty: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      /** @type {number} Batch number */
      batchNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      /** @type {number} Weight of samples in grams/units */
      weightOfSamples: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      // === Customer Information ===
      /** @type {string} Customer company name */
      customerName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer identification number */
      customerNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Test report number assigned by customer */
      customerTestReportNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer order number */
      customerOrderNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer part number */
      customerPartNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer part identification */
      customerIdentification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer drawing number */
      customerDrawingNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer level index */
      customerLevelIndex: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer unloading area specification */
      customerUnloadingArea: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {Date} Customer weight of samples date - Note: Should probably be INTEGER like supplier version */
      customerWeightOfSamples: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      /** @type {number} Customer material specification */
      customerMaterial: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      /** @type {string} Customer goods number */
      customerGoodsNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // === Process Requirements ===
      /** @type {boolean} Indicates if documentation duty applies */
      documentationDuty: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if process was carried out */
      carriedOut: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if these are new parts */
      newParts: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if there was a change of product */
      changeOfProduct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if transfer to production occurred */
      transferToProduction: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if there was a longer interruption */
      longerInterruption: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if sub-supplier is involved */
      theSubSupplier: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if new tools were used */
      newTools: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if remedying of deviation was required */
      remedyingOfDeviation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if other materials were used */
      otherMaterials: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },

      // === Presentation and Acceptance ===
      /** @type {boolean} Indicates if presentation cover is included */
      presentationCover: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if acceptance at customer location is required */
      acceptanceAtTheCustomer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates if acceptance at supplier location is required */
      acceptanceAtTheSupplier: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {string} Additional notes from supplier */
      supplierNotes: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // === Standards Compliance ===
      /** @type {boolean} Indicates compliance with VDA Band guidelines */
      vdaBd: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      /** @type {boolean} Indicates compliance with PPAP guidelines */
      ppapGuideline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },

      // === Supplier Contact Details ===
      /** @type {string} Secondary supplier name/contact */
      supplierName2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Supplier department */
      supplierDepartment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Supplier phone number */
      supplierPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {Date} Date when supplier signed/submitted */
      supplierDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      /** @type {string} Supplier signature (could be file path or base64) */
      supplierSignature: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // === Customer Decision ===
      /** @type {Object} Customer decision data - JSON object containing approval/rejection details */
      decisionOfCustomer: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      // === Customer Response Details ===
      /** @type {string} Deviation approval number if applicable */
      deviationApprovalNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Return delivery date if parts need to be returned */
      returnDeliveryDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Additional notes from customer */
      customerNotes: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // === Customer Contact Details ===
      // Note: customerName is defined twice in the original - this should be resolved
      /** @type {string} Customer department */
      customerDepartment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer phone number */
      customerPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      /** @type {string} Customer signature (could be file path or base64) */
      customerSignature: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "ISReport",
      timestamps: true,
      underscored: true,
    }
  );

  return ISReport;
};
