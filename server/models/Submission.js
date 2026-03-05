import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Problem from "./Problem.js";
import User from "./User.js";

const Submission = sequelize.define(
  "Submission",
  {
    language_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    source_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "queued",
        "running",
        "accepted",
        "wrong_answer",
        "runtime_error",
        "compile_error",
        "judged",
      ),
      defaultValue: "queued",
    },
    verdict: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
    },
    runtime: {
      type: DataTypes.NUMBER,
    },
    memory: {
      type: DataTypes.NUMBER,
    },
    stdout: {
      type: DataTypes.TEXT,
    },
    stderr: {
      type: DataTypes.TEXT,
    },
    compile_output: {
      type: DataTypes.TEXT,
    },
    judge_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  },
);
Submission.belongsTo(User, { foreignKey: "userId" });
Submission.belongsTo(Problem, { foreignKey: "problemId" });

export default Submission;
