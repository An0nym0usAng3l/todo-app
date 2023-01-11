import React from 'react'

const Todo = () => {
    return (
        <div className='container'>
            <h2>Todo App</h2>
            <form>
                <input type="text" placeholder="What to do?" className='form-text' />
                <input type="submit" value="New List" className='form-btn' />
            </form>
            <div className='task'>
                <div className='task-detail'>
                    <div className='title'>
                        <input type="checkbox" className="checkbox" />
                        <div>Do Laundry</div>
                    </div>
                    <div className="status">
                        3 of 5 completed
                    </div>
                </div>
                <div className='subtasks'>
                    <div className='subtask'>
                        <div className='title'>
                            <input type="checkbox" className="checkbox" />
                            <div>Do Laundry</div>
                        </div>
                    </div>
                    <div className='subtask'>
                        <div className='title'>
                            <input type="checkbox" className="checkbox" />
                            <div>Do Laundry</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo