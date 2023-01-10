import { configureStore } from "@reduxjs/toolkit";
import authSlice1 from "./authSlice (1)";
import darkLightModeSlice from "./darkLightModeSlice";
import overlaySlice from "./overlaySlice";
import TasksSlice from "./TasksSlice";
import usersSlice from "./usersSlice";

export const store = configureStore({
    reducer:{
        logged: usersSlice,
        tasks: TasksSlice,
        auth:authSlice1,
        overlay: overlaySlice,
        mode:darkLightModeSlice,
    }
})