import styled from 'styled-components';

export const HomePageContainer = styled.div`
  transition: background-color 0.5s ease;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  width: 100vw;
  height: auto;
`

export const HeaderContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  text-align: center;
  margin-top: 50px;
  padding: 10px;
  width: 90%;
  height: auto;
  border-radius: 25px;
  background-color: rgba(248,249,250,255);
  box-shadow: 12px 12px 12px 8px rgba(0,0,0,0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 24px 24px 24px 0px rgba(0,0,0,0.2);
  }
`;

export const AboutMeButtonContainer = styled.button`
  --btn-color: #212121;
  --btn-bg: #1db954;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: var(--btn-bg);
  color: var(--btn-color);
  padding: 10px 20px;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid var(--btn-color);
  transition: 0.3s;
  box-shadow: 5px 5px 0 0 var(--btn-color);
  &:hover {
    box-shadow: 2px 2px 0 0 var(--btn-color);
  }
`

export const SimpleButton = styled.button`
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
  transition: 0.3s;
  color: ${props => props.textColor};
  &:hover {
    color: #1db954;
  }
  @media (min-width: 500px) {
    padding: 14px 22px;
  }
`

export const SimpleButtonSelect = styled.button`
    background: none;
    border: none;
    padding: 0px;
    text-align: left;
    font-size: 1rem;
    cursor: pointer;
    color: ${props => props.textColor};
    &:hover {
        color: #000000;
        font-weight: 600;
    }   
`
