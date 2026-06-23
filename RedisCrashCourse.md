## Problems redis solves
1. Querying data again for e.g -> when ever user refresh the page again the data is query again which is expensive task.
- How redis solves this problem?
- When user for first first time hits pur endpoint, the endpoint query the database which is expensive task. But with redis the queried data is
stored in redis. and when ever user comes 2md time server takes the data from redis and send it back to user.
- Means redis is worled as cache here. Cache is used to store data temporary so data is not compute or fetch again by process.

## Running redis with redis GUI
- docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest -> Runs redis with redis GUI
- localhost:8001 -> runs redis GUI -> we don't need this in production but we can use it while learning.

1. Naming convention for key values is redis
- <entity>:<id> value
2. redis groups the keys on the basis of common entity.
3. set <entity>:<id> value nx 
- nx stores the value only if the key doesn't exist already. usefull for implementing locks.
4. mget key1 key2 key3 -> use to get value for multiple keys in single cmd
5. Just like mget there is mset

## Invalidatng the cache to get new data from db
1. After some time or after setting new data in db the cache will be outdated.
2. In that case we can set the cache clearance time, after which redis can cache new data from db.
3. Or after setting new data in DB redis can clear the cache and retreive the new data from db cache it.

## Redis list 
1. List can be used as stack or queue
2. If we follow FIFO approch it is queue and stack if we use LIFO approch. 

3. brpop 0 -> blocks the pop from right side until element is pushed in queue.

## Redis set
1. Set is the collection of unique values. It does not allows duplicate values and provides efficient operaitions to add, remove or check if value exists.
2. A  Redis set is an unordered collection of unique strings (members). You can use Redis sets to efficiently:
- Track unique items (e.g., track all unique IP addresses accessing a given blog post).
- Represent relations (e.g., the set of all users with a given role).
- Perform common set operations such as intersection, unions, and differences.