import React, { useState, useEffect } from "react";
import type { WindowLocation } from "@reach/router";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Loader, Nav, Footer } from "../components";
import "@fontsource/ubuntu/300.css";

const PATHNAME_HOME = "/";

const StyledContent = styled.div`
  /* display: flex;
  flex-direction: column;
  min-height: 100vh; */
`;

type GlobalStyleProps = {
  menuState: MenuState;
};

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`

  html {
    background-color:#FEFBF5;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body{
    overflow: ${(props) =>
      props.menuState === MenuState.Open ||
      props.menuState === MenuState.Opening
        ? "hidden"
        : "default"};
    position: ${(props) =>
      props.menuState === MenuState.Open ||
      props.menuState === MenuState.Opening
        ? "fixed"
        : "default"};
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: "ubuntu";
  }
`;

type LayoutProps = {
  children: React.ReactNode;
  location: WindowLocation<unknown>;
};

export enum MenuState {
  Closed = 0,
  Opening = 1,
  Open = 2,
  Closing = 3,
}

export default (({ children, location }: LayoutProps): React.ReactElement => {
  const isHome: boolean = location.pathname === PATHNAME_HOME;
  // const [isLoading, setIsLoading] = useState<boolean>(isHome);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuState, setMenuState] = useState<MenuState>(MenuState.Closed);

  useEffect(() => {
    if (!isLoading && location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el: HTMLElement | null = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }
  }, [isLoading]);

  return (
    <>
      <div id="root">
        <GlobalStyle menuState={menuState} />
        {isLoading && isHome ? (
          <Loader finishLoading={() => setIsLoading(false)} />
        ) : (
          <StyledContent>
            <Nav
              isHome={isHome}
              menuState={menuState}
              setMenuState={setMenuState}
            />
            <div id="content">
              {children}
              <Footer />
            </div>
          </StyledContent>
        )}
      </div>
    </>
  );
}) as React.FunctionComponent<LayoutProps>;
