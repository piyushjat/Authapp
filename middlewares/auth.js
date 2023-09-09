
const jwt=require('jsonwebtoken');
require("dotenv").config();

exports.auth=(req,res,next)=>{
    try{
        //extract JWT Token
        const token = req.body.token;

        if(!token)
        {
          return res.status(401).json({
            success:false,
            message:"Token Missing"
          })
        }

        //verify the token  
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);

            req.user=payload;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is Invalid",
            })

        }

        next();

    }catch(err){

        return res.status(500).json({
            success:false,
            message:'Something went wrong while verifying the token',
            erroer:err.message,
        })
    }

}


exports.isStudent=(req,res,next)=>{
    try{

        if(req.user.role!=="Student")
        {
            return res.status(401).json({
                success: false,
                message : "This is a protected route for Students",
            })
        }
        next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"User Role is not Matching",
        })
    }
}

exports.isAdmin=(req,res,next)=>{
    try{

        if(req.user.role!=="Admin")
        {
            return res.status(401).json({
                success: false,
                message : "This is a protected route for Admin",
            })
        }
        next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"User Role is not Matching",
        })
    }
}