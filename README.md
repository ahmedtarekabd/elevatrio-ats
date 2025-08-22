# AI-Driven Hiring Platform (ATS)

A modern, intelligent Applicant Tracking System built with FastAPI backend, Next.js frontend, and machine learning models for automated resume parsing and candidate matching.

## 🚀 Features

### Core Functionality

- **Smart Resume Parsing**: AI-powered extraction of candidate information from various resume formats
- **Intelligent Job Matching**: ML-based algorithms to match candidates with job requirements
- **HR Dashboard**: Comprehensive interface for managing candidates, jobs, and hiring pipeline
- **Secure Authentication**: JWT-based authentication system with role-based access control
- **Real-time Analytics**: Hiring metrics, candidate statistics, and performance insights

### Advanced Features (Planned)

- **Interview Intelligence**: Real-time AI analysis during interviews
  - Sentiment analysis (confident, nervous, engaged)
  - Dynamic question recommendations based on job requirements
  - Conversation flow insights and candidate assessment
- **Automated Screening**: Pre-screening candidates based on customizable criteria
- **Integration APIs**: Connect with popular HR tools and platforms

## 🏗️ Architecture

### Technology Stack

**Backend**

- **FastAPI**: Modern, fast web framework with automatic API documentation
- **PostgreSQL**: Robust relational database for data persistence
- **SQLAlchemy**: Python ORM for database operations
- **Alembic**: Database migration management
- **Python 3.10+**: Core programming language

**Frontend**

- **Next.js 14**: (Requires update for Known security vulnerabilities) React framework with App Router and server-side rendering
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn UI**: Pre-built UI components for faster development
- **React Hook Form**: Performant forms with easy validation
- **NextAuth.js**: Authentication for Next.js applications
- **Axios**: Promise-based HTTP client for API requests

**Machine Learning**

- **Python ML Stack**: scikit-learn, pandas, numpy for data processing
- **NLP Libraries**: spaCy, NLTK, or Transformers for text processing
- **Jupyter Notebooks**: Model experimentation and development

**DevOps**

- **Docker**: Containerization for consistent environments
- **Docker Compose**: Multi-container application orchestration

## 📁 Project Structure

```
ATS/
├── backend/                    # FastAPI Backend
│   ├── app/                   # Main application code
│   │   ├── api/              # API routes and endpoints
│   │   ├── core/             # Configuration and security
│   │   ├── models/           # SQLAlchemy ORM models
│   │   ├── services/         # Business logic layer
│   │   └── main.py           # FastAPI application entry point
│   ├── tests/                # Test suite (Pytest)
│   ├── alembic.ini           # Database migration configuration
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile           # Container configuration
│   └── .env                 # Environment variables
│
├── frontend/                  # Next.js Frontend
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # Reusable React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and configurations
│   ├── schema/              # TypeScript schemas and validation
│   ├── server/              # Server-side utilities
│   ├── types/               # TypeScript type definitions
│   ├── package.json         # Node.js dependencies
│   ├── next.config.mjs      # Next.js configuration
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   ├── tsconfig.json        # TypeScript configuration
│   ├── Dockerfile           # Container configuration
│   ├── .env.development     # Development environment variables
│   └── .env.production      # Production environment variables
│
├── ml_models/                 # Machine Learning Models
│   ├── nlp_model.py          # NLP model for resume parsing
│   ├── experimental.ipynb    # Jupyter notebook for experiments
│   ├── Dockerfile           # Container configuration
│   └── models/              # Trained model files (not in git)
│
├── docker-compose.yml         # Multi-container orchestration
├── ATS.code-workspace        # VS Code workspace configuration
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🚦 Quick Start

### Prerequisites

- **Docker & Docker Compose**: For containerized development
- **Node.js 18+**: For local frontend development
- **Python 3.10+**: For local backend development
- **PostgreSQL**: Database (handled by Docker in development)

### 🐳 Running with Docker (Recommended)

1. **Clone the repository**

```bash
git clone https://github.com/ahmedtarekabd/elevatrio-ats.git
cd elevatrio-ats
```

2. **Start all services**

```bash
docker-compose up --build
```

3. **Access the applications**

   - **Frontend**: http://localhost:8501
   - **Backend API**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/docs

4. **Stop services**

```bash
docker-compose down
```

### 🔧 Local Development Setup

#### Backend Development

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env  # Edit with your settings

# Run database migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.development.example .env.development  # Edit with your settings

# Start development server
npm run dev
```

## 📊 Database Management

### Running Migrations

```bash
cd backend

# Create a new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

### Database Seeding

```bash
cd backend
python -m app.db.db_seed
```

## 📖 API Documentation

Once the backend is running, visit:

- **Swagger UI**: http://localhost:8000/docs

### Key API Endpoints

- **Authentication**: `/auth/login`, `/auth/register`
- **Jobs**: `/jobs/`, `/jobs/{id}`
- **Candidates**: `/candidates/`, `/candidates/{id}`
- **Resume Upload**: `/candidates/upload-resume`
- **Job Matching**: `/matching/candidates/{job_id}`

## 🚀 Deployment

### Production Docker Build

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy with production configuration
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Deployment Options

1. **AWS ECS/Fargate**: Serverless container deployment
2. **Google Cloud Run**: Fully managed container platform
3. **Azure Container Instances**: Scalable container hosting
4. **DigitalOcean App Platform**: Simple container deployment

### CI/CD Pipeline Example (GitHub Actions)

```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run backend tests
        run: |
          cd backend
          pip install -r requirements.txt
          pytest
      - name: Run frontend tests
        run: |
          cd frontend
          npm install
          npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          # Add deployment steps here
          echo "Deploying to production..."
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint and Prettier for TypeScript/JavaScript code
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages

## 📝 Code Quality

### Backend

- Future: **Linting**: `flake8`, `black`
- Future: **Type Checking**: `mypy`
- **Testing**: `pytest`

### Frontend

- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript compiler

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
