# Importing necessary libraries
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

from app.services.parse_resume import extract_text_from_pdf, extract_text_from_docx, clean_text
from pathlib import Path
import warnings
warnings.filterwarnings("ignore")

def text_similarity(sentences: list[str]):
    # Initializing the Sentence Transformer model using BERT with mean-tokens pooling
    model = SentenceTransformer('bert-base-nli-mean-tokens') # A BERT model fine-tuned for sentence embeddings
    # Encoding the sentences to obtain their embeddings
    sentence_embeddings = model.encode(sentences)
    # Calculating the cosine similarity between the first sentence embedding and the rest of the embeddings
    # The result will be a list of similarity scores between the first sentence and each of the other sentences
    similarity_scores = cosine_similarity([sentence_embeddings[0]], sentence_embeddings[1:])
    return similarity_scores

def text_similarity_cosine(job_description: str, resumes: list[str], n: int = 5):

    if n > len(resumes):
        n = len(resumes)
        # raise ValueError("n must be less than or equal to the number of resumes provided.")

    # Combine all job descriptions and resumes into a single dataset
    documents = [job_description] + resumes  # Job description + list of CVs

    # TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(ngram_range=(1, 3))
    tfidf_matrix = vectorizer.fit_transform(documents)

    # Compute cosine similarity between the job description (first row) and all resumes
    cosine_similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
    print(f'\t\t\tTF-IDF: {cosine_similarities}')

    # Get the indices of the top n most similar resumes
    top_n_indices = np.argsort(cosine_similarities[0])[::-1][:n]
    # Recommend the top n resumes based on similarity
    recommended_resumes = [resumes[i] for i in top_n_indices]


