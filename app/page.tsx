"use client"

import { useEffect, useState } from "react"
import {
  collection,
  doc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"
import app from "lib/firebase"

import { Data } from "@/types/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Chart } from "@/components/chart"
import Status from "@/components/status"

export default function IndexPage() {
  const [data, setData] = useState<Data[]>([])
  useEffect(() => {
    const db = getFirestore(app)
    const q = query(
      collection(db, "data"),
      orderBy("date", "desc"),
      limit(10 * 24)
    )
    const unsub = onSnapshot(q, (docs) => {
      const curData: Data[] = []
      docs.forEach((d) => {
        const { date, humidity, light, soil } = d.data()
        const cur = new Date(date)
        curData.push({
          date: `${cur.getHours()}:${cur.getMinutes()}`,
          humidity,
          light,
          soil,
        })
      })
      setData(curData.reverse())
    })
    return () => unsub()
  }, [])
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col justify-center items-center gap-2 ">
        <h1 className="text-3xl font-display font-extrabold leading-tight text-center tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          กิตติภัทร ภูศิริ FC
        </h1>
        <div className="flex w-full flex-col items-center justify-center">
          <Status />
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col w-full max-w-3xl space-y-8">
          <Card className="w-full p-4">
            <Chart item="humidity" header="Humidity" raw={data} />
          </Card>
          <Card className="w-full p-4">
            <Chart item="soil" header="Soil" raw={data} />
          </Card>
          <Card className="w-full p-4">
            <Chart item="light" header="Light" raw={data} />
          </Card>
        </div>
      </div>
      {/* <div className="flex flex-row gap-4 items-center justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div> */}
    </section>
  )
}
