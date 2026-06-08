import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
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
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={2}
        >
          {data.map((entry) => (
            <Cell key={entry.label} fill={STATUS_COLORS[entry.label]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [value, "Tarefas"]} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: "#9A9C9F" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default TasksChart
