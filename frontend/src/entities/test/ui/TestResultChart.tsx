"use client"

import type { TestResult } from "@/entities/test/model/types"
import type { ChartConfig } from "@/shared/ui/chart"

import { useTranslations } from "next-intl"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import { ChartContainer } from "@/shared/ui/chart"

const chartConfig: ChartConfig = {
  score: {
    label: "Score",
    color: "var(--color-navy)",
  },
}

interface CategoryTickProps {
  x: number | string
  y: number | string
  textAnchor: string
  payload: { value: string }
}

function CategoryTick({ x, y, textAnchor, payload }: CategoryTickProps) {
  const isTop = textAnchor === "middle"

  return (
    <text
      x={Number(x)}
      y={Number(y) + (isTop ? 0 : 20)}
      textAnchor="middle"
      className="fill-navy text-lg font-bold"
    >
      {payload.value}
    </text>
  )
}

export function TestResultChart({ scores }: { scores: TestResult["scores"] }) {
  const t = useTranslations("test.categories")
  const data = Object.entries(scores).map(([category, score]) => ({
    category: t(category),
    score,
  }))

  return (
    <ChartContainer
      config={chartConfig}
      className="pointer-events-none mx-auto -mb-8 aspect-square max-h-96 w-full min-w-0"
      initialDimension={{ width: 320, height: 320 }}
    >
      <RadarChart
        data={data}
        outerRadius="90%"
        margin={{ top: 10, right: 24, bottom: 10, left: 24 }}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="category" tick={CategoryTick} />
        <Radar
          dataKey="score"
          fill="var(--color-score)"
          fillOpacity={0.5}
          stroke="var(--color-score)"
          dot={false}
        />
      </RadarChart>
    </ChartContainer>
  )
}
