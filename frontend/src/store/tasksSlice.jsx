import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: null,
    reducers: {
        addTasks: (state, action) => {
            return action.payload;
        },
        removeTasks: (state, action) => {
            return null;
        }
    }
})

export const { addTasks, removeTasks } = tasksSlice.actions;

export default tasksSlice.reducer;