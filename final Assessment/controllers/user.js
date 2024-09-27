const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// creating a new user
const createUser = async (req,res) =>{
    const { password, ...others} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new userModel({ ...others, password:hashedPassword });
    try {
        await newUser.save();
        res.json({ message: "PROFILE CREATED SUCCESSFULLY" });
    } catch (error) {
        res.status(500).json({ message: "sorry!!! something went wrong"})
    };
};

// logging in function
const loginUser = async (req,res)=> {
    const { email, password } = req.body;
    try {
        const userInfo = await userModel.findOne({ email });
        if(!userInfo){
            return res.json({ message: "wrong credentials" });
        };
        const verify = bcrypt.compareSync(password, userInfo.password);
        if(!verify){
            return res.json({ message: "wrong credentials" });
        };
            const aboutUser = {id: userInfo.id};
            const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
            res.cookie("user_token", token);
            res.json({ message: "user logged in successfully"});
    } catch (error) {
        res.status(500).json({ message: "sorry!!! something went wrong"})
    }

};

const logoutUser = async (req, res) =>{
    try {
        res
                .clearCookie("user_token")
                .status(200)
                .json({ message: "user logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "sorry!!! something went wrong"})
   
    }
};

 const deleteUser = async (req, res) =>{
     const { id } = req.user;
    try {
        await userModel.findByIdAndDelete(id);
        res
            .cookie("user_token")
            .status(200)
            .json({ message: "user deleted successfully"});

    } catch (error) {
        res.status(500).json({ message: "sorry!!! something went wrong"})

    }
 };

 const oauthRegister = async (req, res) => {
    const { userName, email, gender } = req.body;
    try {
        const findOne = await userModel.findOne({ email });
        if(findOne && findOne.necessaryInfo){
            res.json({ message: "Duplicate Account Is Prohibited" });

        if(findOne){
            const aboutUser = {id: findOne.id};
            const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
            res.cookie("user_token", token);
            return res.json({ message: "user loggedin successfully"});
        };

        const newUser = new userModel({ userName, email, gender });
        const savedUser = await newUser.save();
        const aboutUser = {id: savedUser.id};
        const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
        res.cookie("user_token", token).status(200).json({ message: "user deleted successfully"});
        return res.json({ message: "user loggedin successfully"});        
    }
} catch (error) {
        res.status(500).json({ message: "sorry!!! something went wrong"})
    }
 }




module.exports = { createUser, loginUser, logoutUser, deleteUser, oauthRegister };