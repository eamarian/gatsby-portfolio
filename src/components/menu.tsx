import React, { useState } from "react";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

interface Props {
  menuOpen: boolean;
}

const StyledModal = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: lightgrey;
  transition: height 1s;
  height: ${(props) => (props.menuOpen ? "100%" : 0)};
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledList = styled.ol<Props>`
  transition: opacity;
  transition-duration: "5s";
  transition-delay: "1s";
  opacity: ${(props) => (props.menuOpen ? 1 : 0)};
`;

const StyledHamburgerButton = styled.button<Props>`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    width: 30px;
    height: 24px;
    position: relative;
    border: none;
    background-color: transparent;
    cursor: pointer;
    z-index: 2;
  }

  .ham-box-line {
    right: 0;
    border: 1px solid black;
    width: 100%;
    transition-duration: 0.22s;

    :first-child {
      width: ${(props) => (props.menuOpen ? "100%" : "80%")};
      transform: ${(props) =>
        props.menuOpen ? "TranslateY(10px) rotate(-225deg)" : ""};
    }
    :not(:first-child):not(:last-child) {
      opacity: ${(props) => (props.menuOpen ? 0 : 1)};
      transform: rotate(${(props) => (props.menuOpen ? "360deg" : "0deg")});
    }
    :last-child {
      width: ${(props) => (props.menuOpen ? "100%" : "120%")};
      transform: ${(props) =>
        props.menuOpen ? "TranslateY(-10px) rotate(225deg)" : ""};
    }
  }
`;

export default (): React.ReactElement => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    if (menuOpen) {
      document.body.classList.add("no-overflow");
    } else {
      document.body.classList.remove("no-overflow");
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <StyledMenu>
      <StyledModal menuOpen={menuOpen}>
        <StyledList menuOpen={menuOpen}>
          <li>Link 1</li>
          <li>Link 2</li>
        </StyledList>
      </StyledModal>
      <StyledHamburgerButton onClick={toggleMenu} menuOpen={menuOpen}>
        <span className="ham-box-line" />
        <span className="ham-box-line" />
        <span className="ham-box-line" />
      </StyledHamburgerButton>
    </StyledMenu>
  );
};
