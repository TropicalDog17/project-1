from fastapi import FastAPI

from routers import article, search, user
import uvicorn
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from dependencies import get_password_hash

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app.include_router(article.router)
app.include_router(search.router)
app.include_router(user.router)
@app.get("/")
async def root():
    return {"message":  get_password_hash("123456")}
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000, log_level="info", reload=True)



