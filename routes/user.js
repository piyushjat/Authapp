
const express=require('express');
const router=express.Router();

const {signup ,login }=require("../controllers/Auth");
const {auth,isStudent,isAdmin}=require("../middlewares/auth");

router.post("/signup",signup);
router.post("/login",login);

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the protected routes for Students'
    })
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the protected routes for Admin'
    })
})


module.exports=router;