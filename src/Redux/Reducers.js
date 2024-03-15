import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./TaskSlice";

const rootReducer = combineReducers({
  tasks: taskReducer
});

export default rootReducer;
