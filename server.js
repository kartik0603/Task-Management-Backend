const express = require("express");
const helmet = require("helmet");

const connectDB = require("./config/db");
const taskRouter = require("./routes/task.route");
const authRouter = require("./routes/auth.route");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(helmet());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;