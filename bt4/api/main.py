from fastapi import FastAPI
from routers import article, search
import uvicorn
from fastapi.security import OAuth2PasswordBearer
app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app.include_router(article.router)
app.include_router(search.router)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000, log_level="info", reload=True)



