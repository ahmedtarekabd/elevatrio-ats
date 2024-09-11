from typing import Annotated
import json

from fastapi import FastAPI, Depends, HTTPException, Form, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db import models
from app.services.auth import verify_password, create_access_token, get_current_user
from app.db.database import get_db, init_db
from app.schemas import auth as auth_schema

app = FastAPI()
init_db()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# User login (generate JWT token)
# def login_for_access_token(db: Session = Depends(get_db), form_data: Form() = Depends()):
# def login_for_access_token(db: Annotated[Session, Depends(get_db)], form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
# @app.post("/auth/login", response_model=auth_schema.Token)
@app.post("/auth/login", response_model=auth_schema.Token)
 # Email
def login_for_access_token(db: Annotated[Session, Depends(get_db)], email: Annotated[str, Form()], password: Annotated[str, Form()]):
    user = db.query(models.User).filter(models.User.email == email).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    claims = {
        "id": user.id,
        "name": user.full_name,
        "username": user.username,
        "email": user.email,
        "role": str(user.role),
    }
    access_token = create_access_token(data=claims)
    return {
        "access_token": access_token, 
        "user": claims
        }

@app.post("/token", response_model=auth_schema.Token) # Username
async def login(db: Annotated[Session, Depends(get_db)], form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):    
    user = db.query(models.User).filter(models.User.username == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    claims = {
        "id": user.id,
        "name": user.full_name,
        "username": user.username,
        "email": user.email,
        "role": str(user.role),
    }
    access_token = create_access_token(data=claims)
    return {
        "access_token": access_token, 
        "user": claims
        }

# Protected route
@app.get("/users/me", response_model=auth_schema.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user
