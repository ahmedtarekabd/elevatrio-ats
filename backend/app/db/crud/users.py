from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from datetime import datetime, timezone
from ..models import User, RoleEnum
from app.services.auth import hash_password

def create_user(db: Session, username: str, email: str, password: str, role: RoleEnum, full_name: str):
    new_user = User(
        username=username,
        email=email,
        password=hash_password(password),
        role=role,
        full_name=full_name,
    )
    print(dir(db), type(db))
    with next(db) as db:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    return new_user

def get_user_by_id(db: Session, user_id: int):
    try:
        return db.query(User).filter(User.id == user_id).one()
    except NoResultFound:
        return None

def update_user(db: Session, user_id: int, username: str = None, email: str = None, password: str = None, role: RoleEnum = None, full_name: str = None):
    user = get_user_by_id(db, user_id)
    if user is None:
        return None

    if username is not None:
        user.username = username
    if email is not None:
        user.email = email
    if password is not None:
        user.password = password
    if role is not None:
        user.role = role
    if full_name is not None:
        user.full_name = full_name
    user.last_edited = timezone.utc()

    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if user is None:
        return None

    db.delete(user)
    db.commit()
    return user