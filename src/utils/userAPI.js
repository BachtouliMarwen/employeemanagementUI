import axios from 'axios';

const API_URL = 'http://localhost:8080/api/hr/users';

const getAllEmployees = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createEmployee = async (employee, token) => {
  const response = await axios.post(API_URL, employee, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  return response.data;
};

const updateEmployee = async (id, employee, token) => {
  const response = await axios.put(`${API_URL}/profile/${id}`, employee, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  return response.data;
};

const deleteEmployee = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
