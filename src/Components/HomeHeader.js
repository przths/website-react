import { 
  Nav,
  Navbar,
  Container 
} from 'react-bootstrap';
import CloudMe from "../Images/cloudme.png";
import {  
  NavButtonContainer,
  AboutMeButtonContainer
} from '../Common/StyledAtoms';

const NavButton = (props) => {
  let onClick = props.onClick;
  return (
    <Nav.Link class="me-3">
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

const HomeHeader = () => {
    return (
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={CloudMe}
              width="75"
              height="75"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="align-middle justify-content-end">
            <NavButton onClick={() => alert('clicked!')}>Portfolio</NavButton>
            <NavButton>Blog</NavButton>
            <NavButton>Resume</NavButton>
            <AboutMeButton>About me</AboutMeButton>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default HomeHeader;
