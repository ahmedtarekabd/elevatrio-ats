import os
from dotenv import load_dotenv

dotenv_path = os.path.join(".env")
load_dotenv(dotenv_path)

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Database
DATABASE_URL = os.getenv("DATABASE_URL")

print("Hi: ", os.path.dirname(__file__))
print("Database: ", DATABASE_URL)