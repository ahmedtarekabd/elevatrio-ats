from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.db.models import Candidate
from app.schemas.candidates import CandidateCreate, CandidateUpdate, CandidateResponse, CandidateSearchRequest
from app.db.crud.candidates import create_candidate, get_candidate_by_id, update_candidate, delete_candidate

router = APIRouter(
    prefix="/candidates",
    tags=["candidates"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=CandidateResponse, status_code=status.HTTP_201_CREATED)
def create_new_candidate(candidate: CandidateCreate, db: Session = Depends(get_db)):
    return create_candidate(db, candidate)

@router.get("/{candidate_id}", response_model=CandidateResponse)
def read_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = get_candidate_by_id(db, candidate_id)
    if candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate

@router.put("/{candidate_id}", response_model=CandidateResponse)
def update_existing_candidate(candidate_id: int, candidate: CandidateUpdate, db: Session = Depends(get_db)):
    updated_candidate = update_candidate(db, candidate_id, candidate)
    if updated_candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return updated_candidate

@router.delete("/{candidate_id}", response_model=CandidateResponse)
def delete_existing_candidate(candidate_id: int, db: Session = Depends(get_db)):
    deleted_candidate = delete_candidate(db, candidate_id)
    if deleted_candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return deleted_candidate

@router.get("/search", response_model=List[CandidateResponse])
def search_candidates(
    search_request: CandidateSearchRequest = Depends(),
    db: Session = Depends(get_db)
):
    query = db.query(Candidate)

    if search_request.job_title:
        query = query.filter(Candidate.skills.contains([search_request.job_title]))
    
    if search_request.candidate_score:
        query = query.filter(Candidate.experience >= search_request.candidate_score)
    
    if search_request.tags:
        query = query.filter(Candidate.skills.overlap(search_request.tags))

    candidates = query.all()
    return candidates