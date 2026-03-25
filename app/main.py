from fastapi import FastAPI
from app.db.database import engine, Base
from app.api import auth

# Tạo bảng
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include router
app.include_router(auth.router)


@app.get("/")
def read_root():
    return {"message": "Gallery App Backend is running!"}