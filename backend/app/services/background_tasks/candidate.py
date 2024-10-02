from app.services.parse_resume import parse_resume
from app.services.auth import get_current_user
from app.db.models import Candidate
from app.db.crud.candidates import create_candidate
from app.schemas.candidates import CandidateCreate, CandidateUpdate
from app.db.database import get_db
from pathlib import Path

def create_candidate_from_resume(file_path: str):
    resume_data = parse_resume(file_path)
    # print(resume_data)
    db = next(get_db())
    return create_candidate(db=db, 
                            candidate=CandidateCreate(
                            full_name=resume_data['name'],
                            email=resume_data['email'],
                            phone=resume_data['phone'],
                            overview=resume_data['overview'],
                            experience=resume_data['experience'],
                            education=resume_data['education'],
                            certificates=resume_data['certificates'],
                            projects=resume_data['projects'],
                            skills=resume_data['skills'],
                            links=resume_data['links'],
                            languages=resume_data['languages'],
                            extracurricular=resume_data['extracurricular'],
                        ))

if __name__ == "__main__":
    create_candidate_from_resume(Path().cwd() / 'app/db/files/1/Ahmed_Tarek_Resume.pdf')