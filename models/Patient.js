const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Patient = sequelize.define("Patient", {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  disease: { type: DataTypes.STRING },
});

User.hasMany(Patient, { foreignKey: "userId" });
Patient.belongsTo(User, { foreignKey: "userId" });

module.exports = Patient;
