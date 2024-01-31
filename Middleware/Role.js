const jwt=require("jsonwebtoken")
const RoleBase = (permittedRoles) => (req, res, next) => {
    console.log(permittedRoles)

    const token=req.headers.authorization
    const decoded= jwt.verify(token,process.env.JWT_Secret)

   

    const x_userRole = decoded.role;
 
    console.log("hello",x_userRole)
    
    if(permittedRoles.includes(x_userRole)){
        next();
    }
   else {
      res.send("You are not authorized for this route");
    }
  };
  
  module.exports = { RoleBase };
  