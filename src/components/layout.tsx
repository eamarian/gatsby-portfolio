import React, { useState } from "react";
import { Loader, Nav, Footer } from "../components";

const PATHNAME_HOME = "/";

type Props = {
  children: React.ReactNode;
  location: any; //TODO: Get this to be typed better
};

export default (({ children, location }: Props): React.ReactElement => {
  const isHome: boolean = location.pathname === PATHNAME_HOME;
  const [isLoading, setIsLoading] = useState<boolean>(isHome);

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
