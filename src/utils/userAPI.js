import axios from 'axios';

const API_URL = 'http://localhost:8080/api/hr/users';

const handleAxiosError = (error) => {
  console.error('API call failed:', error.response?.data || error.message);
  throw error;
};

const getAllEmployees = async (token) => {
  try {
      const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
  } catch (error) {
      handleAxiosError(error);
  }
};

const createEmployee = async (employee, token) => {
  try {
      const response = await axios.post(API_URL, employee, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      return response.data;
  } catch (error) {
      handleAxiosError(error);
  }
};

const updateEmployee = async (id, employee, token) => {
  try {
      console.log("Token:", token); // Debugging token
      console.log("Payload:", employee); // Debugging payload
      const response = await axios.put(`${API_URL}/profile/${id}`, employee, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      return response.data;
  } catch (error) {
      console.error("Update employee failed:", error.response?.data || error.message);
      throw error;
  }
};


const deleteEmployee = async (id, token) => {
  try {
      const response = await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
  } catch (error) {
      handleAxiosError(error);
  }
};

export default {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
