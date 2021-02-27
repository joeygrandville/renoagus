import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

const Item = ({ value, label }) => {
  const [{ curr, next, flip }, setState] = useState({ curr: 0, next: 0 });
  useEffect(() => {
    setState((s) => ({ curr: s.next, next: value, flip: false }));
    setTimeout(() => setState((s) => ({ ...s, flip: true })), 50);
  }, [value]);
  return (
    <div className={`time ${flip ? "flip" : ""}`}>
      <span className="count curr top">{curr}</span>
      <span className="count next top">{next}</span>
      <span className="count next bottom">{next}</span>
      <span className="count curr bottom">{curr}</span>
      <span className="label">{label.length < 6 ? label : label.substr(0, 3)}</span>
    </div>
  );
};

const Counter = (props) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) return <span>You are good to go!</span>;
    const items = [
      { label: "días", value: days },
      { label: "horas", value: hours },
      { label: "minutos", value: minutes },
      { label: "segundos", value: seconds },
    ];
    return items.map(({ label, value }) => <Item {...{ key: label, label, value }} />);
  };
  return <Countdown {...{ renderer, ...props }} />;
};

export default Counter;
