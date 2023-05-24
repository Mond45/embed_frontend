import { useEffect, useState } from "react"
import { doc, getFirestore, onSnapshot } from "firebase/firestore"
import app from "lib/firebase"

import { Card } from "./ui/card"

const Status = () => {
  const [status, setStatus] = useState<boolean>(false)
  useEffect(() => {
    const db = getFirestore(app)
    const unsub = onSnapshot(doc(db, "watering", "data"), (doc) => {
      setStatus((doc.data() as any).value)
    })
    return () => unsub()
  }, [])
  return (
    <Card className="mt-4 w-full max-w-sm">
      <div className="flex px-8 py-4 items-center">
        <p className="mr-4">Status: </p>

        <span
          className={`transition w-2 h-2 rounded-full rounded-full ${
            status ? "bg-green-500" : "bg-red-600"
          } mr-2`}
        ></span>
        <p className={status ? "text-green-500" : "text-red-600"}>
          {status ? "you're good" : "need watering"}
        </p>
      </div>
    </Card>
  )
}

export default Status
