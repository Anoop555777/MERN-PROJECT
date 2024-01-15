import ButtonIcon from "./../ui/ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDark } from "./../store/DarkModeContext";
const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkModeHandler } = useDark();
  return (
    <ButtonIcon onClick={toggleDarkModeHandler}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
