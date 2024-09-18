from typing import Annotated

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users, auth, jobs, candidates

from app.db.database import init_db

app = FastAPI()
app.include_router(jobs.router)
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(candidates.router)


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

init_db()
