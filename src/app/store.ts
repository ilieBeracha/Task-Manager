import { configureStore } from "@reduxjs/toolkit";
import TasksSlice from "./TasksSlice";
import usersSlice from "./usersSlice";

export const store = configureStore({
    reducer:{
        logged: usersSlice,
        tasks: TasksSlice
    }
})