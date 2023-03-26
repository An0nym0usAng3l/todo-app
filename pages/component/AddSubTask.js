import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSubTask, selectLoading } from '../../slices/todoSlice'

const AddSubTask = ({
    title
}) => {
    const [subtask, setSubtask] = useState(null)
    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!subtask || loading) return;
        dispatch(addSubTask({ title, subtask }))
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="What are the steps?"
                className='form-text'
                onChange={(e) => setSubtask(e.target.value)} />
            <input type="submit" value="New step" className='form-btn' />
        </form>
    )
}

export default AddSubTask