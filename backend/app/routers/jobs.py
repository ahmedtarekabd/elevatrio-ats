from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..db.database import get_db
from ..db.models import Job
from ..schemas.jobs import JobCreate, JobUpdate, JobResponse, CandidateResponse
from ..db.crud.jobs import create_job, get_job_by_id, update_job, delete_job
from app.services.auth import get_current_user

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"],
    dependencies=[Depends(get_current_user)],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[JobResponse])
def read_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()

@router.post("/", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_new_job(job: JobCreate, db: Session = Depends(get_db)):
    return create_job(db, **job.model_dump())

@router.get("/{job_id}", response_model=JobResponse)
def read_job(job_id: int, db: Session = Depends(get_db)):
    job = get_job_by_id(db, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/{job_id}", response_model=JobResponse)
def update_existing_job(job_id: int, job: JobUpdate, db: Session = Depends(get_db)):
    updated_job = update_job(db, job_id, **job.model_dump(exclude_unset=True))
    if updated_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return updated_job

@router.delete("/{job_id}", response_model=JobResponse)
def delete_existing_job(job_id: int, db: Session = Depends(get_db)):
    deleted_job = delete_job(db, job_id)
    if deleted_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return deleted_job

@router.get("/{job_id}/candidates", response_model=List[CandidateResponse])
def view_candidates_for_job(job_id: int, db: Session = Depends(get_db)):
    job = get_job_by_id(db, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job.candidates  # Assuming `candidates` is a relationship in the Job model