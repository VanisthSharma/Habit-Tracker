import { useContext, useEffect, useReducer } from "react";
import { HabitContext } from "../../store/habitContext";
import css from "./newHabits.module.css";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

function reduceEdit(state, action) {
  if (action.type === "RENEW_ITEM") {
    if (state.includes(action.payload.idx)) {
      return state.filter((x) => x !== action.payload.idx);
    } else {
      return [...state, action.payload.idx];
    }
  }
  return state;
}

function reduceArr(state, action) {
  switch (action.type) {
    case "UPDATE":
      return action.payload.habitArr;
    case "EDIT_HABIT":
      return state.map((habit, idx) =>
        idx === action.payload.idx
          ? { ...habit, [action.payload.field]: action.payload.value }
          : habit
      );
    default:
      return state;
  }
}

export default function NewHabits() {
  const CTX = useContext(HabitContext);
  const DelFunc = CTX.DelFunc;
  const habitArr = CTX.habitArr;
  const [editing, dispatchEditing] = useReducer(reduceEdit, []);
  const [localHabits, dispatchLocalHabits] = useReducer(reduceArr, habitArr);

  useEffect(() => {
    dispatchLocalHabits({ type: "UPDATE", payload: { habitArr } });
  }, [habitArr]);

  const handleChange = (e, idx, field) => {
    dispatchLocalHabits({
      type: "EDIT_HABIT",
      payload: {
        idx,
        field,
        value: e.target.value,
      },
    });
  };

  const renewEdit = (idx) => {
    dispatchEditing({
      type: "RENEW_ITEM",
      payload: { idx },
    });
  };

  return (
    <div>
      {localHabits.length > 0 ? (
        localHabits.map((x, idx) =>
          editing.includes(idx) ? (
            <div key={idx} className={css.editHolder}>
              <input
                type="text"
                placeholder="Enter Habit Name"
                maxLength={25}
                value={x.Name}
                onChange={(e) => handleChange(e, idx, "Name")}
              />
              <input
                type="date"
                value={x.Date}
                onChange={(e) => handleChange(e, idx, "Date")}
              />
              <input
                type="time"
                value={x.FromTime}
                onChange={(e) => handleChange(e, idx, "FromTime")}
              />
              <input
                type="time"
                value={x.ToTime}
                onChange={(e) => handleChange(e, idx, "ToTime")}
              />
              <div className={css.newHolder}>
                <button onClick={() => renewEdit(idx)} className={css.editBtn}>
                  <FaSave />
                </button>
                <button className={css.delBtn} onClick={() => DelFunc(idx)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ) : (
            <div key={idx} className={css.newHolder}>
              <p>{x.Name.length > 0 ? x.Name : "Not defined"}</p>
              <p>{x.Date.length > 0 ? x.Date : "Not defined"}</p>
              <p>{x.FromTime}</p>
              <p>{x.ToTime}</p>
              <button onClick={() => renewEdit(idx)} className={css.editBtn}>
                <FaPen />
              </button>
              <button className={css.delBtn} onClick={() => DelFunc(idx)}>
                <MdDelete />
              </button>
            </div>
          )
        )
      ) : (
        <div className={css.newHolder}>
          <h1>Add Habit</h1>
        </div>
      )}
    </div>
  );
}
