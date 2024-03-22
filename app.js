const express=require('express');
const app=express();
const fs=require('fs');
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('<h1>This is Home Page</h1>')
})

app.get('/singup',(req,res)=>{
    res.sendFile(__dirname+'/viewer/signup.html');
})


app.get('/add',(req,res)=>{
    console.log(req.query);
    res.send('done');
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/viewer/login.html');
})

app.post('/add',(req,res)=>{
    console.log(req.body);
    fs.readFile(__dirname+'/user.json','utf-8',(err,data)=>{
        data=JSON.parse(data);

        if(data.length==0){
            data.push(req.body);
        }
        /*
 else{
       data.push(req.body);

     const newData=data.filter(ele=>{
        if((ele.user==req.body.user)&&(ele.email==req.body.email)&&(ele.pass==req.body.pass)){
            return true;
        }
     })
     
     console.log("newData: ");
     console.log(newData);
     console.log("newData[0]: ");
     console.log(newData[0]);
  

     if((newData[0].user==req.body.user)&&(newData[0].email==req.body.email)&&(newData[0].pass==req.body.pass)){
        console.log("same Data already present so No Need to add data in json file");
       
     }
      
 }  
 */
else{
 const newData=data.filter(ele=>{
    if((ele.user==req.body.user)&&(ele.email==req.body.email)&&(ele.pass==req.body.pass)){
        return true;
    }
 })

 if(newData.length==0){
    data.push(req.body);
 }
 else{
    console.log('so same data already present so not need to add data in json file')
 }
    
  console.log("json file data print");
    console.log(data);
}

     fs.writeFile(__dirname+'/user.json',JSON.stringify(data),(err)=>{
        res.send("data added");
     })


    } )
    
})


app.get('/demo',(req,res)=>{
    console.log(res.query);
    res.send('open login page');
})


app.post('/demo',(req,res)=>{
    console.log(req.body);
   fs.readFile(__dirname+'/user.json','utf-8',(err,data)=>{
    data=JSON.parse(data);

    const newData=data.filter((ele)=>{
        return(ele.email==req.body.email && ele.pass==req.body.pass);
    })

    console.log(newData);

  //  console.log(newData.pass)// undifined

   // console.log(newData[0].pass) // correct answer

   if(newData.length==0){
    res.json({'Message':'User invalid!'});
   }
  else{
    if(newData[0].pass==req.body.pass){
        res.json({'Message':'User Valid'});
    }
}
   })
})

app.listen(5050);