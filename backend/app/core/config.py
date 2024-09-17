import os
from dotenv import load_dotenv

dotenv_path = os.path.join(".env")
load_dotenv(dotenv_path)

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 24 hours

# Database
DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

print("Hi: ", os.path.dirname(__file__))
print("Database: ", DATABASE_URL)