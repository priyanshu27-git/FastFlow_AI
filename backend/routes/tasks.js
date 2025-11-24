const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

// create task (frontend sends raw text & metadata)
router.post("/", aiController.createTask);

// get tasks for user (frontend passes user id)
router.get("/user/:userId", aiController.getUserTasks);

module.exports = router;
