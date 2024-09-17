"""
Authentication routes (JWT, OAuth)
"""
from datetime import datetime, timezone, timedelta
from typing import Optional
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import hashlib

from ..db.models import User
from ..db.database import get_db
from ..core import config

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Token creation
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.JWT_SECRET_KEY, algorithm=config.ALGORITHM)
    return encoded_jwt

# Token validation
def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, config.JWT_SECRET_KEY, algorithms=[config.ALGORITHM])
        username: str = payload.get("username")
        email: str = payload.get("email")
        if username is None or email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    return username, email

# Get current user from token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
    )
    username, email  = verify_access_token(token, credentials_exception)
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# Hashing functions
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(input_password, stored_password_hash):
    return hash_password(input_password) == stored_password_hash
