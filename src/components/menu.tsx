import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { navLinks } from "../config";

const StyledMenu = styled.div`
  /* display: none; */
  /* @media (max-width: 768px) { */
  display: block;
  /* } */
`;

type StyledCircleProps = {
  isMenuOpen: boolean;
  coordinates: Coordinates;
};

const StyledCircle = styled.div<StyledCircleProps>`
  z-index: 5;
  position: absolute;
  height: ${(props) => (props.isMenuOpen ? "500%" : "0%")};
  width: ${(props) => (props.isMenuOpen ? "500%" : "0%")};
  transition: height 1s ease-out, width 1s ease-out;
  left: ${(props) => props.coordinates.x};
  top: ${(props) => props.coordinates.y};
  background-color: grey;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

type StyledProps = {
  isMenuOpen: boolean;
};

const StyledModal = styled.div<StyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${(props) => (props.isMenuOpen ? 10 : -100)};
  visibility: ${(props) => (props.isMenuOpen ? "1" : "0")};
`;

const StyledList = styled.ol<StyledProps>`
  opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
  transition-property: opacity;
  transition-duration: ${(props) => (props.isMenuOpen ? "1s" : "0s")};
  transition-delay: ${(props) => (props.isMenuOpen ? "0.5s" : "0s")};
`;

const StyledHamburgerButton = styled.button<StyledProps>`
  /* @media (max-width: 768px) { */
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
  z-index: 20;
  /* } */

  .ham-box-line {
    right: 0;
    border: 1px solid black;
    width: 100%;
    transition-duration: 0.22s;

    :first-child {
      width: ${(props) => (props.isMenuOpen ? "100%" : "80%")};
      transform: ${(props) =>
        props.isMenuOpen ? "TranslateY(10px) rotate(-225deg)" : ""};
    }
    :not(:first-child):not(:last-child) {
      opacity: ${(props) => (props.isMenuOpen ? 0 : 1)};
      transform: rotate(${(props) => (props.isMenuOpen ? "360deg" : "0deg")});
    }
    :last-child {
      width: ${(props) => (props.isMenuOpen ? "100%" : "120%")};
      transform: ${(props) =>
        props.isMenuOpen ? "TranslateY(-10px) rotate(225deg)" : ""};
    }
  }
`;

type MenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Coordinates = {
  x: number;
  y: number;
};

export default (({
  isMenuOpen,
  setIsMenuOpen,
}: MenuProps): React.ReactElement => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsMenuOpen(!isMenuOpen);
    setCoordinates({
      x: event.screenX - event.currentTarget.offsetLeft,
      y: event.screenY - event.currentTarget.offsetTop,
    });
  };

  return (
    <StyledMenu>
      <StyledCircle isMenuOpen={isMenuOpen} coordinates={coordinates} />
      <StyledModal isMenuOpen={isMenuOpen}>
        <StyledList isMenuOpen={isMenuOpen}>
          {navLinks.map(({ url, name }, i) => (
            <li key={i}>
              <Link to={url} onClick={() => setIsMenuOpen(false)}>
                {name}
              </Link>
            </li>
          ))}
        </StyledList>
      </StyledModal>
      <StyledHamburgerButton onClick={handleClick} isMenuOpen={isMenuOpen}>
        <span className="ham-box-line" />
        <span className="ham-box-line" />
        <span className="ham-box-line" />
      </StyledHamburgerButton>
    </StyledMenu>
  );
}) as React.FunctionComponent<MenuProps>;
