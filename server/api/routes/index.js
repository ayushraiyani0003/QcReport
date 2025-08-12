const express = require("express");
const router = express.Router();

const userListRoutes = require("./Userlist.routes");
const reportRoutes = require("./FIReport.routes");
const isReportRoutes = require("./ISReport.routes");

router.use("/users", userListRoutes);
router.use("/reports/fl", reportRoutes);
router.use("/isReports", isReportRoutes); // ✅ Ensure no `:` used here

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    endpoints: {
      users: "/api/users",
      reports: "/api/reports/fl",
      isReports: "/api/isreports",
      health: "/api/health",
    },
    version: "1.0.0",
  });
});

module.exports = router;
