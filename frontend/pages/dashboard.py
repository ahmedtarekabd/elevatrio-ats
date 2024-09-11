import streamlit as st
import pandas as pd

def dashboard():

    # Placeholder data, replace with actual database queries
    candidates_data = pd.DataFrame({
        'Name': ['Alice Johnson', 'Bob Smith', 'Charlie Brown'],
        'Position Applied': ['Data Scientist', 'Backend Developer', 'Product Manager'],
        'Score': [85, 78, 92],
        'Status': ['New', 'In Review', 'Top Recommendation'],
        'Pros': ['Strong in Python', 'Excellent SQL Skills', 'Great leadership'],
        'Cons': ['Needs more ML experience', 'Limited front-end knowledge', 'Weak in data analysis'],
        'Suggestions': ['Take advanced ML course', 'Learn front-end basics', 'Improve data analysis skills'],
    })

    job_opportunities = pd.DataFrame({
        'Job Title': ['Data Scientist', 'Backend Developer', 'Product Manager'],
        'Skills Required': ['Python, Machine Learning', 'SQL, API Development', 'Leadership, Product Design'],
        'Experience Required': ['3+ years', '2+ years', '5+ years'],
    })

    # Sidebar for navigation
    st.sidebar.title("HR Dashboard")
    section = st.sidebar.radio("Go to", ["Overview", "New Candidates", "Top Candidates", "Job Opportunities", "Search & Filter"])

    # Header
    st.title("HR Management Dashboard")

    if section == "Overview":
        st.header("Overview")
        st.subheader("Recently Viewed Candidates")
        # Display the recently viewed candidates section
        st.write(candidates_data[['Name', 'Position Applied', 'Status']])

    elif section == "New Candidates":
        st.header("New Candidates")
        # Display all new candidates
        new_candidates = candidates_data[candidates_data['Status'] == 'New']
        st.write(new_candidates)

    elif section == "Top Candidates":
        st.header("Top Candidates Recommendations")
        # Display top candidates based on score
        top_candidates = candidates_data[candidates_data['Score'] >= 80]
        st.write(top_candidates)

    elif section == "Job Opportunities":
        st.header("Manage Job Opportunities")
        # Display job opportunities
        st.write(job_opportunities)

        # Add form to create a new job opportunity
        st.subheader("Add New Job Opportunity")
        with st.form("new_job_form"):
            job_title = st.text_input("Job Title")
            skills_required = st.text_input("Skills Required")
            experience_required = st.text_input("Experience Required")
            submitted = st.form_submit_button("Add Job")
            if submitted:
                new_row = {'Job Title': job_title, 'Skills Required': skills_required, 'Experience Required': experience_required}
                job_opportunities = job_opportunities.append(new_row, ignore_index=True)
                st.success(f"Job '{job_title}' added successfully!")

    elif section == "Search & Filter":
        st.header("Search & Filter Candidates")
        # Search and filter candidates
        search_job = st.selectbox("Filter by Job Title", job_opportunities['Job Title'].unique())
        filtered_candidates = candidates_data[candidates_data['Position Applied'] == search_job]
        st.write(filtered_candidates)

        # Additional filters (e.g., by score)
        min_score = st.slider("Minimum Score", 0, 100, 70)
        st.write(filtered_candidates[filtered_candidates['Score'] >= min_score])
