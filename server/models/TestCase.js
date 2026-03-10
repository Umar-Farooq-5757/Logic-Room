import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Problem from "./Problem.js";

const TestCase = sequelize.define("TestCase", {
    input: {
        type: DataTypes.STRING,
    },
    output: {
        type: DataTypes.STRING
    }
});
Submission.belongsTo(Problem, { foreignKey: "problem_id" });

export default TestCase;
