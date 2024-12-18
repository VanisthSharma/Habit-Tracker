import css from "./Main.module.css";
import Header from "./Header/Header";
import NewHabits from "./newHabits/newHabits";
export default function Main() {
  return (
    <>
      <div className={css.holder}>
        <h1 className={css.h1}> Habit Formatter App </h1>
      </div>
      <Header />
      <NewHabits />
    </>
  );
}
