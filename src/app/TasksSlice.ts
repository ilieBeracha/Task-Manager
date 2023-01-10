import { createSlice } from '@reduxjs/toolkit'

const TasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        getTasksRedux: (state, actions) => {
            return state = actions.payload
        }
    }
});

export const { getTasksRedux } = TasksSlice.actions

export default TasksSlice.reducer
