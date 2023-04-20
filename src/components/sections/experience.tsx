import React, { useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import srConfig from "../../utils/sr";
import { usePrefersReducedMotion } from "../../hooks";

export default ((): React.ReactElement => {
  const revealSection: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const prefersReducedMotion: boolean = usePrefersReducedMotion();

  // useEffect(() => {
  //   if (!prefersReducedMotion && revealSection.current) {
  //     ScrollReveal().reveal(revealSection.current, srConfig());
  //   }
  // }, []);

  const data = useStaticQuery(graphql`
    query {
      experience: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/experience/" } }
        sort: { frontmatter: { date: DESC } }
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
          const { frontmatter, html } = node;
          const { title, url, company, range } = frontmatter;
          return (
            <li key={i}>
              <h3>
                <span>{title}</span>
                {" @ "}
                <span>
                  <a href={url}>{company}</a>
                </span>
              </h3>

              <p>{range}</p>

              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}) as React.FunctionComponent;
