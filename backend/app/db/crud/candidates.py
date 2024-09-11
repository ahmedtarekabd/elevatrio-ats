from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from datetime import datetime, timezone
from ..models import Candidate
from app.schemas.candidates import CandidateCreate, CandidateUpdate

def create_candidate(db: Session, candidate: CandidateCreate):
    
    new_candidate = Candidate(
        full_name=candidate.full_name,
        email=candidate.email,
        phone=candidate.phone,
        skills=candidate.skills,
        experience=candidate.experience,
        education=candidate.education,
        resume=candidate.resume,
        portfolio=candidate.portfolio,
        social_links=candidate.social_links,
        created_at=datetime.now(timezone.utc),
        last_edited=datetime.now(timezone.utc)
    )
    db.add(new_candidate)
    db.commit()
    db.refresh(new_candidate)
    return new_candidate

def get_candidate_by_id(db: Session, candidate_id: int):
    try:
        return db.query(Candidate).filter(Candidate.id == candidate_id).one()
    except NoResultFound:
        return None

def update_candidate(db: Session, candidate_id: int, candidate: CandidateUpdate):
    existing_candidate = get_candidate_by_id(db, candidate_id)
    if existing_candidate is None:
        return None

    for key, value in candidate.dict(exclude_unset=True).items():
        setattr(existing_candidate, key, value)
    existing_candidate.last_edited = datetime.now(timezone.utc)

    db.commit()
    db.refresh(existing_candidate)
    return existing_candidate

def delete_candidate(db: Session, candidate_id: int):
    existing_candidate = get_candidate_by_id(db, candidate_id)
    if existing_candidate is None:
        return None

    db.delete(existing_candidate)
    db.commit()
    return existing_candidate