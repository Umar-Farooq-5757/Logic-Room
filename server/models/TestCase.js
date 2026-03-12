import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Problem from "./Problem.js";

const TestCase = sequelize.define("Testcase", {
    input: {
        type: DataTypes.STRING,
    },
    output: {
        type: DataTypes.STRING
    }, problem_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'testcases',
});
TestCase.belongsTo(Problem, { foreignKey: "problem_id" });

export default TestCase;
