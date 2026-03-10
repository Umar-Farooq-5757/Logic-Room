import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Problem = sequelize.define("Problem", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  statement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM("easy", "medium", "hard"),
    allowNull: false,
  },
  constraints: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeLimitMs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2000,
  },
  memoryLimitKb: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 65536,
  },
  example_input: {
    type: DataTypes.STRING,
    allowNull: false
  },
  example_output: {
    type: DataTypes.STRING,
    allowNull: false
  },
  explaination:{
    type:DataTypes.STRING,
    allowNull:false
  }
});
export default Problem