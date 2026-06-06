import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const api = axios.create({
  baseURL: API_URL,
});

// GET ALL TASKS
const getAll = async () => {
  const response = await api.get("/");
  return response.data;
};

// CREATE TASK
const create = async (taskData) => {
  const response = await api.post("/", taskData);
  return response.data;
};

// UPDATE TASK
const update = async (id, taskData) => {
  const response = await api.put(`/${id}`, taskData);
  return response.data;
};

// DELETE TASK
const remove = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

// TOGGLE COMPLETE
const toggle = async (id) => {
  const response = await api.patch(`/${id}/toggle`);
  return response.data;
};

// CLEAR COMPLETED
const clearCompleted = async () => {
  const response = await api.delete("/?completed=true");
  return response.data;
};

const taskService = {
  getAll,
  create,
  update,
  remove,
  delete: remove,
  toggle,
  clearCompleted,
};

export default taskService;