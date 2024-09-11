import streamlit as st
from utils.middleware.auth_middleware import auth_middleware
from pages.auth.signin import signin

def test():
    st.write("Hello World")

if __name__ == "__main__":
    pg = st.navigation([
        st.Page(test, title="Sign In", icon=":material/lock:"),
        # st.Page("dashboard.py", title="Dashboard"),
        # st.Page("view_candidates.py", title="View Candidates", icon=":material/favorite:"),
        # st.Page("candidate_details.py", title="Candidate Details", icon=":material/favorite:"),
    ])
    auth_middleware()
    
    pg.run()


    # if st.button("Home"):
    #     st.switch_page("your_app.py")
    # if st.button("Page 1"):
    #     st.switch_page("pages/page_1.py")
    # if st.button("Page 2"):
    #     st.switch_page("pages/page_2.py")
