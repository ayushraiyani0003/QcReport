// =================== models/index.js ===================
const { Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");

const models = {};

// Import all model definitions
const UserList = require("./Userlist.model");
const FIReport = require("../models/FIReport.model");
const ISReport = require("../models/ISReport.models");

// Initialize models - pass sequelize instance and DataTypes
models.UserList = UserList(sequelize, Sequelize.DataTypes);
models.FIReport = FIReport(sequelize, Sequelize.DataTypes);
models.ISReport = ISReport(sequelize, Sequelize.DataTypes);

// Setup associations after all models are loaded
Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

// Add sequelize instance and constructor to models object
models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
