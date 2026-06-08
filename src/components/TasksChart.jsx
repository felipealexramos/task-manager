import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useGetTasksSummary } from "../hooks/use-get-tasks-summary"

const STATUS_COLORS = {
  "Não iniciadas": "#FFAA04",
  "Em andamento": "#00ADB5",
  Concluídas: "#22c55e",
}

const TasksChart = () => {
  const { notStarted, inProgress, done } = useGetTasksSummary()

  const data = [
    { label: "Não iniciadas", total: notStarted },
    { label: "Em andamento", total: inProgress },
    { label: "Concluídas", total: done },
  ]

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} barSize={40}>
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "#9A9C9F" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: "#9A9C9F" }}
          axisLine={false}
          tickLine={false}
          width={24}
        />
        <Tooltip
          cursor={{ fill: "#F8F8F8" }}
          formatter={(value) => [value, "Tarefas"]}
        />
        <Bar dataKey="total" radius={[6, 6, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.label} fill={STATUS_COLORS[entry.label]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default TasksChart
