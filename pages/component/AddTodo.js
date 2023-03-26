import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodos, selectLoading } from '../../slices/todoSlice'

const AddTodo = () => {
    const [title, setTitle] = useState(null)
    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()

    const handleTodoSubmit = async (e) => {
        e.preventDefault()
        if (!title || loading) return;
        dispatch(addTodos({ title }))
    }
    return (
        <form onSubmit={handleTodoSubmit}>
            <input
                type="text"
                placeholder="What to do?"
                className='form-text'
                onChange={(e) => setTitle(e.target.value)} />
            <input type="submit" value="New List" className='form-btn' />
        </form>
    )
}

export default AddTodo