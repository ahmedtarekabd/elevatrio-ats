import PyPDF2
import docx
import spacy
import os
import re
import json

# Text extraction functions
def extract_text_from_pdf(file_path):
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
    return text

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    return '\n'.join([para.text for para in doc.paragraphs])

# Information extraction functions
email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
phone_pattern = r'(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}'
education_pattern = "education|academic background|qualifications?"
experience_pattern = "experience|work history|employment history|intern.*"
skills_pattern = "skills?|technical skills?|professional skills?"
certifications_pattern = "certifications?|certificates?|awards?|courses"
projects_pattern = "projects?|portfolio|work samples?"
languages_pattern = "languages?|spoken languages"
patterns = [education_pattern, experience_pattern, skills_pattern, certifications_pattern, projects_pattern, languages_pattern, email_pattern, phone_pattern]

def extract_email(text):
    match = re.search(email_pattern, text)
    if match:
        return match.group(0)
    return None

def extract_phone(text):
    match = re.search(phone_pattern, text)
    if match:
        return match.group(0)
    return None

def extract_section(text, section_name, next_sections):
    # Build the regex pattern dynamically based on the section name and next sections
    pattern = rf'(?i)({section_name})(.*?)(?=\n(?:{"|".join(next_sections)}))'
    
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group(2).strip()  # Group 2 contains the text of the matched section
    return None

def extract_certifications(text):
    section = patterns.copy()
    section.remove(certifications_pattern)
    return extract_section(text, certifications_pattern, section)

def extract_education(text):
    section = patterns.copy()
    section.remove(education_pattern)
    return extract_section(text, education_pattern, section)

def extract_experience(text):
    section = patterns.copy()
    section.remove(experience_pattern)
    return extract_section(text, experience_pattern, section)

def extract_projects(text):
    section = patterns.copy()
    section.remove(projects_pattern)
    return extract_section(text, projects_pattern, section)

def extract_languages(text):
    languages_list = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic']
    return [language for language in languages_list if language.lower() in text.lower()]

def extract_links(text):
    links = []
    link_pattern = r'(?:https?://)?(\w+\.)?(.+\.com+)+(\.\w+)?(/\S+)?' # Matches links with www or subdomains
    matches = re.findall(link_pattern, text)
    if matches:
        links = [''.join(match) for match in matches if match[-1]] # Only keep full matches (aka. with path: https://www.example.com/path)
    return links


def extract_info_from_text(text):
    resume_data = {
        'name': '',
        'email': '',
        'phone': '',
        'skills': [],
        'experience': [],
        'education': [],
        'certifications': [],
        'projects': [],
        'languages': [],
        'links': []
    }

    nlp = spacy.load('en_core_web_lg')
    doc = nlp(text)
    # entities = [ent.label_ for ent in doc.ents]
    for ent in doc.ents:
        if ent.label_ == 'PERSON' and ~len(resume_data['name']):
            resume_data['name'] = ent.text
            break
    
    resume_data['email'] = extract_email(text)
    resume_data['phone'] = extract_phone(text)
    resume_data['experience'] = extract_experience(text)
    resume_data['education'] = extract_education(text)
    resume_data['certifications'] = extract_certifications(text)
    resume_data['projects'] = extract_projects(text)
    resume_data['languages'] = extract_languages(text)
    resume_data['links'] = extract_links(text)

    relative_path = os.path.dirname(__file__)
    with open(relative_path + '\\resumes\\output\\output.html', 'w') as file:
        file.write(spacy.displacy.render(doc, style='ent'))

    return resume_data

def parse_resume(file_path):
    text = ""
    if file_path.endswith('.pdf'):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith('.docx'):
        text = extract_text_from_docx(file_path)
    else:
        raise ValueError('Unsupported file format')
    
    resume_data = extract_info_from_text(text)
    # TODO: Use an LLM(Llama 3.1) model to extract information more accuratly from the resume

    return resume_data

if __name__ == '__main__':
    relative_path = os.path.dirname(__file__)
    resume_file_pdf = relative_path + '\\resumes\\Ahmed Tarek Resume.pdf'
    resume_file_pdf = relative_path + '\\resumes\\Haitham_Ibrahim-CV.pdf'

    resume_file_docx = relative_path + '\\resumes\\Ahmed Tarek Resume.docx'
    
    resume_data = parse_resume(resume_file_pdf)
    with open(relative_path + '\\resumes\\output\\output.json', 'w') as file:
        json.dump(resume_data, file, indent=4)
    # print(resume_data)