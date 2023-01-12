import React from 'react'
const { db } = require("../../../scripts/firebase-config");
const { doc, setDoc, getDoc } = require("firebase/firestore")

const index = async (req, res) => {
    switch (req.method) {
        case "PATCH":
            const docId = req.query.id
            const { subtask_title, status } = JSON.parse(req.body);
            if (!docId) return res.json({ message: "Task Id is required" })
            if (!subtask_title) return res.json({ message: "Subtask Title is required" })

            const docRef = doc(db, "tasks", docId)
            let data = (await getDoc(docRef)).data()
            if (!data) return res.json({ message: "Task does not exist" })
            if (data.status === true && !status) data.status = false
            let subtaskExists = data.subtasks.some((e) => e.title == subtask_title)
            if (!subtaskExists) return res.json({ message: "Subtask does not exist" })
            data.subtasks.map((e) => {
                if (e.title == subtask_title) { e.status = status }
            })

            try {
                await setDoc(docRef, {
                    ...data
                });
                return res.status(200).json({ message: "Subtask Status Updated" })
            } catch (e) {
                return res.send(e)
            }


        default:
            res.status(200).json({ message: 'You just tried to access this route with a method does not exist' })
    }
}

export default index