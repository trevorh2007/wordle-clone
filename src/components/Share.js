import { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const ShareContainer = styled.div`
    padding-left: 30px;
`;
const ShareButton = styled.div`
    user-select: none;
    padding: 5px 15px;
    background: #538d4e;
    border-radius: 3px;
    color: #fff;
    font-weight: 600;
    &:hover {
        cursor: pointer;
    }
`;

const Share = () => {
    const [showModal, setShowModal] = useState(false)

    const afterOpenModal = () => {
        // generate the wordle game tiles to share!
    }

    return (
        <>
            <ShareContainer>
                <ShareButton onClick={() => setShowModal(true)}>
                    Share
                </ShareButton>
            </ShareContainer>
            <Modal
                isOpen={showModal}
                onAfterOpen={afterOpenModal()}
                className="Modal"
                overlayClassName="Overlay"
                onRequestClose={() => setShowModal(false)}
            >
                Share stuff goes here
            </Modal>
        </>
    )
}

export default Share;