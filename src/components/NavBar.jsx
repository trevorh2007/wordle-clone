import React from "react";
import styled from "styled-components";

import HardMode from "./HardMode";
import Stats from "./Stats";
// import Share from "./Share";

const NavBarContainer = styled.div`
  width: 100%;
  min-height: 50px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  gap: 20px;

  @media (max-width: 768px) {
    /* flex-direction: column; */
    padding: 8px 10px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 10px;
    gap: 12px;
  }
`;

const NavBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NavBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NavBar = ({ hardMode, setHardMode }) => {
  return (
    <NavBarContainer>
      <NavBarLeft>
        <Stats />
      </NavBarLeft>
      <NavBarRight>
        {/* <Share /> */}
        <HardMode hardMode={hardMode} setHardMode={setHardMode} />
      </NavBarRight>
    </NavBarContainer>
  );
};

export default NavBar;
