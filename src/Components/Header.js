import { 
  Nav,
  Navbar,
  Container, 
} from 'react-bootstrap';
import CloudMe from "../Images/cloudme.png";
import {  
	SimpleButton,
  	AboutMeButtonContainer
} from '../Common/StyledAtoms';
import { useNavigate } from 'react-router-dom';
import { BASELINE_URL, BLOG_PAGE_URL, HOME_PAGE_URL, PORTFOLIO_PAGE_URL, RESUME_PAGE_URL } from '../Common/Constants';

const NavButton = (props) => {
	const navigate = useNavigate();
	let onClick;
	const specifiedPath = props.pathname;
	const urlPathname = window.location.pathname;
    let homePathSet = false;
	if (urlPathname === BASELINE_URL + specifiedPath) {
        homePathSet = true;
		onClick = () => navigate(HOME_PAGE_URL);
	} else {
		onClick = () => navigate(specifiedPath);
	}
	return (
		<Nav.Link className='my-auto'>
			<SimpleButton onClick={onClick} {...props}>
				{homePathSet ? 'Home' : props.text}
			</SimpleButton>
		</Nav.Link>
	);
}

const AboutMeButton = (props) => {
	let onClick = props.onClick;
	return (
		<Nav.Link>
			<AboutMeButtonContainer onClick={onClick} {...props}/>
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
          <Nav className="align-middle justify-content-end">
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
            <AboutMeButton>About me</AboutMeButton>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default HomeHeader;
