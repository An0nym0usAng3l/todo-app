import React, { useEffect, useState } from 'react'
import AddSubTask from './AddSubTask'
import AddTodo from './AddTodo'
import Spinner from './Spinner'
import SubTask from './SubTask'

const Todo = () => {
    const [todo, setTodo] = useState(null)
    const [error, setError] = useState(null)
    const [active, setActive] = useState(todo && todo[0]?.title)
    const [loading, setLoading] = useState(false);

    const fetchTodo = async () => {
        try {
            const res = await fetch("/api/tasks/")
            const data = await res.json();
            data.sort((a, b) => b.created_at - a.created_at)
            setTodo(data);
            setActive(null)
        } catch (err) {
            console.log(err);
        }
    }

    const handleTaskUpdate = async (status, todo_id) => {
        if (loading) return
        setLoading(true)
        try {
            const res = await fetch(`/api/tasks/${todo_id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    status
                })
            })
            const data = await res.json();
            await fetchTodo();
            setLoading(false)
            setError(await data.message)
        } catch (err) {
            setLoading(false)
            setError(err.message);
        }
    }

    const handleSubTaskUpdate = async (status, todo_id, subtask_title) => {
        if (loading) return
        setLoading(true)
        try {
            const res = await fetch(`/api/subtasks/${todo_id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    status,
                    subtask_title
                })
            })
            const data = await res.json();
            await fetchTodo();
            setLoading(false)
            setError(await data.message)
        } catch (err) {
            setLoading(false)
            setError(err.message);
        }
    }

    const getCompleted = (array) => {
        let count = 0
        array.map((e) => {
            if (e.status) count++
        })
        return count
    }

    useEffect(() => {
        fetchTodo()
    }, [])
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }, [error])
    return (
        <div className='container'>
            {
                loading && <Spinner />
            }
            {
                error && <p className='error'>{error}</p>
            }
            <h2>Todo App</h2>
            <AddTodo
                setError={setError}
                loading={loading}
                setLoading={setLoading}
                fetchTodo={fetchTodo}
            />
            <div className='task'>
                {
                    todo?.map((item) => (
                        <>
                            <div className='task-detail' key={item.title}>
                                <div className='title'>
                                    <input type="checkbox"
                                        key={Math.random()}
                                        className="checkbox"
                                        defaultChecked={item.status}
                                        onChange={(e) => handleTaskUpdate(e.target.checked, item.title)}
                                    />
                                    <div>{item.title}</div>
                                </div>
                                <div className="status" onClick={() => setActive(active === item.title ? null : item.title)}>
                                    {
                                        item?.subtasks?.length > 0 ? (
                                            `${getCompleted(item.subtasks)} of ${item.subtasks.length} completed`
                                        ) : (
                                            "Add a SubTask"
                                        )
                                    }
                                </div>
                            </div>
                            {
                                item?.title === active && (
                                    <div className='subtasks'>
                                        {
                                            item?.subtasks?.map((subtask) => (
                                                <SubTask
                                                    key={subtask.title}
                                                    subtask={subtask}
                                                    item={item}
                                                    handleSubTaskUpdate={handleSubTaskUpdate}
                                                />
                                            ))
                                        }
                                        <div className='subtask'>
                                            <AddSubTask
                                                title={item?.title}
                                                setError={setError}
                                                loading={loading}
                                                setLoading={setLoading}
                                                fetchTodo={fetchTodo}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Todo