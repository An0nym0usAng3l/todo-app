import React from 'react'

const SubTask = ({ subtask, item, handleSubTaskUpdate }) => {
    return (
        <div className='subtask'>
            <div className='title'>
                <input
                    type="checkbox"
                    className="checkbox"
                    defaultChecked={subtask.status}
                    onChange={(e) => handleSubTaskUpdate(e.target.checked, item.title, subtask.title)}
                />
                <div>{subtask.title}</div>
            </div>
        </div>
    )
}

export default SubTask