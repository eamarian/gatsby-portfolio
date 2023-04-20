import React, { useEffect, useRef } from "react";
import srConfig from "../../utils/sr";
import { usePrefersReducedMotion } from "../../hooks";

export default ((): React.ReactElement => {
  const revealSection: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const prefersReducedMotion: boolean = usePrefersReducedMotion();

  useEffect(() => {
    async function animate() {
      if (!prefersReducedMotion && revealSection.current) {
        const ScrollReveal = (await import("scrollreveal")).default;
        ScrollReveal().reveal(revealSection.current, srConfig());
      }
    }
    animate();
  }, []);

  return (
    <section id="about" ref={revealSection}>
      <h1>About Me</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, iusto
        totam. Nobis natus, accusantium, molestiae repudiandae ullam quae sequi
        soluta nisi praesentium, laboriosam voluptatibus possimus inventore
        eaque totam repellendus. Reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem commodi
        vitae quia! Inventore hic, voluptatem, laudantium ex perferendis
        necessitatibus mollitia eveniet maxime distinctio, quam dicta aperiam
        quidem repellat impedit porro.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum vero
        quisquam sit voluptates, nihil obcaecati repudiandae unde aliquam dicta
        quis nesciunt accusamus error ab beatae asperiores ea perferendis culpa
        amet.
      </p>
    </section>
  );
}) as React.FunctionComponent;
