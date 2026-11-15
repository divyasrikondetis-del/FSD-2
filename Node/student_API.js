import http from 'http';
const students=[]
const server=http.createServer((req, res) => {
    const {method, url} = req;
    if(method==='POST' && url==='/students'){
        let body='';
        req.on('data', chunk => {
            body+=chunk.toString();
        });
        req.on('end', () => {
            const newStudent=JSON.parse(body);

            students.push(newStudent);
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify({message:'Student created Successfully', data:newStudent}));
        });
    }
    else if(method==='GET' && url==='/students'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify({message:'Students read succesfully', data:students}));
    }
    else if(method==='GET' && url.startsWith('/students/')){
        const studentId=parseInt(url.split('/')[2]);
        const student=students.find((stu)=>stu.id===studentId);
        if(student){
            res.writeHead(200, {'Content-Type':"application/json"});
            res.end(JSON.stringify({message:'Student details read successfully', data:student}));
        }
        else{
            res.writeHead(404, {'Content-Type':"application/json"});
            res.end(JSON.stringify({message:`Student Not Found`}));
        }
    }
    else if(method==='PUT' && url.startsWith('/students/')){
        const studentId=parseInt(url.split('/')[2]);
        let body='';
        req.on('data', chunk => {
            body+=chunk.toString();
        });
        req.on('end', () => {
            const newStudent=JSON.parse(body);
            const studentIndex=students.findIndex((stu)=>stu.id===studentId);
            if (studentIndex!=-1){
                students[studentIndex]={...students[studentIndex], ...newStudent};
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"Student updated successfully", data:students[studentIndex]}));
            }
            else{
                res.writeHead(404, {'Content-Type':"application/json"});
                res.end(JSON.stringify({message:`Student Not Found`}));
            }
        });
    }
    else if(method==='DELETE' && url.startsWith('/students/')){
        const studentId=parseInt(url.split('/')[2]);
        const studentIndex=students.findIndex((stu) =>stu.id===studentId);
        if(studentIndex!=-1){
            const student=students.splice(studentIndex, 1);
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Student deleted successfully", data:student[0]}));
        }
        else{
            res.writeHead(404, {'Content-Type':"application/json"});
            res.end(JSON.stringify({message:`Student Not Found`}));
        }
    }
    else{
        
        res.writeHead(404, {'Content-Type':"application/json"});
        res.end(JSON.stringify({message:`Page Not Found`}));
    }
});
server.listen(8000,()=>{
    console.log("Server is running on port http://localhost:8000/students");
});