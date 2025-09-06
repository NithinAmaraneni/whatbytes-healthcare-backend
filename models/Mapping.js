const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Patient = require("./Patient");
const Doctor = require("./Doctor");

const Mapping = sequelize.define("Mapping", {});

Patient.belongsToMany(Doctor, { through: Mapping });
Doctor.belongsToMany(Patient, { through: Mapping });

module.exports = Mapping;
