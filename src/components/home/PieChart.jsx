"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const calculateChartData = (transactionsData) => {
  const modeMap = {};

  transactionsData.forEach((transaction) => {
    const { mode, amount, category } = transaction;
    if (!modeMap[mode]) modeMap[mode] = 0;    
    if(category!=='Wallet-Deposit' && category!=='Refund') modeMap[mode] += amount;
  });

  const chartData = Object.keys(modeMap).map(mode => ({
    mode,
    amount: modeMap[mode],
    fill: `var(--color--${mode.toLowerCase()},#61a8fa)`
  }));

  return chartData;
};

const createChartConfig = (chartData) => {
  const chartConfig = {};

  chartData.forEach(({ mode }, index) => {
    chartConfig[mode.toLowerCase()] = {
      label: mode,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return chartConfig;
};

export function ExpensePieChart({isLoading, isError, transactionsData}) {  

  const chartData = transactionsData ? calculateChartData(transactionsData) : [];
  const chartConfig = createChartConfig(chartData);
  const totalAmount = chartData.reduce((acc, curr) => acc + curr.amount, 0);

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error in Loading Transactions ...</div>
  
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Payment-Mode Analysis</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="mode"
              innerRadius={90}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Amount
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
