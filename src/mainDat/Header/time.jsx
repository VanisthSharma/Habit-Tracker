import css from "./headerItems.module.css";
import { useContext } from "react";
import { HabitContext } from "../../store/habitContext";

export default function Time() {
  let CTX = useContext(HabitContext);
  let fromTime = CTX.fromTime;
  let toTime = CTX.toTime;

  return (
    <div className={css.mainHolder}>
      <div className={css.selectHolder}>
        <p>From:</p>
        <input type="time" ref={fromTime} />
      </div>
      <div className={css.selectHolder}>
        <p>To:</p>
        <input type="time" ref={toTime} />
      </div>
    </div>
  );
}
