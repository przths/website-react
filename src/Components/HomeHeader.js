import { 
  Nav,
  Navbar,
  Container, 
} from 'react-bootstrap';
import CloudMe from "../Images/cloudme.png";
import {  
  NavButtonContainer,
  AboutMeButtonContainer
} from '../Common/StyledAtoms';

const NavButton = (props) => {
  let onClick = props.onClick;
  return (
    <Nav.Link className='my-auto'>
      <NavButtonContainer onClick={onClick} {...props}/>
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
            <NavButton textColor={textColor}>Portfolio</NavButton>
            <NavButton textColor={textColor}>Blog</NavButton>
            <NavButton textColor={textColor}>Resume</NavButton>
            <AboutMeButton textColor={textColor}>About me</AboutMeButton>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default HomeHeader;
