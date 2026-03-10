import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Problem from "./Problem.js";
import User from "./User.js";

const Submission = sequelize.define(
  "Submission",
  {
    language_id: {
      type: DataTypes.INTEGER,
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
    score: {
      type: DataTypes.FLOAT,
    },
    runtime: {
      type: DataTypes.INTEGER,
    },
    memory: {
      type: DataTypes.INTEGER,
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
Submission.belongsTo(User, { foreignKey: "user_id" });
Submission.belongsTo(Problem, { foreignKey: "problem_id" });

export default Submission;
