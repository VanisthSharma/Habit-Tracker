import { useContext } from "react";
import { HabitContext } from "../../store/habitContext";
import { IoMdAdd } from "react-icons/io";
export default function Add() {
  let CTX = useContext(HabitContext);
  let activity = CTX.hbName;
  let date = CTX.date;
  let fromTime = CTX.fromTime;
  let toTime = CTX.toTime;
  let AddFunc = CTX.AddFunc;
  return (
    <button
      onClick={() =>
        AddFunc(
          activity.current.value,
          date.current.value,
          fromTime.current.value,
          toTime.current.value
        )
      }
    >
      <IoMdAdd />
    </button>
  );
}
