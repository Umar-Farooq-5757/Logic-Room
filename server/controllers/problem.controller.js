import Problem from "../models/Problem.js";
import TestCase from "../models/TestCase.js";

const createProblem = async (req, res) => {
  try {
    const prob = await Problem.create(req.body);
    res.json({ success: true, message: "problem created successfully" });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
      message: "Error while creating problem",
    });
  }
};
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.findAll();
    return res.json({ success: true, problems });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
      message: "Error while fetching problems",
    });
  }
};
const getProblem = async (req, res) => {
  const { slug } = req.params;
  try {
    const problem = await Problem.findOne({ where: { slug } });
    const testCases = await TestCase.findAll({
      where: { problem_id: problem.id },
    });
    return res.json({ success: true, problem, testCases });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
      message: "Error while fetching problems",
    });
  }
};

export default { createProblem, getAllProblems,getProblem };
