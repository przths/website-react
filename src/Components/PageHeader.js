import HomeHeader from "./Header/Header";
import { useState, useEffect, } from "react";
import { HomePageContainer } from "../Common/StyledAtoms";
import { APPLICATION_DARKMODE_KEY } from "../Common/Constants";

const PageHeader = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        JSON.parse(window.sessionStorage.getItem(APPLICATION_DARKMODE_KEY)) || false
    );
    const [textColor, setTextColor] = useState();
    const [backgroundColor, setBackgroundColor] = useState();

    useEffect(() => {
		if (darkMode) {
			setTextColor("#ffffff");
			setBackgroundColor("#2b3036");
		} else {
			setTextColor("#2b3036");
			setBackgroundColor("#ffffff");
		}
        window.sessionStorage.setItem(APPLICATION_DARKMODE_KEY, darkMode);
	}, [darkMode]);

    return (
        <HomePageContainer textColor={textColor} backgroundColor={backgroundColor}>
            <HomeHeader textColor={textColor} setDarkMode={setDarkMode} />
            {children}
        </HomePageContainer>
    );
};

export default PageHeader;
