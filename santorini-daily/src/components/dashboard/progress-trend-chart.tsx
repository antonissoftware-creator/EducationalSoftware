"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function ProgressTrendChart({ scores }: { scores: Array<{ label: string; score: number }> }) {
  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer>
        <BarChart data={scores} barGap={6}>
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, 100]} />
          <Bar dataKey="score" fill="#0b4f7d" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
