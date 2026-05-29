const express = require("express");

const router = express.Router();

const {
  getTrackingInfo,
  addTrackingUpdate,
} = require("../controllers/trackingController");

router.get("/:id", getTrackingInfo);

router.patch("/:id", addTrackingUpdate);

module.exports = router;
