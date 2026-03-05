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
    unique: true,
  },
  difficulty: {
    type: DataTypes.ENUM("easy", "medium", "hard"),
    allowNull: false,
    unique: true,
  },
  timeLimitMs: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true,
    defaultValue: 2000,
  },
  memoryLimitKb: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true,
    defaultValue: 65536,
  },
});
export default Problem