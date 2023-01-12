import React from 'react'
const { db } = require("../../../scripts/firebase-config");
const { doc, getDoc, updateDoc, arrayUnion } = require("firebase/firestore")

const index = async (req, res) => {
    switch (req.method) {
        case "POST":
            const { title, todo_id } = JSON.parse(req.body);
            if (!title) return res.json({ message: "Subtask Title is required" })
            if (!todo_id) return res.json({ message: "Todo Title is required" })

            const taskRef = doc(db, "tasks", todo_id)
            let exists = (await getDoc(taskRef)).data()
            if (!exists) return res.json({ message: "Task does not exists" })
            let subtaskExists = exists.subtasks.some((e) => e.title == title)
            if (subtaskExists) return res.json({ message: "Subtask already exists" })
            try {
                await updateDoc(taskRef, {
                    status: false,
                    subtasks: arrayUnion({
                        title,
                        status: false
                    })
                });
                return res.status(200).json({ message: "Subtask Added" })
            } catch (e) {
                return res.send(e)
            }

        default:
            res.status(200).json({ message: 'You just tried to access this route with a method does not exist' })
    }
}

export default index