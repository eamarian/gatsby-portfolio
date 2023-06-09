import React, { useEffect, useRef } from "react";
import { email } from "../../config";
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
    <section id="contact" ref={revealSection}>
      <h1>Contact Me</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque odio eum
        debitis, alias tenetur distinctio totam a animi ipsam magni ullam cum
        consectetur nesciunt id quae recusandae ea temporibus itaque!
      </p>
      <a href={`mailto:${email}`}>Send Email</a>
    </section>
  );
}) as React.FunctionComponent;
