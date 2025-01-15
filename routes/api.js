const PatientController = require("../controllers/PatientController");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Patient API");
});

// patients routes
router.get("/patients", PatientController.index); // Get All Resource
router.post("/patients", PatientController.store); // Add Resource
router.put("/patients/:id", PatientController.update); // Edit Resource
router.delete("/patients/:id", PatientController.destroy); // Delete Resource
router.get("/patients/:id", PatientController.show); // Get Detail Resource
router.get("/patients/search/:name", PatientController.search); // Search Resource by name
router.get("/patients/status/positive", PatientController.positive); // Get Positive Resource
router.get("/patients/status/recovered", PatientController.recovered); // Get Recovered Resource
router.get("/patients/status/dead", PatientController.dead); // Get Dead Resource

//export router
module.exports = router;
