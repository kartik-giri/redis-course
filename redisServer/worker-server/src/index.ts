import { createClient } from "redis";

const redisClient = createClient(); //we can pass redis instance url too but by default it is picking localhost one.



const main = async()=>{
    try{
    await redisClient.connect();
    console.log("Redis client is connected")
    }catch(err){
        console.log("Redis clinet cann't connect!")
    }

    while(true){
    const response = await redisClient.brPop("submission", 0);  // pop is block until job is pushed in queue. popping out the job from queue, 
    //Executes the job
    console.log(response)
    await new Promise((resolve)=>{
        setTimeout(resolve, 1000)
    })
    console.log("Mimicing the job execution")
    // Send the result/event to the pub/sub
    console.log("Processed user job")
    }
}

main()