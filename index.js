const express= require ("express");
const app= express();

const users=[{
    name:"John",
    kidneys:[{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/",function(req,res){
    //write logic
    const johnKidneys= users[0].kidneys;
    const numofKidneys= johnKidneys.length;
    //filter
    let numofhealthykidneys=0;
    for(let i=0; i<johnKidneys.length; i++){
        if(johnKidneys[i].healthy){
            numofhealthykidneys++;
        }
    }
    const numofunhealthykidneys = numofKidneys-numofhealthykidneys;
    res.json({
        numofKidneys,
        numofhealthykidneys,
        numofunhealthykidneys
    })
})

app.post("/",function(req,res){
    const isHealthy= req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put("/",function(req,res){
    for(let i=0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({});
})
  
//removing all unhealthy kidneys
//only if atleast one unhealthy kidney is present


app.delete("/",function(req,res){
    if(atleastOneUnhealthyKidney()){
    const newKidneys= [];
    for(let i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){ 
            newKidneys.push({
                healthy: true
            })
        }
    }
    users[0].kidneys= newKidneys;
    res.json({msg: "done!"});
}
else{
    res.status(411).json({
        msg: "No unhealthy kidneys to remove!"
    });
}
})

function atleastOneUnhealthyKidney(){
    let atleastOneUnhealthyKidney= false;
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney=true;
            break;
        }
    }
    return atleastOneUnhealthyKidney;
}


app.listen(3000)