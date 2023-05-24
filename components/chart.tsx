import { useMemo } from "react"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"

import { Data } from "@/types/data"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartProps {
  item: keyof Data
  header: string
  raw: Data[]
}

const Chart = ({ item, header, raw }: ChartProps) => {
  const labels = useMemo(() => {
    return raw.map((d) => d.date)
  }, [raw])
  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: `${header} Chart`,
        },
      },
    }
  }, [header])
  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: header,
          data: raw.map((d) =>
            d[item] === undefined ? 0 : d[item] === null ? 0 : d[item]
          ),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          cubicInterpolationMode: "monotone",
          tension: 0.4,
        },
      ],
    }
  }, [raw, item, labels])
  return <Line options={options} data={data as any} />
}
export { Chart }
