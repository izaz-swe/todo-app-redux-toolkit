import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTodo, changeTodo, deleteTodo, getTodos } from "./todoAPI";

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  success: false,
  error: '',
  editing: {},
};

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (token) =>{
    const todos = await getTodos(token);
    return todos;
  }
);
export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async ({token, body}) => {
    const response = await addTodo(token, body);
    return response;
  }
);
export const removeTodo = createAsyncThunk(
  "todo/removeTodo",
  async ({token, todoId}) => {
    const response = await deleteTodo(token, todoId);
    return response;
  }
);
export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({token, data}) => {
    const response = changeTodo(token, data);
    return response;
  }
)
//createSlice
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.success = false;
    })
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.success = true;
      state.todos = action.payload.data;
    })
    .addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.todos = [];
    })
    .addCase(createTodo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.success = false;
    })
    .addCase(createTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.success = true;
      state.todos.push(action.payload.data)
    })
    .addCase(createTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    })
    .addCase(removeTodo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(removeTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = state.todos.filter((todo)=> todo.todoId !== action.payload.data)
    })
    .addCase(removeTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    })
    .addCase(updateTodo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      const indexToUpdate = state.todos.findIndex((t)=> t.todoId === action.payload.data.todoId);
      state.todos[indexToUpdate] = action.payload.data;
    })
    .addCase(updateTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    })
  }
});

export default todoSlice.reducer;
export const {editActive, editInActive} = todoSlice.actions;