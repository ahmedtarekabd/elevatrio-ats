from datetime import datetime, timezone
from app.db.database import get_db, init_db
from app.db.crud.users import create_user
from app.db.models import RoleEnum, JobTypeEnum, Job

def seed_admin(db):
    admin = create_user(db, 'admin', email='admin@example.com', password='admin', role=RoleEnum.ADMIN, full_name='Ahmed Tarek')
    with next(db) as db:
        db.add(admin)
        db.commit()


# Define a list of job records to be inserted
jobs = [
    {
        "title": "Software Engineer",
        "description": "Develop and maintain software applications.",
        "location": "New York, NY",
        "job_type": JobTypeEnum.FULL_TIME,
        "skills": ["Python", "Django", "JavaScript"],
        "created_at": datetime.now(timezone.utc),
        "last_edited": datetime.now(timezone.utc),
        "user_id": 1,
        "salary": [80000, 120000],
        "experience": [2, 5],
        "tags": ["software", "engineer", "developer"]
    },
    {
        "title": "Data Scientist",
        "description": "Analyze and interpret complex data sets.",
        "location": "San Francisco, CA",
        "job_type": JobTypeEnum.FULL_TIME,
        "skills": ["Python", "Machine Learning", "Statistics"],
        "created_at": datetime.now(timezone.utc),
        "last_edited": datetime.now(timezone.utc),
        "user_id": 2,
        "salary": [90000, 130000],
        "experience": [3, 6],
        "tags": ["data", "scientist", "analytics"]
    },
    # Add more job records as needed
]

# Insert the job records into the database
def seed_jobs(db):
    with next(db) as db:
        for job_data in jobs:
            job = Job(**job_data)
            db.add(job)
        db.commit()


if __name__ == '__main__':
    init_db()
    db = get_db()
    seed_admin(db)