import React from 'react'
const { db } = require("../../../scripts/firebase-config");
const { collection, query, getDocs, addDoc } = require("firebase/firestore")

const index = async (req, res) => {
    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);
    switch (req.method) {
        case "GET":
            let tasks = []
            querySnapshot.forEach((doc) => {
                if (Object.keys(doc.data()).length !== 0) {
                    tasks.push(doc.data());
                }
            });
            return res.send(tasks);
        case "POST":
            const { title } = req.body;
            if (!title) return res.json({ message: "Title is required" })
            let titles = []
            querySnapshot.forEach((doc) => {
                titles.push(doc.data().title);
            });
            let exists = titles.some((i) => i == title)
            if (exists) return res.json({ message: "Task already exists" })
            const payload = {
                title,
                status: false,
                created_at: (new Date()).getTime(),
                subtasks: []
            }
            try {
                await addDoc(collection(db, "tasks"), {
                    ...payload
                })
                return res.status(200).json({ message: "Task Added" })
            } catch (e) {
                return res.send(e)
            }

        default:
            res.status(200).json({ message: 'You just tried to access this route with a method does not exist' })
    }
}

export default index