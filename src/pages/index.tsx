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
  return (
    <Layout location={location}>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </Layout>
  );
}) as React.FunctionComponent<PageProps>;
