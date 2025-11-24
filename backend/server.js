const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const tasksRouter = require("./routes/tasks");

const app = express();
// CORS - in production set allowed origins
app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
