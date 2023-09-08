
const express=require('express');
const router=express.Router();

const {signup ,login }=require("../controllers/Auth");
//const {auth,isStudent,isAdmin}=require("../middlewares/auth");

router.post("/signup",signup);
router.post("/login",login);



module.exports=router;