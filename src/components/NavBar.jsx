import React from "react";
import styled from "styled-components";

import HardMode from "./HardMode";
import Share from "./Share";

const NavBarContainer = styled.div`
  width: 100%;
  height: 50px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavBar = ({ hardMode, setHardMode }) => {
  return (
    <NavBarContainer>
      <Share />
      <HardMode hardMode={hardMode} setHardMode={setHardMode} />
    </NavBarContainer>
  );
};

export default NavBar;
