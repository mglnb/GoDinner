import React from "react";
import { Card } from "antd";
import { Icon } from "semantic-ui-react";
import CountUp from "react-countup";
// import styles from "./numberCard.less";

function NumberCard(props) {
  const { icon, color, title, number } = props;
  return (
    <Card className={"numberCard"}  bordered={false} bodyStyle={{ padding: 0 }}>
      <Icon className={"iconWarp"} style={{ color }} name={icon} />
      <div className={"content"}>
        <p className={"title"}>{title || "No Title"}</p>
        <p className={"number"}>
        {props.currency && "R$ "}
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            useGrouping
            separator="."
            {...props.countUp || {}}
          />
        </p>
      </div>
    </Card>
  );
}

export default NumberCard;
