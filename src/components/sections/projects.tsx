import React, { useEffect, useRef } from "react";
import srConfig from "../../utils/sr";
import { usePrefersReducedMotion } from "../../hooks";

export default ((): React.ReactElement => {
  const revealSection: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const revealProjects: React.RefObject<HTMLLIElement[]> = useRef<
    HTMLLIElement[]
  >([]);
  const prefersReducedMotion: boolean = usePrefersReducedMotion();

  // useEffect(() => {
  //   if (!prefersReducedMotion) {
  //     if (revealSection.current) {
  //       ScrollReveal().reveal(revealSection.current, srConfig());
  //     }
  //     if (revealProjects.current) {
  //       revealProjects.current.forEach((ref: HTMLLIElement, i: number) =>
  //         ScrollReveal().reveal(ref, srConfig(i * 100))
  //       );
  //     }
  //   }
  // }, []);

  type Project = {
    title: string;
    description: string;
  };
  const projects: Project[] = [
    {
      title: "Project 1",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum repudiandae nisi a corporis iusto dolores excepturi expedita! Esse quae, corporis inventore odio, libero veritatis, recusandae est neque dolores impedit magni!",
    },
    {
      title: "Project 2",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum repudiandae nisi a corporis iusto dolores excepturi expedita! Esse quae, corporis inventore odio, libero veritatis, recusandae est neque dolores impedit magni!",
    },
    {
      title: "Project 3",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum repudiandae nisi a corporis iusto dolores excepturi expedita! Esse quae, corporis inventore odio, libero veritatis, recusandae est neque dolores impedit magni!",
    },
  ];

  return (
    <section id="projects" ref={revealSection}>
      <h1>Projects</h1>
      <ol>
        {projects.map(({ title, description }: Project, i: number) => {
          return (
            <li
              key={i}
              ref={(li: HTMLLIElement) => {
                if (revealProjects.current) {
                  revealProjects.current[i] = li;
                }
              }}
            >
              <h2>{title}</h2>
              <p>{description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}) as React.FunctionComponent;
