import React from 'react'
import { XAxis } from 'recharts';

const CustomXAxis = ({
    dataKey = "month", 
    tickLine = false, 
    tickMargin = 10, 
    axisLine = false, 
    tickFormatter = (value) => value.slice(0, 3),
  }) => {
    return (
      <XAxis
        dataKey={dataKey}
        tickLine={tickLine}
        tickMargin={tickMargin}
        axisLine={axisLine}
        tickFormatter={tickFormatter}
      />
    );
  }

  export default CustomXAxis