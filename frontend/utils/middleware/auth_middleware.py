import streamlit as st
from pages.auth.signin import signin

def auth_middleware():
    if 'authenticated' not in st.session_state:
        st.switch_page("pages/auth/signin")

    # if not st.session_state['authenticated']:
    #     st.session_state['authenticated'] = False
