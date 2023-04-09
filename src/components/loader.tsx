import React, { useState, useEffect } from "react";
import anime from "animejs";

type Props = {
  finishLoading: () => void;
};

export default (({ finishLoading }: Props): React.ReactElement => {
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader.add({
      targets: ".test",
      translateX: 250,
      delay: 300,
      duration: 1500,
      easing: "spring",
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 5000);
    animate();
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div className="test">Loading...</div>;
}) as React.FunctionComponent<Props>;
