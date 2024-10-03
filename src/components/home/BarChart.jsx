import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import CustomXAxis from "./CustomAxis"

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

export const description = "A bar chart with a label"

const calculateChartData = (transactionsData) => {
  const categoryMap = {};

  transactionsData.forEach((transaction) => {
    const { category, amount } = transaction;
    if (!categoryMap[category] && category!=="Wallet-Deposit" && category!=="Refund") categoryMap[category] = 0;    
    if(category!=="Wallet-Deposit" && category!=="Refund") categoryMap[category] += amount;
  });

  const chartData = Object.keys(categoryMap).map((category) => ({
    category,
    amount: categoryMap[category],
  }));

  return chartData;
};

const createChartConfig = (chartData) => {
  const chartConfig = {};

  chartData.forEach(({ category }, index) => {
    chartConfig[category.toLowerCase()] = {
      label: category,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });  

  return chartConfig;
};

export function ExpenseBarChart({isLoading, isError, transactionsData}) {

  const chartData = transactionsData ? calculateChartData(transactionsData) : [];
  const chartConfig = createChartConfig(chartData);

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error in Loading Transactions ...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment-Category Analysis</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          className="mx-auto aspect-square"
          config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <CustomXAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
