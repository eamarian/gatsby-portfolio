import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default ((): React.ReactElement => {
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
    <section id="experience">
      <h1>Experience</h1>
      <ol>
        {experienceData.map(({ node }: any, i: number) => {
          return <li key={i}>{node.frontmatter.company}</li>;
        })}
      </ol>
    </section>
  );
}) as React.FunctionComponent;
