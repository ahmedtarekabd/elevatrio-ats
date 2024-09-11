import streamlit as st
import requests
from lib.config import API_URL

# Function to login and get JWT token
def login(username, password):
    response = requests.post(f"{API_URL}/token", data={"username": username, "password": password})
    if response.status_code == 200:
        token = response.json().get("access_token")
        return token
    else:
        st.error("Login failed: Invalid credentials")
        return None

# Function to access protected route
def get_current_user(token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{API_URL}/users/me", headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        st.error("Failed to fetch user data.")
        return None