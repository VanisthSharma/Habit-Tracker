import { useReducer, useRef } from "react";
import Main from "./mainDat/MainData";
import { HabitContext } from "./store/habitContext";

function HabitSReducer(hArr, action) {
  let newArr = hArr;
  if (action.type === "NEW_ITEM") {
    newArr = [
      ...newArr,
      {
        Name: action.payload.name,
        Date: action.payload.date,
        FromTime: action.payload.from,
        ToTime: action.payload.to,
      },
    ];
  } else if (action.type === "DELETE_ITEM") {
    newArr = newArr.filter((_, x) => x !== action.payload.idx);
  }
  return newArr;
}

function App() {
  let date = useRef("");
  let fromTime = useRef("");
  let toTime = useRef("");
  let hbName = useRef("");

  const [habitArr, dispatchNewObj] = useReducer(HabitSReducer, []);

  const AddFunc = (name, date, from, to) => {
    const newObj = {
      type: "NEW_ITEM",
      payload: {
        name,
        date,
        from,
        to,
      },
    };
    dispatchNewObj(newObj);
  };

  const DelFunc = (idx) => {
    const newObj = {
      type: "DELETE_ITEM",
      payload: {
        idx,
      },
    };
    dispatchNewObj(newObj);
  };

  return (
    <HabitContext.Provider
      value={{
        hbName,
        date,
        fromTime,
        toTime,
        habitArr,
        AddFunc,
        DelFunc,
      }}
    >
      <Main />
    </HabitContext.Provider>
  );
}

export default App;
