
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(express.json())


mongoose.connect("mongodb://127.0.0.1:27017/REST");

const RestSchema = mongoose.Schema({
    name:{
        type:'string',
        required:'true',
    },
    email:{
        type:'string',
        required:'true',
    }
},{timestamps: true});

const RestModel = mongoose.model("rest_collection",RestSchema);


app.get("/",async (req,res)=>{
    const data = await RestModel.find();
    res.json(data)
});



app.post("/insert",async (req,res)=>{
    
    const user = new RestModel(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((e)=>{
         res.send(e);
    })

});

app.delete("/delete/:id",async (req,res)=>{
        const id = req.params.id;
        const user = await RestModel.findByIdAndDelete(id);

        if(!user || !id){
            res.status(400).send("failed");
        }
        else{
            res.status(200).send(user)
        }
     
})

  app.patch("/update/:id",async (req,res)=>{
    const id = req.params.id;
    const user = await RestModel.findByIdAndUpdate(id,req.body,{
        new:true
    });

    if(!user || !id){
        res.status(400).send("failed");
    }
    else{
        res.status(200).send(user)
    }

  })


app.listen(PORT,()=>console.log(`Server started on ${PORT}`));