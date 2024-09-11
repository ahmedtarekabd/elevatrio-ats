from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class CandidateSearchRequest(BaseModel):
    job_title: Optional[str] = None
    candidate_score: Optional[int] = None
    tags: Optional[List[str]] = None

class CandidateResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: Optional[str] = None
    skills: Optional[List[str]] = None
    experience: Optional[int] = None
    education: Optional[str] = None
    resume: Optional[str] = None
    portfolio: Optional[str] = None
    social_links: Optional[List[str]] = None
    created_at: datetime
    last_edited: datetime

    class Config:
        orm_mode = True

class CandidateCreate(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    skills: Optional[List[str]] = None
    experience: Optional[int] = None
    education: Optional[str] = None
    resume: Optional[str] = None
    portfolio: Optional[str] = None
    social_links: Optional[List[str]] = None

class CandidateUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    skills: Optional[List[str]] = None
    experience: Optional[int] = None
    education: Optional[str] = None
    resume: Optional[str] = None
    portfolio: Optional[str] = None
    social_links: Optional[List[str]] = None