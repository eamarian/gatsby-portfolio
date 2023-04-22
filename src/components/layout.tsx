import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Loader, Nav, Footer } from "../components";

const PATHNAME_HOME = "/";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

type GlobalStyleProps = {
  isMenuOpen: boolean;
};

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  body{
    overflow: ${(props) => (props.isMenuOpen ? "hidden" : "default")}
  }
`;

type LayoutProps = {
  children: React.ReactNode;
  location: any; //TODO: Get this to be typed better
};

export default (({ children, location }: LayoutProps): React.ReactElement => {
  const isHome: boolean = location.pathname === PATHNAME_HOME;
  // const [isLoading, setIsLoading] = useState<boolean>(isHome);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuLoading] = useState<boolean>(false);

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
        <GlobalStyle isMenuOpen={isMenuOpen} />
        {isLoading && isHome ? (
          <Loader finishLoading={() => setIsLoading(false)} />
        ) : (
          <StyledContent>
            <Nav
              isHome={isHome}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuLoading}
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
