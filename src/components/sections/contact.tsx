import React, { useEffect, useRef } from "react";
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
  return (
    <section id="contact" ref={revealSection}>
      <h1>Contact Me</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque odio eum
        debitis, alias tenetur distinctio totam a animi ipsam magni ullam cum
        consectetur nesciunt id quae recusandae ea temporibus itaque!
      </p>
    </section>
  );
}) as React.FunctionComponent;
