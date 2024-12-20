import css from "./headeritems.module.css";
import { HabitContext } from "../../store/habitContext";
import { useContext } from "react";
export default function Inp() {
  let cx = useContext(HabitContext);
  let name = cx.hbName;

  return (
    <div className={css.selectHolder}>
      <input
        type="text"
        ref={name}
        maxLength={25}
        placeholder="Enter Activity/Habit Name"
      />
    </div>
  );
}