if __name__ == "__main__":
    job_description = """
        Software Engineer Job Description
        Summary:
        We're seeking an experienced Software Engineer to join our growing team. As a Software Engineer, you may be responsible for designing, developing and maintaining software applications that meet the requirements of our customers. The ideal candidate possesses knowledge of various programming languages and is able to work both independently and collaboratively on project goals.

        Software Engineer Roles and Responsibilities:
        Develops information systems by designing, developing, and installing software solutions.
        Determines operational feasibility by evaluating analysis, problem definition, requirements, solution development, and proposed solutions.
        Develops software solutions by studying information needs, conferring with users, and studying systems flow, data usage, and work processes.
        Investigates problem areas.
        Follows the software development lifecycle.
        Documents and demonstrates solutions by developing documentation, flowcharts, layouts, diagrams, charts, code comments and clear code.
        Prepares and installs solutions by determining and designing system specifications, standards, and programming.
        Improves operations by conducting systems analysis and recommending changes in policies and procedures.
        Obtains and licenses software by obtaining required information from vendors, recommending purchases, and testing and approving products.
        Protects operations by keeping information confidential.
        Provides information by collecting, analyzing, and summarizing development and service issues.
        Accomplishes engineering and organization mission by completing related results as needed.
        work collaboratively with cross-functional teams to design, develop and implement software solutions that address business requirements
        create clean code using various programming languages and frameworks with well-documented documentation for efficiency and clarity
        debug and troubleshoot software issues to guarantee the smooth running of applications
        write automated tests to ensure high quality and maintainability of code
        participate in code reviews to provide feedback for improvement
        stay updated on emerging technologies and best practices in software development
        
        Requirements:
        bachelor's degree in computer science or a related field
        strong programming skills in one or more programming languages such as Python, C++, etc.
        experience with software development methodologies such as Agile or Waterfall
        knowledge of software design patterns and principles of software engineering
        familiarity with database management systems
        experience with version control systems such as Git
        excellent problem-solving and analytical skills
        strong communication and collaboration skills
        The model shown is for illustration purposes only, and may require additional formatting to meet accepted standards.

        Software Engineer Qualifications and Skills:
        Analyzing information
        General programming skills
        Software design
        Software debugging
        Software documentation
        Software testing
        Problem solving
        Teamwork
        Software development fundamentals
        Software development process
        Software requirements
        Education, Experience, and Licensing Requirements:

        Bachelor's and/or master's degree in computer science, computer engineering, or related technical discipline
        5+ years of professional software development experience
        Proficiency in Java or C++, and object-oriented design skills
        Application architecture and design patterns
        Experience serving as technical lead throughout the full software development lifecycle, from conception, architecture definition, detailed design, scoping, planning, implementation, testing to documentation, delivery and maintenance is preferred
        Knowledge of professional software engineering and best practices for the full software development life cycle, including coding standards, code reviews, source control management, build processes, testing, and operations
        Experience in development of distributed/scalable systems and high-volume transaction applications
        You've got a candidate's interest. Now how do you get their application? Include a compelling call to action right here that encourages job hunters to apply and tells them how.
    """
    parsed_resume = [
        "Ahmed Tarek AbdelAal Sayed \nComputer Engineering student at Cairo University ",
        "OBJECTIVES \nMotivated and detail -oriented Computer Enginee r student having solid foundations \nin programming with hands -on experience . \nSeeking a Web Development position where I can leverage my technical skills, and \ncontribute to innovative projects. \n I work collaboratively with cross-functional teams and create clean code using various programming languages and frameworks",
        "EDUCATION \nBachelor of Communications and Computer Engineering expected 2025. \nCairo University, Faculty of Engineering, Giza, Egypt \nMajor: Computer Engineering \nCumulative GPA: 3.37/4.0 ",
        "INTERNSHIPS \nEMAAR Internship  July 2023 -- August 2023 \n Salesforce developer: SF ecosystem. Visualforce, LWCs. \n Data Analytics  Power BI: Data Gathering, Shaping & Modeling Data, Create \nDashboards \nArab Organization for Industrialization Training , Electronics departments. ",
        "COURSES \nCS50: Introduction to computer science, Harvard University, online. \n C, Python, SQLite3, HTML, CSS, JS \nEmbedded Systems Course , AMIT Institute . \n ARM controllers: ATMEGA 32 \n Drivers Interfacing \n Serial Communications protocols such as UART, and I2C. \nMachine Learning from Deep -learning , Coursera. \n Supervised vs Unsupervised Machine Learning. \n Regression: Linear Regression, single and multivariable targets. \n Classification: Logistic regression ",
        "PROJECTS \n CoEdit , 2024 Visit Site ! \n Real -time text editor using React.js & Spring Boot (Java) using Pseudo OT . \n Tools: Visual Studio Code, React, Tailwind CSS with , Shadcn -ui, MongoDB , \nSockjs , deployed using Vercel (FE) and Render (BE) \n Redditech , 2024 GitHub Repo \n Reddit Clone using MERN Stack \n My role: Frontend \n Main feed , Posts, Search , JWT Authentication (FE side) \n Mock Backend using Express.js. \n Tools: Visual Studio Code, React, Tailwind, Axios, React Query \nEgyptCheer VIP Football Match Seat Reservation , 2024 Visit Site ! \n A website application for VIPs to book seats for matches online . \n Tools: Visual Studio Code , Next.js, React, Tailwind with DaisyUI plugin, \nMongoDB, Mongoose , deployed using Vercel \nGym management system using C# and SQL, 2023 GitHub Repo \n A desktop application for Gym managers/owners and receptionists. Helps \nkeep track of members' subscriptions . \n Tools: Visual Studio, Microsoft SQL DBMS \nChess Game using Assembly, 2023 GitHub Repo \n 8086 processor multiplayer chess game written in assembly language. \n Tools: Visual Studio Code, DOSBox, TASM Debugger \nShipping company simulator using C++, 2022 GitHub Repo \n A console application that simulates how different types of Trucks can ship \ndifferent types of Cargos. The simulation displays each truck whether it is \nshipping or in maintenance each hour. Email ahmedtarekabd2002@gmail.com \nGitHub github.com/ahmedtarekabd \nLinkedIn linkedin.com/in/ahmedtarekabd/ \nMobile +20 1202708815 \nLocation Mohandessin, Giza, Egypt ",
        "SKILLS \nProgramming Languages \nC/C++ C# \nPython Java \nHTML , CSS JS/TS \nNode.js Ruby \nPHP MATLAB \nFrameworks \n UI \no Shadcn -UI, Tailwind CSS \n Frontend \no React.js \n Backend \no Nodejs, Django , Spring Boot , \nLaravel \n Databases \no MySQL, MongoDB \n Full stack \no Next.js \nEngineering concepts \n Data Structure & Algorithms \n Logic Design \n Modular Programming \n Embedded Systems \n Fundamentals of Electronics \n Version Control (Git & GitHub ) ",
        "INTERESTS & ACTIVITIES \nRowing \n 1st in the Egyptian Cup 2020 twice, \nAlamein Championship 2020 \n 2nd in the Egyptian Cup 2019 \n 3rd in the Egyptian Cup 2019, 2020, \nRepublic Championship 2019, 2020 \ntwice \nLebaladna \n Preparing meals during Ramadan. \nCycling ",
        "SIDE PROJECTS \n Tomaanina Website Visit Site! \no Get Random Ayah \no Get Random Zikr (or on -demand) \no Sebha ",
        "OTHER PROJECTS \nSnake & Ladders game with \nMonopoly -like rules, 2021 GitHub Repo \n A console game that uses \nCMUgraphicsLib Library to open a \ngraphical screen to display the \ngame , using Visual Studio . "
    ]

    relative_path = Path() / "app/testing/"
    resume_file_pdf = relative_path / 'Ahmed Tarek Resume.pdf'
    resume_file_docx = relative_path / 'Bold attorney resume.docx'
    parsed_resume = extract_text_from_pdf(resume_file_pdf)
    # parsed_resume = extract_text_from_docx(resume_file_docx)
    job_description = "Expertise in AI and data science methods."
    parsed_resume = "Proficient in machine learning techniques."

    # resumes = [clean_text(' '.join(parsed_resume).replace('\n', ' '))]
    resumes = [clean_text(parsed_resume.replace('\n', ' '))]
    sentences = [job_description] + resumes
    similarity_scores = text_similarity_cosine(job_description, resumes, n=1)
    similarity_scores = text_similarity(sentences)
    print(f'Sentence embedding using BERT:\t{similarity_scores}')