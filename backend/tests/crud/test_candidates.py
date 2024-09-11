import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timezone
from sqlalchemy.ext.declarative import declarative_base
from app.db.models import Base
from app.db.crud.candidates import create_candidate, get_candidate_by_id, update_candidate, delete_candidate
from app.schemas.candidates import CandidateCreate, CandidateUpdate
from app.core.config import DATABASE_URL

# Setup the in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = DATABASE_URL
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="module")
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

def test_create_candidate(db):
    candidate_data = CandidateCreate(
        full_name="John Doe",
        email="john.doe@example.com",
        phone="1234567890",
        skills=["Python", "Django"],
        experience=5,
        education="Bachelor's Degree",
        resume="resume.pdf",
        portfolio="portfolio.com",
        social_links=["linkedin.com/in/johndoe"]
    )
    candidate = create_candidate(db, candidate_data)
    print("create candidate: ", candidate)
    assert candidate.id is not None
    assert candidate.full_name == "John Doe"
    assert candidate.email == "john.doe@example.com"

def test_get_candidate_by_id(db):
    candidate = get_candidate_by_id(db, 1)
    print("get by id candidate: ", candidate)
    assert candidate is not None
    assert candidate.id == 1
    assert candidate.full_name == "John Doe"

def test_update_candidate(db):
    candidate_data = CandidateUpdate(
        full_name="John Doe Updated",
        email="john.doe.updated@example.com"
    )
    candidate = update_candidate(db, 1, candidate_data)
    print("update candidate: ", candidate)
    assert candidate is not None
    assert candidate.full_name == "John Doe Updated"
    assert candidate.email == "john.doe.updated@example.com"

def test_delete_candidate(db):
    candidate = delete_candidate(db, 1)
    print("delete candidate: ", candidate)
    assert candidate is not None
    assert candidate.id == 1
    assert get_candidate_by_id(db, 1) is None