const express = require("express");
const sequelize = require("./config/db");
const User = require("./models/User");
const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Mapping = require("./models/Mapping");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/patients", require("./routes/patients"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/mappings", require("./routes/mappings"));

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
