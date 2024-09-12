from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi import Form, status
from app.db import models
from app.db.database import get_db
from app.schemas import auth as auth_schema
from app.services.auth import verify_password, create_access_token


router = APIRouter(
    tags=["auth", "users"],
    responses={status.HTTP_404_NOT_FOUND: {"description": "Invalid credentials"}},
)


# User login (generate JWT token)
# def login_for_access_token(db: Session = Depends(get_db), form_data: Form() = Depends()):
# def login_for_access_token(db: Annotated[Session, Depends(get_db)], form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
# @router.post("/auth/login", response_model=auth_schema.Token)
@router.post("/auth/login", response_model=auth_schema.Token) # Email
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

@router.post("/token", response_model=auth_schema.Token) # Username
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
