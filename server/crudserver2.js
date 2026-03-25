import http from "http"
import os from "os"
const port=5001;
const users=[{id:1,name:"John",email:"john@example.com"},
    {id:2,name:"Jane",email:"jane@example.com"},
    {id:3,name:"Doe",email:"doe@example.com"}];
    const server=http.createServer((req,res)=>{
    const url=req.url;
    
    if(url.startsWith("/users/")&& req.method=="GET"){
        const id=url.split("/")[2];
        const user=users.find(u=>u.id==id);
        if(!user){
            res.statusCode=400;
            console.log(`user ${id} not found`);
             return res.end(`user ${id} not found`);
        }
        res.end(JSON.stringify(user));
        
    }
     else if(url=="/createuser"&& req.method=="POST"){
         let body="";
        req.on("data",(chunk)=>{
            body=body+chunk;
        })
        req.on("end",()=>{
            const data=JSON.parse(body);
            if(data.name==null || data.email==null){
                res.statusCode=400;
                console.log("name and email are required");
                return res.end("name and email are required");
            }
            const userIndex=users.findIndex(u=>u.email==data.email);
            if(userIndex!=-1){
                res.statusCode=400;
                console.log(`user with email ${data.email} already exists`);
                res.end(`user with email ${data.email} already exists`);
            }
            const newUser={
                id: Date.now(),
                name:data.name,
                email:data.email
            }
            users.push(newUser);
            res.statusCode=201;
            console.log(`user ${newUser.id} created successfully`);
            res.end(`user ${newUser.id} created successfully`);
            
            
        })
    
    }
    else if(url.startsWith("/users/")&& req.method=="PATCH"){
        const id=url.split("/")[2];
        const userIndex=users.findIndex(u=>u.id==id);
            let body="";
            req.on("data",(chunk)=>{
                body=body+chunk;
            })
            req.on("end",()=>{
                const data=JSON.parse(body);
                
                if(userIndex==-1){
                    res.statusCode=400;
                    console.log(`user ${id} not found`);
                     return res.end(`user ${id} not found`);
                }
                users[userIndex]={...users[userIndex],...data};
                res.statusCode=200;
                console.log(`user ${id} updated successfully`);
                res.end(`user ${id} updated successfully`);
            })
        
    }
    else if(url.startsWith("/users/")&& req.method=="DELETE"){
        res.end("<h1> Delete page </h1>");
    }
    else{
        res.statusCode=404;
        res.end("error page");
    }

})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})