import { privateDelete, privateGet, privatePost, privatePut } from "../../utils/apiCaller";

export const getTodos = async (token) => {
  const response = await privateGet("/todo/all", token);
  return response;
};
export const addTodo = async (token, data) => {
  const response = await privatePost("/todo/create", token, data);
  return response;
}

export const deleteTodo = async (token, id) => {
  const response = await privateDelete(`/todo/${id}`, token);
  return response;
}

export const changeTodo = async (token, body) => {
  const response = await privatePut("/todo/update", token, body);
  return response;
}