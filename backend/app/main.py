from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.db import models
from app.services.auth import verify_password, create_access_token, get_current_user
from app.db.database import get_db, init_db
from app.schemas import auth as auth_schema

app = FastAPI()
init_db()

# User login (generate JWT token)
@app.post("/token", response_model=auth_schema.Token)
def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    print("User: ", user)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Protected route
@app.get("/users/me", response_model=auth_schema.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user
