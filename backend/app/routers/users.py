from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi import Form, status
from app.db import models
from app.db.database import get_db
from app.schemas import auth as auth_schema
from app.services.auth import get_current_user


router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(get_current_user)],
)


# Protected route
@router.get("/me", response_model=auth_schema.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

