import { configureStore } from "@reduxjs/toolkit";
import authSlice1 from "./authSlice (1)";
import TasksSlice from "./TasksSlice";
import usersSlice from "./usersSlice";

export const store = configureStore({
    reducer:{
        logged: usersSlice,
        tasks: TasksSlice,
        auth:authSlice1
    }
})