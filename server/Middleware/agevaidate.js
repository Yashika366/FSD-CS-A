const agevalidate=(req,res,next)=>{
    const age=req.query.age;
    console.log("Age=",age);
    
    if(age<18){
        res.json({message: "age must be above 18"})
    }
    next();
}
export default agevalidate;