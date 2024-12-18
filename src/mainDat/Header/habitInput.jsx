import { HabitContext } from "../../store/habitContext";
import { useContext } from "react";
export default function Inp() {
  let cx = useContext(HabitContext);
  let name = cx.hbName;

  return (
    <input
      type="text"
      ref={name}
      maxLength={25}
      placeholder="Enter Activity/Habit Name"
    />
  );
}
