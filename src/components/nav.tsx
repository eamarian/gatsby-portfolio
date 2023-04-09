import React from "react";
import { Link } from "gatsby";
import { navLink, navLinks } from "../config";

type Props = {
  isHome: boolean;
};

export default (({ isHome }: Props): React.ReactElement => {
  return (
    <nav>
      <ol>
        {navLinks.map(({ url, name }, i) => (
          <li key={i}>
            <Link to={url}>{name}</Link>
          </li>
        ))}
      </ol>
      <div>
        <a href="/dummy.pdf" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </div>
    </nav>
  );
}) as React.FunctionComponent;
