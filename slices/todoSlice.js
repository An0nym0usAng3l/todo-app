import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
    notice: null,
    loading: false
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await fetch("/api/tasks/")
    const data = await response.json();
    data.sort((a, b) => b.created_at - a.created_at)
    return data;
});

export const addTodos = createAsyncThunk("todos/addTodos", async ({ title }, { dispatch }) => {
    let res = await fetch("/api/tasks/", {
        method: "POST",
        body: JSON.stringify({ title })
    })
    let data = await res.json()
    await dispatch(fetchTodos())
    return (await data.message)
});

export const addSubTask = createAsyncThunk("todos/addSubTask", async ({ title, subtask }, { dispatch }) => {
    let res = await fetch("/api/subtasks/", {
        method: "POST",
        body: JSON.stringify({
            title: subtask,
            todo_id: title
        })
    })
    let data = await res.json()
    await dispatch(fetchTodos())
    return (await data.message)
});

export const updateTodos = createAsyncThunk("todos/updateTodos", async ({ status, todo_id }, { dispatch }) => {
    const res = await fetch(`/api/tasks/${todo_id}`, {
        method: "PATCH",
        body: JSON.stringify({
            status
        })
    })
    const data = await res.json();
    await dispatch(fetchTodos())
    return (await data.message)
});

export const updateSubTask = createAsyncThunk("todos/updateSubTask", async ({ status, todo_id, subtask_title }, { dispatch }) => {
    const res = await fetch(`/api/subtasks/${todo_id}`, {
        method: "PATCH",
        body: JSON.stringify({
            status,
            subtask_title
        })
    })
    const data = await res.json();
    await dispatch(fetchTodos())
    return (await data.message)
});

export const selectLoading = (state) => state.todos.loading

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        clearNotice(state, action) {
            state.notice = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload;
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.notice = action.error.message
            console.log(action.error.message)
        });
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.notice = action.payload;
        });
        builder.addCase(addTodos.rejected, (state, action) => {
            state.loading = false;
            state.notice = action.error.message
        });
        builder.addCase(addTodos.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addSubTask.fulfilled, (state, action) => {
            state.loading = false;
            state.notice = action.payload;
        });
        builder.addCase(addSubTask.rejected, (state, action) => {
            state.loading = false;
            state.notice = action.error.message
        });
        builder.addCase(addSubTask.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(updateTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.notice = action.payload;
        });
        builder.addCase(updateTodos.rejected, (state, action) => {
            state.loading = false;
            state.notice = action.error.message
        });
        builder.addCase(updateTodos.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(updateSubTask.fulfilled, (state, action) => {
            state.loading = false;
            state.notice = action.payload;
        });
        builder.addCase(updateSubTask.rejected, (state, action) => {
            state.loading = false;
            state.notice = action.error.message
        });
        builder.addCase(updateSubTask.pending, (state) => {
            state.loading = true;
        });
    }
})

export default todoSlice.reducer;

export const { clearNotice } = todoSlice.actions