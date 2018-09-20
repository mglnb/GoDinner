import React from "react";
// import 'from "./sales.less";
import { color } from "./colors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Sales(props) {
  return (
    <div className={"sales"}>
      <div className={"title"}>{props.title}</div>
      <ResponsiveContainer minHeight={360}>
        <LineChart data={props.data}>
          <Legend
            verticalAlign="top"
            content={props => {
              const { payload } = props;
              return (
                <ul className={"legend clearfix"}>
                  {payload.map((item, key) => (
                    <li key={key}>
                      <span
                        className={"radiusdot"}
                        style={{ background: item.color }}
                      />
                      {item.value}
                    </li>
                  ))}
                </ul>
              );
            }}
          />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: color.borderBase, strokeWidth: 1 }}
            tickLine={false}
          />
          <YAxis axisLine={false} tickLine={false} />
          <CartesianGrid
            vertical={false}
            stroke={color.borderBase}
            strokeDasharray="3 3"
          />
          <Tooltip
            wrapperStyle={{
              border: "none",
              boxShadow: "4px 4px 40px rgba(0, 0, 0, 0.05)"
            }}
            content={content => {
              const list = content.payload.map((item, key) => (
                <li key={key} className={"tipitem"}>
                  <span
                    className={"radiusdot"}
                    style={{ background: item.color }}
                  />
                  {item.name + ": " + item.value}
                </li>
              ));
              return (
                <div className={"tooltip"}>
                  <p className={"tiptitle"}>{content.label}</p>
                  <ul>{list}</ul>
                </div>
              );
            }}
          />
          {props.labels.map((label,index) => {
            return <Line
              type="monotone"
              key={index}
              dataKey={label.name}
              stroke={label.color}
              strokeWidth={3}
              dot={{ fill: label.color }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />;
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Sales;
