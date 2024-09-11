import streamlit as st
from .auth_handler import login
from lib.router import router

@router.map("/signin")
def signin():
    st.title("Sign In")

    username = st.text_input("Username")
    password = st.text_input("Password", type="password")

    if st.button("Sign In"):
        success, message = login(username, password)
        if success:
            st.success("Signed in successfully")
            st.session_state['page'] = 'dashboard'
            st.rerun()
        else:
            st.error(message)

    st.write("Don't have an account?")
    if st.button("Go to Sign Up"):
        st.session_state['page'] = 'signup'
        st.rerun()
