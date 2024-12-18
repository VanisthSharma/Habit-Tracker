import css from "./headerItems.module.css";
import { HabitContext } from "../../store/habitContext";
import { useContext } from "react";

export default function Date() {
  let date = useContext(HabitContext);
  let mainDate = date.date;
  return (
    <div className={css.mainHolder}>
      <p>Date:</p>
      <input type="date" ref={mainDate} />
    </div>
  );
}
