import * as React from "react";
import { PageProps } from "gatsby";
import {
  Layout,
  Hero,
  About,
  Experience,
  Projects,
  Contact,
} from "../components";

export default (({ location }: PageProps): React.ReactElement => {
  const Padding = (): React.ReactElement => {
    return <div style={{ padding: "50vh" }}></div>;
  };

  return (
    <Layout location={location}>
      <Hero />
      <Padding />
      <About />
      <Padding />
      <Experience />
      <Padding />
      <Projects />
      <Padding />
      <Contact />
    </Layout>
  );
}) as React.FunctionComponent<PageProps>;
