import styled from "styled-components";

const HardModeContainer = styled.div`
    width: 190px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 30px;
`;
const ToggleSwitch = styled.div`
    display: flex;
    justify-content: space-between;
    user-select: none;
    border: 1px solid #fff;
    width: 85px;
    font-weight: 600;
    text-align: center;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
    }
`;
const ToggleOff = styled.div`
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 5px 8px;
    color: #fff;
    background: ${props => props.$hard ? '' : 'green'};
    transition: 0.5s all ease;
`;
const ToggleOn = styled.div`
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 5px 8px;
    color: #fff;
    background: ${props => props.$hard ? 'red' : ''};
    transition: 0.5s all ease;
`;

const HardMode = ({ hardMode, setHardMode }) => {

    return (
        <HardModeContainer>
            Hard Mode:
            <ToggleSwitch className="toggle-switch" onClick={() => setHardMode(hardMode => !hardMode)}>
                <ToggleOff className="off" $hard={hardMode}>
                    OFF
                </ToggleOff>
                <ToggleOn className="on" $hard={hardMode}>
                    ON
                </ToggleOn>
            </ToggleSwitch>
        </HardModeContainer>
    )
}

export default HardMode;