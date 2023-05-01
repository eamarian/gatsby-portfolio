import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { navLinks } from "../config";
import anime from "animejs";
import { MenuState } from "./layout";

const StyledMenu = styled.div`
  display: block;
`;

type StyledSVGProps = {
  x: number;
  y: number;
  radius: number;
  menuState: MenuState;
};

const StyledSVG = styled.svg<StyledSVGProps>`
  transform: translate(
    ${(props) => props.x - props.radius}px,
    ${(props) => props.y - props.radius}px
  );
  top: 0;
  left: 0;
  position: fixed;
  display: ${(props) =>
    props.menuState !== MenuState.Closed ? "default" : "none"};
  z-index: 10;
`;

const StyledCircleSVG = styled.circle``;

type StyledProps = {
  menuState: MenuState;
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
  z-index: ${(props) =>
    props.menuState === MenuState.Open || props.menuState === MenuState.Opening
      ? 10
      : -100};
  visibility: ${(props) =>
    props.menuState === MenuState.Open || props.menuState === MenuState.Opening
      ? "1"
      : "0"};
`;

const StyledList = styled.ul<StyledProps>`
  list-style: none;
  opacity: ${(props) => (props.menuState !== MenuState.Closed ? 1 : 0)};
  transition-property: opacity;
  transition-duration: ${(props) =>
    props.menuState !== MenuState.Closed ? "1s" : "0s"};
  transition-delay: ${(props) =>
    props.menuState !== MenuState.Closed ? "0.5s" : "0s"};

  a {
    color: white;
    text-decoration: none;
    position: relative;

    h1 {
      text-align: center;
    }

    ::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 4px;
      bottom: 0;
      left: 0;
      background-color: white;
      transform-origin: bottom left;
      transition: transform 0.25s ease-in-out;
    }
    :hover::after {
      transform: scaleX(1);
    }
  }
`;

const StyledHamburgerButton = styled.button<StyledProps>`
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

  .ham-box-line {
    right: 0;
    border: 1px solid
      ${(props) =>
        props.menuState === MenuState.Open ||
        props.menuState === MenuState.Opening
          ? "white"
          : "grey"};
    width: 100%;
    transition-duration: 375ms;

    :first-child {
      transform: ${(props) =>
        props.menuState === MenuState.Open ||
        props.menuState === MenuState.Opening
          ? "TranslateY(10px) rotate(-225deg)"
          : ""};
    }
    :not(:first-child):not(:last-child) {
      opacity: ${(props) =>
        props.menuState === MenuState.Open ||
        props.menuState === MenuState.Opening
          ? 0
          : 1};
      transform: rotate(
        ${(props) =>
          props.menuState === MenuState.Open ||
          props.menuState === MenuState.Opening
            ? "360deg"
            : "0deg"}
      );
    }
    :last-child {
      transform: ${(props) =>
        props.menuState === MenuState.Open ||
        props.menuState === MenuState.Opening
          ? "TranslateY(-10px) rotate(225deg)"
          : ""};
    }
  }
`;

type MenuProps = {
  menuState: MenuState;
  setMenuState: React.Dispatch<React.SetStateAction<MenuState>>;
};

type Coordinates = {
  x: number;
  y: number;
};

export default (({
  menuState,
  setMenuState,
}: MenuProps): React.ReactElement => {
  const [windowDimensions, setWindowDimensions] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  const buttonRef: React.RefObject<HTMLButtonElement> =
    useRef<HTMLButtonElement>(null);

  const circleRef: React.RefObject<SVGCircleElement> =
    useRef<SVGCircleElement>(null);

  useEffect(() => {
    setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });

    function onResize(this: Window, ev: UIEvent) {
      setWindowDimensions({
        height: this.innerHeight,
        width: this.innerWidth,
      });
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function toggleMenu(): void {
    if (menuState === MenuState.Open || menuState === MenuState.Opening) {
      setMenuState(MenuState.Closing);
      //Close Menu
      animateMenu(0, "easeInOutQuart", () => setMenuState(MenuState.Closed));
    } else {
      //Open Menu
      setMenuState(MenuState.Opening);
      animateMenu(1, "easeOutQuart", () => setMenuState(MenuState.Open));
    }
  }

  function animateMenu(
    endRadius: number,
    easing: string,
    complete?: () => void
  ) {
    const circle: SVGCircleElement | null = circleRef.current;
    if (circle) {
      anime.remove(circle);
      anime({
        targets: circle,
        r: endRadius,
        duration: 750,
        easing: easing,
        complete: complete,
      });
    }
  }

  const calcRadius = (x: number, y: number): number => {
    const corners = [
      calcDistance(x, y, 0, 0),
      calcDistance(x, y, windowDimensions.width, 0),
      calcDistance(x, y, 0, windowDimensions.height),
      calcDistance(x, y, windowDimensions.width, windowDimensions.height),
    ];

    return Math.max(Math.max(...corners));
  };

  const calcDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  function getRectCenter(rect: DOMRect | undefined): Coordinates {
    if (rect) {
      return {
        x: rect.left + (rect.right - rect.left) / 2,
        y: rect.top + (rect.bottom - rect.top) / 2,
      };
    } else {
      return { x: 0, y: 0 };
    }
  }

  const coordinates: Coordinates = getRectCenter(
    buttonRef.current?.getBoundingClientRect()
  );
  const radius: number = calcRadius(coordinates.x, coordinates.y);

  return (
    <StyledMenu>
      <StyledSVG
        viewBox={"0 0 2 2"}
        height={2 * radius}
        width={2 * radius}
        x={coordinates.x}
        y={coordinates.y}
        radius={radius}
        menuState={menuState}
      >
        <StyledCircleSVG fill="#1f4954" ref={circleRef} cx={1} cy={1} />
      </StyledSVG>
      <StyledModal menuState={menuState}>
        <StyledList menuState={menuState}>
          <></>
          {navLinks.map(({ url, name }, i) => (
            <li key={i}>
              <Link to={url} onClick={toggleMenu}>
                <h1>{name}</h1>
              </Link>
            </li>
          ))}
        </StyledList>
      </StyledModal>
      <StyledHamburgerButton
        ref={buttonRef}
        onClick={toggleMenu}
        menuState={menuState}
      >
        <span className="ham-box-line" />
        <span className="ham-box-line" />
        <span className="ham-box-line" />
      </StyledHamburgerButton>
    </StyledMenu>
  );
}) as React.FunctionComponent<MenuProps>;
