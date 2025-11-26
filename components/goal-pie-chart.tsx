"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

interface GoalPieChartProps {
  invested_amount: number
  total_earnings: number
}

export default function GoalPieChart({ invested_amount, total_earnings }: GoalPieChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const chartData = [
    {
      name: "Amount Invested",
      value: invested_amount,
      fill: "#293895", // Direct color assignment for Amount Invested (blue)
    },
    {
      name: "Total Growth",
      value: total_earnings,
      fill: "#9fcc3a", // Direct color assignment for Total Growth (green)
    },
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg border border-gray-300 shadow-lg">
          <p className="text-sm font-semibold text-gray-800">{payload[0].payload.name}</p>
          <p className="text-sm font-bold text-gray-900">{formatCurrency(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
      <h3 className="text-center text-sm font-medium text-gray-700 mb-6">Goal Setting Calculator - Pie Chart</h3>
      <div className="flex justify-center h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
              label={false}
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="square" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
