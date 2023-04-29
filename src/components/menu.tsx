import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { navLinks } from "../config";
import anime, { AnimeCallBack } from "animejs";

const StyledMenu = styled.div`
  /* display: none; */
  /* @media (max-width: 768px) { */
  display: block;
  /* } */
`;

type StyledSVGProps = {
  x: number;
  y: number;
  radius: number;
};

const StyledSVG = styled.svg<StyledSVGProps>`
  transform: translate(
    ${(props) => props.x - props.radius}px,
    ${(props) => props.y - props.radius}px
  );
  top: 0;
  left: 0;
  position: fixed;
  z-index: 5;
`;

const StyledCircleSVG = styled.circle``;

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

const StyledCanvas = styled.canvas<StyledProps>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
`;

const StyledList = styled.ol<StyledProps>`
  opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
  transition-property: opacity;
  transition-duration: ${(props) => (props.isMenuOpen ? "1s" : "0s")};
  transition-delay: ${(props) => (props.isMenuOpen ? "0.5s" : "0s")};
  color: white;
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
    if (isMenuOpen) {
      //Close Menu
      setIsMenuOpen(false);
      animateMenu("#1f4954", 0, "easeInOutQuart");
    } else {
      //Open Menu
      setIsMenuOpen(true);
      animateMenu("#1f4954", 1, "easeOutQuart");
    }
  }

  function animateMenu(fill: string, endRadius: number, easing: string) {
    const circle: SVGCircleElement | null = circleRef.current;
    if (circle) {
      anime.remove(circle);
      anime({
        targets: circle,
        r: endRadius,
        duration: Math.max(endRadius / 2, 750),
        easing: easing,
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

  // function getRectCenter(rect: DOMRect | undefined): Coordinates {
  //   if (rect) {
  //     return {
  //       x: rect.left + (rect.right - rect.left) / 2,
  //       y: rect.top + (rect.bottom - rect.top) / 2,
  //     };
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // }

  // const coordinates: Coordinates = getRectCenter(
  //   buttonRef.current?.getBoundingClientRect()
  // );
  // const radius: number = calcRadius(coordinates.x, coordinates.y);
  const radius: number = calcRadius(0, 0);

  return (
    <StyledMenu>
      <StyledSVG
        viewBox={"0 0 2 2"}
        height={2 * radius}
        width={2 * radius}
        // x={coordinates.x}
        // y={coordinates.y}
        x={0}
        y={0}
        radius={radius}
      >
        <StyledCircleSVG fill="#1f4954" ref={circleRef} cx={1} cy={1} />
      </StyledSVG>
      <StyledModal isMenuOpen={isMenuOpen}>
        <StyledList isMenuOpen={isMenuOpen}>
          {navLinks.map(({ url, name }, i) => (
            <li key={i}>
              <Link style={{ color: "white" }} to={url} onClick={toggleMenu}>
                {name}
              </Link>
            </li>
          ))}
        </StyledList>
      </StyledModal>
      <StyledHamburgerButton
        ref={buttonRef}
        onClick={toggleMenu}
        isMenuOpen={isMenuOpen}
      >
        <span className="ham-box-line" />
        <span className="ham-box-line" />
        <span className="ham-box-line" />
      </StyledHamburgerButton>
    </StyledMenu>
  );
}) as React.FunctionComponent<MenuProps>;
