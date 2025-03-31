import ReactGA from "react-ga4";
import { 
  Nav,
  Navbar,
  Container, 
} from 'react-bootstrap';
import CloudMe from "../../Images/cloudme.png";
import {  
	SimpleButton,
} from '../../Common/StyledAtoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { ABOUT_ME_PAGE_URL, BLOG_PAGE_URL, HOME_PAGE_URL, PORTFOLIO_PAGE_URL, RESUME_PAGE_URL } from '../../Common/Constants';
import { isMobileDevice } from '../../Common/Utils';

const NavButton = (props) => {
	const navigate = useNavigate();
  const location = useLocation();
	const specifiedPath = props.pathname;
	const urlPathname = location.pathname;

  let onClick;
  let homePathSet = false;
	if (urlPathname === specifiedPath) {
    homePathSet = true;
		onClick = () =>  navigate(HOME_PAGE_URL);
	} else {
		onClick = () => navigate(specifiedPath);
	}

  const clickWithAnalytics = () => {
    ReactGA.event({
      category: "Navigation Bar",
      action: "Navigation_Bar_Click",
      label: homePathSet ? HOME_PAGE_URL : specifiedPath,
    });
    onClick();
  }

	return (
		<Nav.Link className='my-auto'>
			<SimpleButton onClick={clickWithAnalytics} {...props}>
				{homePathSet ? 'Home' : props.text}
			</SimpleButton>
		</Nav.Link>
	);
}

const HomeHeader = ({ textColor, setDarkMode }) => {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand>
            <img
              src={CloudMe}
              onClick={() => setDarkMode((darkMode) => !darkMode)}
              width="75"
              height="75"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className={`${isMobileDevice() ? 'flex-fill justify-content-center' : 'justify-content-end '}`}>
            <NavButton
                text="Portfolio"
                textColor={textColor}
                pathname={PORTFOLIO_PAGE_URL}
            />
            <NavButton
                text="Blog"
                textColor={textColor}
                pathname={BLOG_PAGE_URL}
            />
            <NavButton
                text="Resume"
                textColor={textColor}
                pathname={RESUME_PAGE_URL}
            />
            <NavButton
                text="About me"
                textColor={textColor}
                pathname={ABOUT_ME_PAGE_URL}
            />
          </Nav>
        </Container>
      </Navbar>
    );
}

export default HomeHeader;
