import Problem from "../models/Problem.js"

const createProblem = async (req, res) => {
    try {
        const prob = await Problem.create(req.body);
        res.json({success:true,message:"problem created successfully"})
    } catch (err) {
        res.json({ success: false, message: "Error while creating problem" })
    }
}
const getAllProblems = async(req,res)=>{
    try {
        const problems = await Problem.findAll();
        return res.json({success:true,problems})
    } catch (err) {
        res.json({ success: false, message: "Error while fetching problems" })
    }
}

export default {createProblem,getAllProblems}