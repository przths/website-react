import HomeHeader from "./Header/Header";
import { useContext, } from "react";
import { HomePageContainer } from "../Common/StyledAtoms";
import { ColorContext } from "../Common/Context";

const PageContainer = ({ children, setDarkMode }) => {
  const darkMode = useContext(ColorContext);
  const colorClass = darkMode ? 'white' : 'black';

  return (
    <HomePageContainer textColor={colorClass}>
      <HomeHeader textColor={colorClass} setDarkMode={setDarkMode} />
      {children}
    </HomePageContainer>
  );
};

export default PageContainer;
