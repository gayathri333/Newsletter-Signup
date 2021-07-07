const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})


app.post("/",function(req,res){
    var data={
        members:[{
            email_address:req.body.email,
            status:"subscribed",
            merge_fields:{
                FNAME:req.body.fname,
                LNAME:req.body.lname
            }
        }]
    };
    var jsonData=JSON.stringify(data);

    var url="https://us6.api.mailchimp.com/3.0/lists/97f6d705e7";
    
    var options={
        method:"POST",
        auth:"gayathri:8287493479eaa701161f00e444b9438a-us6"
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode==200)
        res.sendFile(__dirname+"/sucess.html");
        else 
        res.sendFile(__dirname+"/failure.html");
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
        
    });
    request.write(jsonData);
    request.end();
    
})

app.post("/failure",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.listen(3000,function(){
    console.log("Server running on port 3000");
})

//api key: 8287493479eaa701161f00e444b9438a-us6
//audience key: 97f6d705e7