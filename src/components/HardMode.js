import styled from "styled-components";

const HardModeContainer = styled.div`
    width: 130px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 30px;
`;
const ToggleSwitch = styled.div`
    user-select: none;
    color: ${props => props.$toggle ? 'green' : 'red'};
    font-weight: 600;
    &:hover {
        cursor: pointer;
    }
`;

const HardMode = ({ hardMode, setHardMode }) => {

    return (
        <HardModeContainer>
            Hard Mode:
            <ToggleSwitch className="toggle-switch" $toggle={hardMode} onClick={() => setHardMode(hardMode => !hardMode)}>
                {hardMode ? (
                    <div>
                        ON
                    </div>
                ) : (
                    <div>
                        OFF
                    </div>
                )}
            </ToggleSwitch>
        </HardModeContainer>
    )
}

export default HardMode;