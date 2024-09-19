import PyPDF2
import docx
import spacy
import re
import json
import os
from pathlib import Path

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
# The patterns are used to identify the start of each section in the resume
# Note: We add \s at the end of some patterns to avoid matching with similar words, ex: "intern" and "intern"ational
email_pattern = {
    "label": "email",
    "pattern": r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
}
phone_pattern = {
    "label": "phone",
    "pattern": r'(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}'
}
overview_pattern = {
    "label": "overview",
    "pattern": "overview\s|summary\s|objectives?\s|about me\s|profile\s|bio\s|personal statement\s",
}
education_pattern = {
    "label": "education",
    "pattern": "education\s|academic background\s|qualifications?\s",
}
experience_pattern = {
    "label": "experience",
    "pattern": "experience\s|expertise\s|work history\s|employment history\s|interns?\s|internships?\s",
}
skills_pattern = {
    "label": "skills",
    "pattern": "skills?\s|tools?\s",
}
certifications_pattern = {
    "label": "certifications",
    "pattern": "certificat?|awards?\s|courses?\s",
}
projects_pattern = {
    "label": "projects",
    "pattern": "projects?|portfolio|work samples?|achievements?",
}
languages_pattern = {
    "label": "languages",
    "pattern": "languages?|spoken languages",
}
patterns = [overview_pattern, education_pattern, experience_pattern, skills_pattern, certifications_pattern, projects_pattern, languages_pattern, email_pattern, phone_pattern]

def extract_name(doc):
    for ent in doc.ents:
        if ent.label_ == 'PERSON':
            return ent.text
    return None

def extract_email(text):
    match = re.search(email_pattern['pattern'], text)
    if match:
        return match.group(0)
    return None

def extract_phone(text):
    match = re.search(phone_pattern['pattern'], text)
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

def extract_sections(resume_data, paragraphs):
    prev_section = None
    for i, paragraph in enumerate(paragraphs):
        # print(paragraph.replace('\n', ' ')) # Print the paragraph without newlines
        current_section = None
        for pattern in patterns:
            if re.search(pattern['pattern'], paragraph[:30], re.IGNORECASE):
                # print(f"Pattern: {pattern['pattern']} found in paragraph {i}, label: {pattern['label']}, paragraph[:30]: {paragraph[:30]}")
                current_section = pattern['label']
                prev_section = pattern['label']
                if current_section not in resume_data or not resume_data[current_section]:
                    resume_data[current_section] = paragraph
                else: 
                    resume_data[current_section] += paragraph
                break
        if not current_section and prev_section: 
            resume_data[prev_section] += paragraph
    return resume_data

def extract_info_from_text(text: str, paragraphs: list[str]):
    resume_data = {
        'name': '',
        'email': '',
        'phone': '',
        'overview': '',
        'experience': '',
        'education': '',
        'certifications': '',
        'projects': '',
        'skills': [],
        'languages': [],
        'links': []
    }

    nlp = spacy.load('en_core_web_lg')
    doc = nlp(text)

    resume_data = extract_sections(resume_data, paragraphs)
    # Regex
    resume_data['name'] = extract_name(doc)
    resume_data['email'] = extract_email(text)
    resume_data['phone'] = extract_phone(text)
    resume_data['links'] = extract_links(text)
    resume_data['languages'] = extract_languages(text)

    relative_path = Path() / 'app/testing/output/output.html'
    with open(relative_path, 'w') as file:
        file.write(spacy.displacy.render(doc, style='ent'))

    return resume_data

def parse_resume(file_path):
    text = ""
    if str(file_path).endswith('.pdf'):
        text = extract_text_from_pdf(file_path)
    elif str(file_path).endswith('.docx'):
        text = extract_text_from_docx(file_path)
    else:
        raise ValueError('Unsupported file format')
    
    text = re.sub('[ ]+', ' ', text) # Remove extra spaces
    text = re.sub(r'[^\x00-\x7F]+', '', text) # Remove symbols
    paragraphs = re.split(r'\n\s*\n', text) # Split text into paragraphs
    with open(relative_path / 'output/paragraphs.json', 'w') as file:
        json.dump(paragraphs, file, indent=4)

    text = ' '.join(paragraphs)
    resume_data = extract_info_from_text(text, paragraphs)

    return resume_data

# TODO: Use an LLM model to extract information more accuratly from the resume
def extract_info_from_text_using_llm(text: str):
    pass

if __name__ == '__main__':
    relative_path = Path() / "app/testing/"

    resume_file_pdf = relative_path / 'Haitham_Ibrahim-CV.pdf'
    resume_file_pdf = relative_path / 'Ahmed Tarek Resume.pdf'
    resume_file_docx = relative_path / 'Ahmed Tarek Resume.docx'
    
    resume_data = parse_resume(resume_file_pdf)
    with open(relative_path / 'output/output.json', 'w') as file:
        json.dump(resume_data, file, indent=4)
    # print(resume_data)