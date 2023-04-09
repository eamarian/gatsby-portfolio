import React, { useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import sr, { srConfig } from "../../utils/sr";
import { usePrefersReducedMotion } from "../../hooks";

export default ((): React.ReactElement => {
  const revealSection: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const prefersReducedMotion: boolean = usePrefersReducedMotion();

  useEffect(() => {
    if (!prefersReducedMotion && sr && revealSection.current) {
      sr.reveal(revealSection.current, srConfig());
    }
  }, []);

  const data = useStaticQuery(graphql`
    query {
      experience: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/experience/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const experienceData = data.experience.edges;

  return (
    <section id="experience" ref={revealSection}>
      <h1>Experience</h1>
      <ol>
        {experienceData.map(({ node }: any, i: number) => {
          return <li key={i}>{node.frontmatter.company}</li>;
        })}
      </ol>
    </section>
  );
}) as React.FunctionComponent;
