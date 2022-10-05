import redis
r_server = redis.Redis('localhost', decode_responses=True)
print(r_server.get("12e82cca-5b47-413a-a45e-635323da310d"))
