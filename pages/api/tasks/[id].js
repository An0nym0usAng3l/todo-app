import React from 'react'
const { db } = require("../../../scripts/firebase-config");
const { doc, setDoc, getDoc } = require("firebase/firestore")

const index = async (req, res) => {
    switch (req.method) {
        case "PATCH":
            const docId = req.query.id
            const { status } = JSON.parse(req.body);
            if (!docId) return res.json({ message: "Task Id is required" })

            const docRef = doc(db, "tasks", docId)
            let docData = (await getDoc(docRef)).data()
            if (!docData) return res.json({ message: "Task does not exist" })
            docData.status = status
            docData.subtasks.map((e) => {
                e.status = status
            })

            try {
                await setDoc(docRef, {
                    ...docData
                });
                return res.status(200).json({ message: "Status Updated" })
            } catch (e) {
                return res.send(e)
            }

        default:
            res.status(405).json({ message: 'You just tried to access this route with a method does not exist' })
    }
}

export default index