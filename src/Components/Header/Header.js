import ReactGA from "react-ga4";
import { 
  Nav,
  Navbar,
  Container,
  NavDropdown, 
} from 'react-bootstrap';
import CloudMe from "../../Images/cloudme.png";
import {  
	SimpleButton,
} from '../../Common/StyledAtoms';
import { useNavigate } from 'react-router-dom';
import { ABOUT_ME_PAGE_URL, BLOG_PAGE_URL, HOME_PAGE_URL, PORTFOLIO_PAGE_URL, RESUME_PAGE_URL } from '../../Common/Constants';
import { isMobileDevice, navigateWithAnalytics } from '../../Common/Utils';

const NavButton = (props) => {
	const specifiedPath = props.pathname;
  const navigate = useNavigate();
	return (
		<Nav.Link className='my-auto'>
			<SimpleButton onClick={navigateWithAnalytics(specifiedPath, navigate)} {...props}>
				{ props.text }
			</SimpleButton>
		</Nav.Link>
	);
}

const navDropdownButtons = (navigate) => 
  <NavDropdown
    id="nav-dropdown"
    title="Explore"
    menuVariant="dark"
    className="ms-auto m-2"
    align="end"
  >
    <NavDropdown.Item onClick={navigateWithAnalytics(HOME_PAGE_URL, navigate)}>
      Home
    </NavDropdown.Item>
    <NavDropdown.Item onClick={navigateWithAnalytics(PORTFOLIO_PAGE_URL, navigate)}>
      Portfolio
    </NavDropdown.Item>
    <NavDropdown.Item onClick={navigateWithAnalytics(BLOG_PAGE_URL, navigate)}>
      Blog
    </NavDropdown.Item>
    <NavDropdown.Item onClick={navigateWithAnalytics(RESUME_PAGE_URL, navigate)}>
      Resume
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item onClick={navigateWithAnalytics(ABOUT_ME_PAGE_URL, navigate)}>
      About me
    </NavDropdown.Item>
  </NavDropdown>

const navButtons = ({ textColor }) => 
  <>
    <NavButton
      text="Home"
      textColor={textColor}
      pathname={HOME_PAGE_URL}
    />
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
  </>

const HomeHeader = ({ textColor, setDarkMode }) => {
  const navigate = useNavigate();
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
          { isMobileDevice() ? navDropdownButtons(navigate) : navButtons({ textColor }) }
        </Nav>
      </Container>
    </Navbar>
  );
}

export default HomeHeader;
