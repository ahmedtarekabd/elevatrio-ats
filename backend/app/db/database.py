from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import DATABASE_URL, DATABASE_NAME

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal() # Create a database session/instance
    try:
        yield db
    finally:
        db.close()

# Do not call it if using Alembic
def init_db():
    # with engine.connect() as connection:
    #     connection.execute(text("commit"))
    #     connection.execute(text(f"DROP DATABASE IF EXISTS {DATABASE_NAME}"))
    #     connection.execute(text(f"CREATE DATABASE {DATABASE_NAME}"))
    #     connection.execute(text(f"USE {DATABASE_NAME}"))
    Base.metadata.create_all(bind=engine)
