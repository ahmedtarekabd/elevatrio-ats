### Project Structure

Here's a recommended project structure for your FastAPI backend, Streamlit frontend, and the associated ML models:

```
├── project_root/
│   ├── backend/                # FastAPI Backend
│   │   ├── app/
│   │   │   ├── api/            # FastAPI API routes
│   │   │   │   ├── auth.py     # Authentication routes (JWT, OAuth)
│   │   │   │   ├── candidates.py  # Candidate management routes
│   │   │   │   ├── jobs.py     # Job management routes
│   │   │   │   ├── dashboard.py # HR dashboard routes
│   │   │   ├── core/
│   │   │   │   ├── config.py   # Configuration (DB, secret keys)
│   │   │   │   ├── security.py # JWT auth logic
|   |   |   |   ├── db/ # Database migrations and setup
|   |   |   |   │   ├── migrations/ # Alembic for DB migrations
|   |   |   |   │   ├── models.sql # Schema setup
|   |   |   |   │   ├── db_seed.py  # Scripts to seed the database
|   |   |   |   │   └── database.py # Database connection logic
│   │   │   ├── models/         # ORM models (SQLAlchemy)
│   │   │   │   ├── candidate.py # Candidate DB model
│   │   │   │   ├── job.py      # Job DB model
│   │   │   │   ├── user.py     # User/HR DB model
│   │   │   ├── services/       # Services (Business Logic)
│   │   │   │   ├── parse_resume.py # CV parsing logic
│   │   │   │   ├── ml_matching.py  # ML model for matching candidates
│   │   │   ├── main.py         # Entry point for FastAPI backend
│   │   ├── tests/              # Test suite (Pytest)
│   │   ├── requirements.txt    # Python dependencies for backend
│   │   └── Dockerfile          # Dockerfile for backend
│
├── frontend/                   # Streamlit Frontend
│   ├── pages/                  # Streamlit multi-page app structure
│   │   ├── dashboard.py        # HR dashboard with job/candidate views
│   │   ├── candidate_view.py   # Candidate profile view
│   │   ├── job_opportunities.py # Job postings management
│   ├── components/             # Reusable components (cards, forms)
│   ├── streamlit_auth.py       # Streamlit authentication logic
│   ├── app.py                  # Main entry point for Streamlit app
│   ├── requirements.txt        # Python dependencies for frontend
│   └── Dockerfile              # Dockerfile for frontend
│
├── ml_models/                  # ML models directory
│   ├── nlp_model.py            # NLP model for resume parsing
│   ├── scoring_model.py        # ML model for resume matching
│   └── train_model.py          # Scripts to train and evaluate models
│
├── docker-compose.yml           # Docker Compose for multi-container setup
├── README.md                   # Project overview and setup instructions
└── .env                        # Environment variables (DB credentials, API keys)
```

### Explanation of the Structure

1. **Backend (FastAPI)**

   - **`app/api`**: Holds the API routes (job management, candidate management, etc.).
   - **`app/core`**: Configuration files and security logic (like JWT tokens).
   - **`app/models`**: SQLAlchemy models representing database entities (jobs, candidates, users).
   - **`app/services`**: Business logic for parsing resumes, managing jobs, and running ML models.
   - **`main.py`**: The entry point for starting the FastAPI server.

2. **Frontend (Streamlit)**

   - **`pages/`**: Each page in the Streamlit dashboard (HR dashboard, candidate profile, job management).
   - **`components/`**: Reusable UI components (cards, forms).
   - **`streamlit_auth.py`**: Handles authentication for the HR dashboard.
   - **`app.py`**: Main entry point for running the Streamlit frontend.

3. **ML Models**

   - **`nlp_model.py`**: Parses resumes using NLP libraries like `spaCy` or `Transformers`.
   - **`scoring_model.py`**: Matches candidates to job descriptions using algorithms like logistic regression, clustering, or deep learning.
   - **`train_model.py`**: Scripts to train and tune your ML models.

4. **Database**

   - **`migrations/`**: Handles database migrations using Alembic.
   - **`db_seed.py`**: Seeds initial data into the database.
   - **`database.py`**: Contains the logic to connect to the database using SQLAlchemy.

5. **Docker & Environment Files**
   - **`Dockerfile`**: Separate Dockerfiles for both backend (FastAPI) and frontend (Streamlit).
   - **`docker-compose.yml`**: Orchestrates the backend, frontend, and database services using Docker Compose.
   - **`.env`**: Stores sensitive information like database credentials, API keys, etc.

---

### Deployment Plan

#### 1. **Dockerization**

Docker is ideal for containerizing your backend, frontend, and database services, ensuring consistent environments across development and production.

- **Backend Dockerfile (FastAPI)**:

  ```dockerfile
  # Use Python 3.10.6 as the base image
  FROM python:3.10.6-slim

  # Set the working directory
  WORKDIR /app

  # Copy the requirements file
  COPY requirements.txt .

  # Install dependencies
  RUN pip install --no-cache-dir -r requirements.txt

  # Copy the application code
  COPY . .

  # Expose the FastAPI port
  EXPOSE 8000

  # Run the FastAPI application
  CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
  ```

