
const bcrypt=require('bcrypt');
const User=require("../models/User");
const jwt=require('jsonwebtoken');
//const {options}=require("../routes/user")
require("dotenv").config();

exports.signup = async (req,res) => {
    try{
        const {name, email, password ,role} =req.body;

        const existinguser =await User.findOne({email});
        if (existinguser) 
        {
        return res.status(400).json(
            {
                success:false,
                message:'user already exist'
            }
        );
        }

        let hashedpassword;
        try{
            hashedpassword= await bcrypt.hash(password,10);
        }

        catch(err){
            return res.status(500).json(
                {
                    success:false,
                    message:'Error in hashing password'
                }
            );
        }

        const user = await User.create({name,email,password:hashedpassword,role})

        return res.status(200).json({
            success :true,
            message:"successfully created"
        });
    }

    catch(error){
            console.error(error);
           
            return res.status(500).json({
                success: false,
                message :"Internal server error",
            });
    }
}


exports.login=async(req,res) => {
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully",
            })
        }

        let user=await User.findOne({email});

        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User is not registered",
            })
        }

        const payload={
            email:user.email,
            id:user._id,
            role:user.role
        };
        if(await bcrypt.compare(password,user.password)){
            let token=jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

            user=user.toObject();
            user.token=token;
            user.password=undefined;

            const option={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            
            res.cookie("token",token,option).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully"
            })

        }
        else{
            return res.status(404).json({
                success:false,
                message:"Password Incorresct",
            })
        }


    }catch(err){
        console.error(err);

        return res.status(500).json({
            success:false,
            message:"internal Server Error",
            error:err.message,
        })
    }
}