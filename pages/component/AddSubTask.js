import React, { useState } from 'react'

const AddSubTask = ({
    title,
    setError,
    loading,
    setLoading,
    fetchTodo
}) => {
    const [subtask, setSubtask] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!subtask || loading) return;
        setLoading(true)
        try {
            let res = await fetch("/api/subtasks/", {
                method: "POST",
                body: JSON.stringify({
                    title: subtask,
                    todo_id: title
                })
            })
            let data = await res.json()
            await fetchTodo();
            setLoading(false)
            setError(await data.message)
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError(e.message)
        }
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