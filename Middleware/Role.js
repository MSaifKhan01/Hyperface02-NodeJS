const jwt=require("jsonwebtoken");
const { userModel } = require("../Models/user");
const RoleBase = (permittedRoles) =>async (req, res, next) => {
    console.log(permittedRoles)

    const token=req.headers.authorization
    const decoded= jwt.verify(token,process.env.JWT_Secret)

    const user= await userModel.findById(decoded.userID)
   

    const x_userRole = decoded.role;

    req.user = user;
   
    // console.log("role    ",req.user)
 
    // console.log("hello",x_userRole)
    
    if(permittedRoles.includes(x_userRole)){
        next();
    }
   else {
      res.send("You are not authorized for this route");
    }
  };
  
  module.exports = { RoleBase };
  