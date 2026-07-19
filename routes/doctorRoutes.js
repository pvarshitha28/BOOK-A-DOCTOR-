const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");
const { authMiddleware, isDoctor } = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post(
  "/getDoctorInfo",
  authMiddleware,
  isDoctor,
  getDoctorInfoController
);

//POST UPDATE PROFILE
router.post(
  "/updateProfile",
  authMiddleware,
  isDoctor,
  updateProfileController
);

//POST  GET SINGLE DOC INFO (any logged-in patient can view a doctor's profile before booking)
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//GET Appointments
router.get(
  "/doctor-appointments",
  authMiddleware,
  isDoctor,
  doctorAppointmentsController
);

//POST Update Status
router.post(
  "/update-status",
  authMiddleware,
  isDoctor,
  updateStatusController
);

module.exports = router;