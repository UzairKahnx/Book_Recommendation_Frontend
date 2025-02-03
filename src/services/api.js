// src/services/api.js

import axios from 'axios';

// Set up the base URL for your backend API
const API_URL = 'https://bookrecommendationbackend-production.up.railway.app/api';

// Function for user login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function for user signup
export const signupUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
