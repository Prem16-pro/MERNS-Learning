const userModel = require("../models/User");

const loginController = async  (req,res)=>{
    const {email , password} = req.body;
    const user = await userModel.findOne({ email : email, password : password});
    if(user) {
        return res.json({ success : "User found"});
    }
    else {
        console.log(user);
        return res.json({ failure : "User not found"});
    }
    // console.log("Email Rec:",email);
    // console.log("Password Rec:",password);

    // res.send({"ok":'Hello'})
}

module.exports = loginController;