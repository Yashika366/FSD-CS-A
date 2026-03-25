const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    console.log("token",token);
    
    if(!token){
        return res.status(401).json({message: "token not found unauthorized user"})
    }
    if(token!="12345"){
        return res.status(403).json({message: "invalid token"})
    }
    next();
}
export default auth;