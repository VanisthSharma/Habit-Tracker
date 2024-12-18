import { useContext, useState, useEffect, useReducer } from "react";
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

export default function NewHabits() {
  const CTX = useContext(HabitContext);
  const DelFunc = CTX.DelFunc;
  const habitArr = CTX.habitArr;
  const [editing, dispatchEditing] = useReducer(reduceEdit, []);
  const [localHabits, setLocalHabits] = useState(habitArr);

  useEffect(() => {
    setLocalHabits(habitArr);
  }, [habitArr]);

  const handleChange = (e, idx, field) => {
    setLocalHabits((prev) => {
      const newHabits = [...prev];
      newHabits[idx][field] = e.target.value;
      return newHabits;
    });
  };

  const renewEdit = (idx) => {
    const newObj = {
      type: "RENEW_ITEM",
      payload: {
        idx,
      },
    };
    dispatchEditing(newObj);
  };

  return (
    <div>
      {localHabits.length > 0 ? (
        localHabits.map((x, idx) =>
          editing.includes(idx) ? (
            <div key={idx} className={css.newHolder}>
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
              <button onClick={() => renewEdit(idx)} className={css.editBtn}>
                <FaSave />
              </button>
              <button className={css.delBtn} onClick={() => DelFunc(idx)}>
                <MdDelete />
              </button>
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
