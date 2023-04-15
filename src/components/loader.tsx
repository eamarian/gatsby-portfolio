import React, { useState, useEffect } from "react";
import anime from "animejs";
import { text } from "node:stream/consumers";

type Props = {
  finishLoading: () => void;
};

export default (({ finishLoading }: Props): React.ReactElement => {
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader.add({
      targets: ".letter",
      opacity: [0, 1, 0],
      duration: 5000,
      easing: "easeInOutExpo",
      rotate: "360deg",
      delay: (el: HTMLElement, i: number) => 50 * i,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 5000);
    animate();
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <h1 className="load">
      <span className="letter">L</span>
      <span className="letter">o</span>
      <span className="letter">a</span>
      <span className="letter">d</span>
      <span className="letter">i</span>
      <span className="letter">n</span>
      <span className="letter">g</span>
      <span className="letter">.</span>
      <span className="letter">.</span>
      <span className="letter">.</span>
    </h1>
  );
}) as React.FunctionComponent<Props>;
