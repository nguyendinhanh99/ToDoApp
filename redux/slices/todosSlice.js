import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    {
      id: '1',
      title: 'Task 1',
      time: "24/5/2024",
      priorityLevel: 1,
      status: true,
    },
    {
      id: '2',
      title: 'Task 2',
      time: "24/7/2024",
      priorityLevel: 3,
      status: true,
    },
    {
      id: '3',
      title: 'Task 3',
      time: "24/7/2024",
      priorityLevel: 3,
      status: true,
    },
    {
      id: '4',
      title: 'Task 4',
      time: "24/7/2024",
      priorityLevel: 3,
      status: true,
    },
  ],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const itemId = action.payload;
      state.todos = state.todos.filter(todo => todo.id !== itemId);
    },
    editTodo: (state, action) => {
      const updatedTodo = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === updatedTodo.id);
      if (existingTodo) {
        // Cập nhật thông tin todo bằng cách tạo bản sao mới
        state.todos = state.todos.map(todo =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
        );
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
