require("dotenv").config();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt=require('jsonwebtoken');
const { SECRET_KEY } = process.env;




const register = async (req,res) => {

    let {email, password, name} = req.body;


    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({email: email});



    if(existingUser) {
        return res.status(400).json({
            message: "Email already exists!"
        })
    } else {

        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        const result = await user.save();


        const { _id } =  await result.toJSON(); 

        const { password, __v, ...data} = result.toJSON();

        const token = jwt.sign({_id: _id, user: data }, SECRET_KEY, {expiresIn: '30m'});

        res.cookie("jwt",token,{
            httpOnly:true,
            maxAge: 24*60*60*1000
        });

        res.status(200).json({
            message: "success"
        });

        
    }

}


const login = async (req,res) => {

    const user = await User.findOne({email: req.body.email});


    if(!user) {
        return res.status(400).json({
            message: "User not found"
        })
    }

    if(!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            message: "Email or Password incorrect"
        })
    }

    const { password, __v, ...data} = user._doc;

    const token=jwt.sign({_id:user._id, user: data}, SECRET_KEY, { expiresIn: '30m'});
    res.cookie("jwt",token,{
        httpOnly: true,
        maxAge:24*60*60*1000
    });

    
    return res.status(200).json({
        message: "success"
    })
}


const logout = async (req,res) => {

    res.cookie("jwt", "", {
        maxAge:0
    })

    return res.status(200).json({
        message: "success"
    })
}


const currUser = async(req, res) => {

    let user = User.findOne(req.user._id);

    return res.status(200).json({status: "success"
},

    );
}

module.exports = {
    register,
    login,
    logout,
    currUser
}