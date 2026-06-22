import express from "express"
import { createClient } from "redis";

const redisClient = createClient(); //creating redis client
redisClient.on("error", (err)=>{
    console.log("Redis client error", err)
})

const app = express();

app.use(express.json());


const startServer = async()=>{
    try{
        await redisClient.connect();
        console.log("connected to redis")

        app.listen("3000", ()=>{
        console.log("http server is listening on port 3000")
        })
    }catch(err){
        console.log("Failed to connect to redis", err)
    }
}

startServer()