import React from "react";
import styled from "styled-components";
import HardMode from './HardMode'

const NavBarContainer = styled.div`
    width: 100%;
    height: 40px;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const NavBar = ({ hardMode, setHardMode, hardModeTiles, setHardModeTiles }) => {
    return (
        <NavBarContainer>
            <HardMode
                hardMode={hardMode}
                setHardMode={setHardMode}
                hardModeTiles={hardModeTiles}
                setHardModeTiles={setHardModeTiles}
            />
        </NavBarContainer>
    )
}

export default NavBar;