import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  totalTasks: 0,
  completedTasks: 0,
  selectedPriority: "All",
};

const persistedTasks = JSON.parse(localStorage.getItem("tasks"));

if (persistedTasks) {
  initialState.tasks = persistedTasks;
  initialState.totalTasks = persistedTasks.length;
  initialState.completedTasks = persistedTasks.filter(
    (task) => task.status === "completed"
  ).length;
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      state.totalTasks++;
      if (action.payload.status === "completed") {
        state.completedTasks++;
      }
    },
    deleteTask: (state, action) => {
      const deletedTask = state.tasks.find(
        (task) => task.id === action.payload
      );
      if (deletedTask) {
        const index = state.tasks.indexOf(deletedTask);
        state.tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        state.totalTasks--;
        if (deletedTask.status === "completed") {
          state.completedTasks--;
        }
      }
    },
    updateTaskStatus: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      state.completedTasks = state.tasks.filter(
        (task) => task.status === "completed"
      ).length;
    },
    setSelectedPriority: (state, action) => {
      state.selectedPriority = action.payload;
    },
    editTask: (state, action) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      state.tasks = updatedTasks;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      state.completedTasks = state.tasks.filter(
        (task) => task.status === "completed"
      ).length;
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTaskStatus,
  setSelectedPriority,
  editTask,
} = taskSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectTotalTasks = (state) => state.tasks.totalTasks;
export const selectCompletedTasks = (state) => state.tasks.completedTasks;
export const selectSelectedPriority = (state) => state.tasks.selectedPriority;

export default taskSlice.reducer;
