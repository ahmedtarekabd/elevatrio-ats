from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from ..db.models import JobTypeEnum

class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    job_type: JobTypeEnum
    skills: List[str]
    user_id: int
    salary: Optional[List[int]] = None
    experience: Optional[List[int]] = None
    tags: Optional[List[str]] = None

class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[JobTypeEnum] = None
    skills: Optional[List[str]] = None
    salary: Optional[List[int]] = None
    experience: Optional[List[int]] = None
    tags: Optional[List[str]] = None

class JobResponse(BaseModel):
    id: Optional[int]
    title: str
    description: str
    location: str
    job_type: JobTypeEnum
    skills: List[str]
    created_at: Optional[datetime]
    last_edited: Optional[datetime]
    user_id: int
    salary: Optional[List[int]] = None
    experience: Optional[List[int]] = None
    tags: Optional[List[str]] = None
    candidates: Optional[List['CandidateResponse']] = None

    class Config:
        from_attributes = True

class CandidateResponse(BaseModel):
    id: int
    name: str
    email: str
    applied_at: datetime

    class Config:
        from_attributes = True