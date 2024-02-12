import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import regReducer from "../features/registration/regSlice";
import storage from "redux-persist/lib/storage";
import loginSlice from "../features/auth/loginSlice";
const appReducer = combineReducers({
  todo: todoReducer,
  reg: regReducer,
  login: loginSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    state = {};
    storage.removeItem("persist:user");
  }

  return appReducer(state, action);
};

export default rootReducer;