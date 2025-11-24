const aiService = require("../services/aiService");
const priorityEngine = require("../services/priorityEngine");
const admin = require("firebase-admin");
// Simple in-memory store (for quick start). Replace with Firestore in production.
const tasks = {};

exports.createTask = async (req, res) => {
  try {
    const { userId, text, deadline } = req.body;
    const features = await aiService.extractTaskFeatures(text, deadline);
    const priorityResult = priorityEngine.computePriority(features);
    const taskId = Date.now().toString();
    const taskObj = {
      taskId,
      userId,
      text,
      deadline: features.deadline || deadline || null,
      duration: features.estimatedDuration || null,
      category: features.category || null,
      urgency: features.urgencyScore,
      importance: features.importanceScore,
      priorityScore: priorityResult.score,
      priorityLabel: priorityResult.label,
      summary: features.summary,
      createdAt: new Date().toISOString()
    };
    if (!tasks[userId]) tasks[userId] = [];
    tasks[userId].push(taskObj);

    // If firebase-admin is initialized, try to save to Firestore (optional)
    try {
      if (admin.apps && admin.apps.length) {
        const db = admin.firestore();
        await db.collection("users").doc(userId).collection("tasks").doc(taskId).set(taskObj);
      }
    } catch (e) {
      // ignore firestore save errors (dev)
    }

    return res.json({ success: true, task: taskObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUserTasks = async (req, res) => {
  const { userId } = req.params;
  res.json({ success: true, tasks: tasks[userId] || [] });
};
