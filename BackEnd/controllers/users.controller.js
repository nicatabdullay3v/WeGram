import User from "../models/user.model.js";

export const getUsers = async(req,res)=>{
    try {
        // const loggedUserId= req.user._id
        const allUsers = await User.find().select("-password")
        return res.status(200).json(allUsers)
    } catch (error) {
    res.status(500).json({ error: "Iternal Server Error" });
        
    }
}