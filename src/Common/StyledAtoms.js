import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
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
  @media (max-width: 580px) {
    max-height: 750px;
  }
`;

export const AboutMeButtonContainer = styled.button`
  --btn-color: #008080;
  --btn-bg: #FFFDD0;
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

export const NavButtonContainer = styled.button`
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 22px;
  font-weight: 600;
  font-size: 1rem;
  transition: 0.3s;
  &:hover {
    color: #FFFDD0;
  }
`

