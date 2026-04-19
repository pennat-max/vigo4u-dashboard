'use client'
// components/dashboard/StatusChart.tsx

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getStatusConfig, STATUS_CHART_COLORS } from '@/lib/utils'

interface StatusChartProps {
  data: Record<string, number>
}

export default function StatusChart({ data }: StatusChartProps) {
  const chartData = Object.entries(data).map(([status, count]) => ({
    name: getStatusConfig(status).label,
    value: count,
    status,
    fill: STATUS_CHART_COLORS[status] ?? '#94a3b8',
  }))

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">สถานะรถ</h3>
        <div className="flex items-center justify-center h-40 text-gray-400 text-sm">ไม่มีข้อมูล</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">สถานะรถ</h3>
      <p className="text-xs text-gray-400 mb-3">จำนวนรถแยกตามสถานะ</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [value + ' คัน', name]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span style={{ fontSize: 11, color: '#6b7280' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
