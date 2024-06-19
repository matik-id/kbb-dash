import { Box, useBreakpointValue, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import {
  PieChart as MyPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector,
} from "recharts";

const renderPercentLabel = ({
  x,
  y,
  fill,
  percent,
  textAnchor,
}: any) => {
  return (
    <text x={x} y={y} fill={fill} textAnchor={textAnchor}>
     {`${(percent * 100).toFixed(0)}%`}
     </text>
  );
};

const renderCustomLabel = ({
  x,
  y,
  label,
  fill,
  value,
  textAnchor,
} : any) => {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={textAnchor}
    >
      {label + " : " + value}
    </text>
  );
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, midAngle } =
    props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 105) * cos;
  const sy = cy + (outerRadius - 105) * sin;
  return (
    <Sector
      cx={sx}
      cy={sy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill="#8884d8"
    />
  );
};

interface PieChartProps {
  labelPercent?: boolean,
  data: {
    color: string;
    name?: string;
    label: string;
    value: number;
    point?: number;
  }[];
}
const PieChart = ({ labelPercent, data }: PieChartProps) => {
  const radius = useBreakpointValue({ base: 90, xs: 100, md: 110 });
  const [activeIndex, setActiveIndex] = useState(null);
  const onMouseOver = useCallback((data: any, index: any) => {
    setActiveIndex(index);
  }, []);
  const onMouseLeave = useCallback((data: any, index: any) => {
    setActiveIndex(null);
  }, []);

  return (
    <Box className="etle-pie-chart">
      <ResponsiveContainer width="100%" height={350}>
        <MyPieChart>
          <Pie
            activeIndex={activeIndex}
            data={data}
            outerRadius={radius}
            dataKey="value"
            label={ labelPercent ? renderPercentLabel : renderCustomLabel }
            activeShape={renderActiveShape}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          >
            {data.map(({ color }, i) => (
              <Cell key={`cell-${i}`} fill={color} />
            ))}
          </Pie>
          <Legend />
        </MyPieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChart;