- **Frontend Dockerfile (Streamlit)**:

  ```dockerfile
  # Use Python 3.10.6 as the base image
  FROM python:3.10.6-slim

  # Set the working directory
  WORKDIR /app

  # Copy the requirements file
  COPY requirements.txt .

  # Install dependencies
  RUN pip install --no-cache-dir -r requirements.txt

  # Copy the application code
  COPY . .

  # Expose the Streamlit port
  EXPOSE 8501

  # Run the Streamlit app
  CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
  ```

- **`docker-compose.yml`**:
  ```yaml
  version: "3"
  services:
    backend:
      build: ./backend
      ports:
        - "8000:8000"
      environment:
        - DATABASE_URL=postgresql://user:password@db:5432/dbname
    frontend:
      build: ./frontend
      ports:
        - "8501:8501"
    db:
      image: postgres:13
      environment:
        POSTGRES_USER: user
        POSTGRES_PASSWORD: password
        POSTGRES_DB: dbname
      volumes:
        - postgres_data:/var/lib/postgresql/data
  volumes:
    postgres_data:
  ```

#### 2. **Cloud Deployment Options**

You can use services like AWS, Azure, or Google Cloud to deploy your containers.

- **AWS ECS / Fargate**: For containerized applications, AWS Fargate allows you to deploy your containers without managing servers.
- **Google Cloud Run**: A fully managed platform that automatically scales your containers.
- **Azure Container Instances**: Run your Docker containers in Azure without managing complex infrastructure.

**Steps:**

1. **Set up a Cloud Account**: AWS, Google Cloud, or Azure.
2. **Push Images to a Container Registry**: After building your Docker images, push them to a container registry (e.g., AWS ECR, Docker Hub, or Google Container Registry).
   ```bash
   docker build -t <your_image_name> .
   docker tag <your_image_name> <registry_url>/<your_image_name>
   docker push <registry_url>/<your_image_name>
   ```
3. **Deploy with Cloud Services**: Create container services in the cloud provider and link them with the respective container registry.

#### 3. **CI/CD Pipeline**

Use GitHub Actions, GitLab CI, or CircleCI to automate testing, building, and deploying your project.

- **Testing**: Run automated tests using `pytest` for the backend and Streamlit.
- **Build**: Ensure Docker containers are built correctly.
- **Deploy**: Automatically deploy the latest version to your cloud provider.

Example GitHub Actions Workflow:

```yaml
name: CI/CD Pipeline
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.10
      - name: Install dependencies
        run: pip install -r backend/requirements.txt
      - name: Run backend tests
        run: pytest backend/tests
      - name: Build Docker images
        run: docker-compose build
      - name: Push Docker images
        run: docker-compose push
      - name: Deploy to cloud
        run: # Add cloud deployment steps here
```

By following this structure and deployment plan, you’ll have a scalable, containerized AI-driven hiring platform ready for production.

---

To run both the **FastAPI** and **Streamlit** applications simultaneously, especially in the context of your Docker setup, follow these steps:

# 1. Running Locally Without Docker
If you want to run both applications on your local machine without Docker, follow this approach:

## Step 1: Start FastAPI Backend
1. Make sure you're in the backend folder of your project.
2. Activate the virtual environment (assuming you're using a virtual environment):
```bash
  source venv/bin/activate  # On Linux or macOS
  # OR
  .\venv\Scripts\activate  # On Windows
  Run FastAPI with uvicorn:
```
3. Run FastAPI with uvicorn:
```bash
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
This will start the FastAPI application at http://localhost:8000.

## Step 2: Start Streamlit Frontend
1. In a new terminal window, navigate to your frontend folder.
2. Activate the virtual environment if you haven't already:
```bash
  source venv/bin/activate  # On Linux or macOS
  # OR
  .\venv\Scripts\activate  # On Windows
```
3. Run Streamlit:
```bash
  streamlit run app.py
```
This will start the Streamlit frontend at http://localhost:8501.

# 2. Running With Docker Compose
If you're using Docker Compose (as per the docker-compose.yml provided earlier), follow these steps to run both applications simultaneously using containers.

## Step 1: Build and Run Docker Containers
1. Navigate to the root of your project directory (where docker-compose.yml is located).

2. Build and start the containers:

```bash
   docker-compose up --build
```
  This command will build both the backend and frontend containers, then start them. FastAPI will be available at http://localhost:8000 and Streamlit at http://localhost:8501.

- The --build flag ensures that any changes to the Dockerfiles are considered during the build process.

3. You should now have both FastAPI (backend) and Streamlit (frontend) running together.

## Step 2: Verify
- Go to http://localhost:8501 to access the Streamlit frontend.
- Streamlit will interact with FastAPI running at http://localhost:8000.

# 3. Troubleshooting
- If you're unable to access the applications, make sure there are no firewall restrictions or port conflicts.
- If you're modifying the code and using Docker, remember to re-run docker-compose up --build to rebuild the containers with updated code.

---

# Extra Features

## Interview feedback

- During the interview the model can listen to the conversation and give real-time feeback to the HR
  - Give insights on how the candidate's feel (normal, nervous, etc.)
  - Recommend questions related to the job position
