import express from "express"
import { createClient } from "redis";

const redisClient = createClient(); //creating redis client

redisClient.on("error", (err)=>{
    console.log("Redis client error", err)
})

const app = express();

app.use(express.json());

app.post("/submit", async(req,res)=>{
    const problemId = req.body.problemId;
    const language = req.body.language;
    const code = req.body.code;

    try{
        //Pushing job to "submission" redis queue
        await redisClient.lPush("submission", JSON.stringify({problemId, language, code}));

        res.status(200).json({
            message:"Submission shared and stored in queue"
        })
    }catch(err){
        res.status(400).json({
            message:`Error occured while code submission ${err}`
        })
    }
})

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