import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export const createTask = (payload) => axios.post(`${API_BASE}/tasks`, payload).then(r=>r.data);
export const getUserTasks = (userId) => axios.get(`${API_BASE}/tasks/user/${userId}`).then(r=>r.data);
