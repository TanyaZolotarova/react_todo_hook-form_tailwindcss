import {configureStore, createSlice} from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('todos')) || [];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTask: (state, action) => {
            return [
                ...state,
                {id: Date.now(), text: action.payload, completed: false}
            ];
        },
        checkboxComplete: (state, action) => {
            return state.map((todo) =>
                todo.id === action.payload ? {...todo, completed: !todo.completed} : todo
            );
        },
        deleteTask: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload);
        },
    },
})

export const {addTask, checkboxComplete, deleteTask} = todoSlice.actions;

const store = configureStore({
    reducer: {todos: todoSlice.reducer}
})

store.subscribe(() => {
    localStorage.setItem('todos', JSON.stringify(store.getState().todos));
});
export default store;