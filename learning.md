## REDIS QUEUE/PUB SUB

## Queue
1. Queue it is a data structure which follows FIFO approach.
2. In leetcode client sends the solution of questions as POST request to http-server.
3. Http-server pushes the code in the queue.
4. And from queue worker nodes picks the job/code and runs it and stores the result in DB.
5. With queue approach our server machine is not running the code(which can buggy code).
6. And server can handles multiple requests cause it is not doing heavy lifting.
7. In http-server if there are multiple heavy liffting jobs in that case server pushes the jobs in queue.
2. And we autoscale the worker nodes on the basis of the length of queue.

## PUB SUB
1. The worker has done the job now how it can tell the result to client browser?
2. In this case we create client ws presistent connection. where client and ws can communicate with each other.
3. There could be many ws servers cause 1 ws can only handle 10,000 users.
4. SO how worker node will send the result to the right ws server which is connected to right user?
5. For this we use publisher subscription model where worker nodes published the events and ws servers subscribe to those events.
6. And than ws get the event and send it to client connected with it.

## IMPORTANT
1. Queue itself doesn't execute code
- The queue only stores jobs.
- Queue = waiting room
- Worker = actual worker
- Example:
{
  "submissionId": 123,
  "language": "typescript",
  "code": "..."
}
- gets pushed into Redis.
- Workers pull jobs and execute them.

2. Main benefit isn't only security
- You wrote:
- With queue approach our server machine is not running the code

- Correct.
- But the bigger reason is:
- HTTP Server remains fast
- Instead of:
Request
 ↓
Compile code
 ↓
Run tests
 ↓
Return response

which may take 20 seconds,

- you do:
Request
 ↓
Push job
 ↓
Return 202 Accepted

- in a few milliseconds.

3. PUB SUB
Worker
 ↓
Publish event
 ↓
Redis Pub/Sub
 ↓
All WS servers receive event
 ↓
Correct WS server forwards to user

4. Example of pub sub
- Worker publishes:
{
  "userId": 123,
  "status": "completed",
  "result": "Accepted"
}
- to channel:
- submission-results

- Redis broadcasts:
WS1 receives
WS2 receives
WS3 receives

- Then:
WS1: user not connected here
WS2: user connected here ✅
WS3: user not connected here

WS2 sends result to browser.

1. Queue stores jobs; workers execute them.
2. Queue is mainly for asynchronous processing and scalability, not just security.
3. Pub/Sub broadcasts events; WS servers route them to the correct connected client. In larger systems this is often optimized with user-specific channels rather than broadcasting to all servers.


## REDIS
1. Redis is an open source in memory data structure store which is used as Database, cache and message broker.
2. The main functionality of redis is that it stores data in memory which allows high perfomance and low latency access to data.

3. In memory data structure store is very similar to db but only difference is that data is store in memory.

4. docker run --name my-redis -d -p 6379:6379 redis
- docker exec -it container_id sh
- redis-cli
- is used to interact with redis through cli.

5. In redis we can store only strings, but yeah we can stringify the objects.
6. All the data is stored in memory that's why it can beuses to store cache

7. Redis also gives the queue functionality by which we can push data in to qeue and eorker can pop the data from queue.
- In we push from LPUSH than should from RPOP to follow FIFO approch.
- LPUSH queue_name data
- RPOP queue_name -> pop from queue

8. BRPOP queue_name 0 -> Blocks the popping from queue for infinite time until data is pushed in queue.

## Uusing redis with bun or node js
1. Create bun project.
2. bun add redis -> this lib allows to talk wiht redis instance.