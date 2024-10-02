from sqlalchemy import Column, ForeignKey, Integer, Float, String, ARRAY, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base
from enum import Enum
from datetime import datetime, timezone
from sqlalchemy.dialects.postgresql import ENUM

# drop table alembic_version, candidates, jobs, users;
# drop type candidatestatusenum, jobtypeenum, roleenum;	

# Enums
class RoleEnum(Enum):
    ADMIN = "admin"
    USER = "user"

class JobTypeEnum(Enum):
    FULL_TIME = "full-time"
    PART_TIME = "part-time"
    CONTRACT = "contract"
    INTERNSHIP = "internship"
    REMOTE = "remote"
    FREELANCER = "freelancer"

class CandidateStatusEnum(Enum):
    NEW = "new"
    SCREENING = "screening"
    SHORTLISTED = "shortlisted"
    INTERVIEWED = "interviewed"
    REJECTED = "rejected"
    OFFER = "offer"
    HIRED = "hired"
    

# Models
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, info={"description": "hashed password"})
    role = Column(ENUM(RoleEnum), info={"description": "user role"}, default=RoleEnum.USER)
    full_name = Column(String)
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False, info={"description": "creation datetime"})    
    last_edited = Column(
        DateTime,
        nullable=False,
        default=lambda :datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        info={"description": "last edited datetime"},
    )

    # Relationships
    jobs = relationship("Job", backref="user")

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    status = Column(ENUM(CandidateStatusEnum), default=CandidateStatusEnum.NEW, info={"description": "candidate status"})

    # Relationships
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=True, info={"description": "job id"})

    # Optional fields
    phone = Column(String, nullable=True)
    skills = Column(ARRAY(String), nullable=True, info={"description": "candidate skills"})
    years_experience = Column(Integer, nullable=True, info={"description": "experience in years"})
    experience = Column(String, nullable=True, info={"description": "experience"})
    overview = Column(String, nullable=True, info={"description": "overview or summary of candidate"})
    education = Column(String, nullable=True, info={"description": "education details"})
    certificates = Column(String, nullable=True, info={"description": "certifications"})
    resume = Column(String, nullable=True, info={"description": "resume file path"})
    links = Column(ARRAY(String), nullable=True, info={"description": "links"})
    languages = Column(ARRAY(String), nullable=True, info={"description": "languages"})
    extracurricular = Column(String, nullable=True, info={"description": "extra curricular activities"})
    
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False, info={"description": "creation datetime"})    
    last_edited = Column(
        DateTime,
        nullable=False,
        default=lambda :datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        info={"description": "last edited datetime"},
    )


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    location = Column(String)
    job_type = Column(ENUM(JobTypeEnum), info={"description": "full-time, part-time, contract, etc."})
    skills = Column(ARRAY(String), info={"description": "required skills"})
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False, info={"description": "creation datetime"})    
    last_edited = Column(
        DateTime,
        nullable=False,
        default=lambda :datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        info={"description": "last edited datetime"},
    )


    # Relationships
    user_id = Column(Integer, ForeignKey("users.id"), info={"description": "user id who created the job"})
        
    candidates = relationship("Candidate", backref="job") # Add job attribute to Candidate model
    
    
    # Optional fields
    salary = Column(ARRAY(Float), nullable=True, info={
        "description": "salary range"
    })
    experience = Column(ARRAY(Integer), nullable=True 
                        , info={"description": "required experience in years"}
    )
    tags = Column(ARRAY(String), info={
        "description": "tags/keywords"
    })

    def __repr__(self):
        return f"<Job {self.title}, {self.candidates}>"

