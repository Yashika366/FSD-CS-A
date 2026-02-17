import http from "http";
import os, { arch, platform } from "os";
const port = 4001;
let body="";
const data=[];
const server = http.createServer((req, res)=>{
    const url = req.url;
    
    if(url=="/" && req.method=="GET"){
        res.end("<h1>Home Page</h1>");
    }
    else if(url=='/about' && req.method=="GET"){
        res.end("<h1>About Page</h1>");
    }
    else if(url=='/contact' && req.method=="GET"){
        res.end("<h1>Contact Page</h1>");
    }
    else if(url=="/system" && req.method=="GET"){
        const sysdata={
            platform:os.platform(),
            arch: os.arch(),
            cpu: os.cpus().length,
            Totalmem: (os.totalmem()/1024 ** 3).toFixed(2)+"GB",
            FreeMem: (os.freemem()/1024 ** 3).toFixed(2)+"GB"
        }
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify(sysdata));
    }
    else if(url=="/senddata" && req.method=="POST"){
        
        req.on("data", (chunk)=>{
            body=body+chunk;
        })
        req.on("end", ()=>{
            res.statusCode=201;
            console.log(body, "data send");
            data.push(body);
            res.end(JSON.stringify(data));
        })
        
    }
    else if(url=="/viewdata" && req.method=="GET"){
        res.end(body);
    }
    else{
        res.statusCode=404;
        res.end("<h1>Error Page</h1>");
    }
    
});
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});