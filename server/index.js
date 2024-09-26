const express = require('express')
const cors = require('cors')
const mongoose  = require('mongoose')




const app = express()
app.use(cors())
app.use(express.json()) // accept data in json format



const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    name : String,
    rollno : Number,
    email : String,
    mobile : Number
},{
    timestamps  : true
})

const userModel = mongoose.model("user",schemaData)





//For read / API(Application Program Interface) / GET Method
//http://localhost:8080
app.get("/",async(_req,res)=>{
    const data = await userModel.find({})

    res.json({success  : true , data : data })
})



//create data // save our data in MongoDB / POST Method
//http://localhost:8080/create with data mentioned in schema
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success:true , message:"data saved succcessfully",data:data})
})
 


//Update data / PUT Method
//http://localhost:8080/update/obj_id  with data specifically you wanna update
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest} = req.body

    console.log(rest)
    const data = await userModel.updateOne({_id:_id},rest)
    res.send({success:true , message:"data updated successfully",data:data})
})


//delete api
//http://localhost:8080/delete/obj_id 

app.delete("/delete/:id",async(req,res)=>{
    const id  = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id:id})
    res.send({success:true , message:"data deleted successfully",data:data})
})






//For connecting to Database using connection string
mongoose.connect("mongodb://localhost:27017/StudentDB")
.then(()=>{console.log("connect to db")
    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))

