const RoleBase = (permittedRoles) => (req, res, next) => {
    console.log(permittedRoles)
    console.log("bhbjb",req.body)
    const  x_userRole  = req.body.role;
    console.log("hello",x_userRole)
    // console.log(req.user)
    if(permittedRoles.includes(x_userRole)){
        next();
    }
   else {
      res.send("You are not authorized for this route");
    }
  };
  
  module.exports = { RoleBase };
  