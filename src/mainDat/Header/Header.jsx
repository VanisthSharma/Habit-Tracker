import Time from "./time";
import Add from "./addbtn";
import Date from "./date";
import Inp from "./habitInput";
import css from "./headerItems.module.css";
export default function Header() {
  return (
    <div className={`${css.mainHolder} ${css.head}`}>
      <Inp />
      <Date />
      <Time />
      <Add />
    </div>
  );
}
