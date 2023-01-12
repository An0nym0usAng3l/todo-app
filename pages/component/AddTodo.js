import React, { useState } from 'react'

const AddTodo = ({
    setError,
    loading,
    setLoading,
    fetchTodo
}) => {
    const [title, setTitle] = useState(null)

    const handleTodoSubmit = async (e) => {
        e.preventDefault()
        if (!title || loading) return;
        setLoading(true)
        try {
            let res = await fetch("/api/tasks/", {
                method: "POST",
                body: JSON.stringify({ title })
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