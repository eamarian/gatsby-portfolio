import React, { useState, useEffect } from "react";
import { Loader, Nav, Footer } from "../components";

const PATHNAME_HOME = "/";

type Props = {
  children: React.ReactNode;
  location: any; //TODO: Get this to be typed better
};

export default (({ children, location }: Props): React.ReactElement => {
  const isHome: boolean = location.pathname === PATHNAME_HOME;
  // const [isLoading, setIsLoading] = useState<boolean>(isHome);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      {isLoading && isHome ? (
        <Loader finishLoading={() => setIsLoading(false)} />
      ) : (
        <>
          <Nav />
          <div>{children}</div>
          <Footer />
        </>
      )}
    </>
  );
}) as React.FunctionComponent<Props>;
