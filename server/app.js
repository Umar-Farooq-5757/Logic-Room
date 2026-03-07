import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/db.js";
import userRouter from "./routes/user.routes.js";

const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api", userRouter);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connection established.");

    await sequelize.sync({ alter: true });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
startServer();
