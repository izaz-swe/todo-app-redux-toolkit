import axios from "./axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
}

export const publicPost = async (endpoint, body) => {
  const response = await axios.post(`${endpoint}`, body, config);
  return response.data;
};

export const privatePost = async (endpoint, token, body) => {
  config.headers.token = `${token}`;
  const response = await axios.post(`${endpoint}`, body, config);
  return response.data;
};
export const privateGet = async (endpoint, token) => {
  config.headers.token = `${token}`;
  const response = await axios.get(`${endpoint}`, config);
  return response.data;
};
export const privatePut = async (endpoint, token, body) => {
  config.headers.token = `${token}`;
  const response = await axios.put(`${endpoint}`, body, config);
  return response.data;
};
export const privateDelete = async (endpoint, token) => {
  config.headers.token = `${token}`;
  const response = await axios.delete(`${endpoint}`, config);
  return response.data;
};