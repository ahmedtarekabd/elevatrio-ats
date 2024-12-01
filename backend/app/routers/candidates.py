from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.db.models import User, Candidate
from app.schemas.candidates import CandidateCreate, CandidateUpdate, CandidateResponse, CandidateSearchRequest
from app.db.crud.candidates import create_candidate, get_candidate_by_id, update_candidate, delete_candidate
from app.services.background_tasks.candidate import create_candidate_from_resume, score_candidate
from app.services.auth import get_current_user
from pathlib import Path
import shutil


router = APIRouter(
    prefix="/candidates",
    tags=["candidates"],
    dependencies=[Depends(get_current_user)],
    responses={404: {"description": "Not found"}},
)

@router.post("/upload-resumes", status_code=status.HTTP_201_CREATED)
async def create_new_candidate(resumes: List[UploadFile]=File(...), authUser: User = Depends(get_current_user), background_tasks: BackgroundTasks = None):
    path = Path() / "app" / "db" / "files" / f"{authUser.id}"
    path.mkdir(parents=True, exist_ok=True)
    rejected_files = []
    for resume in resumes:
        if not resume.filename.endswith('.pdf') and not resume.filename.endswith('.docx'):
            rejected_files.append(resume.filename)
            continue
        file_location = path / resume.filename.replace(' ', '_')
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(resume.file, file_object)
            # Add the processing task to the background tasks
            background_tasks.add_task(create_candidate_from_resume, file_location)
            # TODO: Add a task to classify the resume according to the job description
            # Add the scoring task to the background tasks
            background_tasks.add_task(score_candidate)

    if rejected_files:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Some files were rejected: {rejected_files}")

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