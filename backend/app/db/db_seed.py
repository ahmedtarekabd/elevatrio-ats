from app.db.database import get_db, init_db
from app.db.crud.users import create_user
from app.db.models import  RoleEnum

def seed_admin(db):
    admin = create_user(db, 'admin', email='admin@example.com', password='admin', role=RoleEnum.ADMIN, full_name='Ahmed Tarek')
    with next(db) as db:
        db.add(admin)
        db.commit()


if __name__ == '__main__':
    init_db()
    db = get_db()
    seed_admin(db)