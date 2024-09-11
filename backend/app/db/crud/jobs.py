from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from datetime import datetime, timezone
from ..models import Job, JobTypeEnum

def create_job(db: Session, title: str, description: str, location: str, job_type: JobTypeEnum, skills: list, user_id: int, salary: list = None, experience: list = None, tags: list = None):
    new_job = Job(
        title=title,
        description=description,
        location=location,
        job_type=job_type,
        skills=skills,
        created_at=datetime.now(timezone.utc),
        last_edited=datetime.now(timezone.utc),
        user_id=user_id,
        salary=salary,
        experience=experience,
        tags=tags
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

def get_job_by_id(db: Session, job_id: int):
    try:
        return db.query(Job).filter(Job.id == job_id).one()
    except NoResultFound:
        return None

def update_job(db: Session, job_id: int, title: str = None, description: str = None, location: str = None, job_type: JobTypeEnum = None, skills: list = None, salary: list = None, experience: list = None, tags: list = None):
    job = get_job_by_id(db, job_id)
    if job is None:
        return None

    if title is not None:
        job.title = title
    if description is not None:
        job.description = description
    if location is not None:
        job.location = location
    if job_type is not None:
        job.job_type = job_type
    if skills is not None:
        job.skills = skills
    if salary is not None:
        job.salary = salary
    if experience is not None:
        job.experience = experience
    if tags is not None:
        job.tags = tags
    job.last_edited = datetime.now(timezone.utc)

    db.commit()
    db.refresh(job)
    return job

def delete_job(db: Session, job_id: int):
    job = get_job_by_id(db, job_id)
    if job is None:
        return None

    db.delete(job)
    db.commit()
    return job