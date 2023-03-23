const express=require("express")
const cors=require("cors")
const {Client,Entity,Schema}=require("redis-om")
const morgan=require("morgan")

const app=express()
const redisClient=new Client()
redisClient.open()


app.use(cors())
app.use(morgan())




app.get("/",async(req,res)=>{
  res.send("Redis Testing....")
})

app.listen(7000,()=>{
 console.log("Server running!")
})


