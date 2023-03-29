import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotice, fetchTodos, selectLoading, updateSubTask, updateTodos } from '../../slices/todoSlice'
import AddSubTask from './AddSubTask'
import AddTodo from './AddTodo'
import Spinner from './Spinner'
import SubTask from './SubTask'

const Todo = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos.todos)
    const notice = useSelector((state) => state.todos.notice)
    const loading = useSelector(selectLoading)
    const [active, setActive] = useState(todos && todos[0]?.title)

    const handleTaskUpdate = async (status, todo_id) => {
        if (loading) return
        dispatch(updateTodos({ status, todo_id }));
    }

    const handleSubTaskUpdate = async (status, todo_id, subtask_title) => {
        if (loading) return
        dispatch(updateSubTask({ status, todo_id, subtask_title }));
    }

    const getCompleted = (array) => {
        let count = 0
        array.map((e) => {
            if (e.status) count++
        })
        return count
    }

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])
    useEffect(() => {
        if (notice) {
            setTimeout(() => {
                dispatch(clearNotice())
            }, 3000)
        }
    }, [notice])
    return (
        <div className='container'>
            {
                loading && <Spinner />
            }
            {
                notice && <p className='error'>{notice}</p>
            }
            <h2>Todo App</h2>
            <AddTodo />
            <div className='task'>
                {
                    todos?.map((item) => (
                        <div key={item.title}>
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
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Todo