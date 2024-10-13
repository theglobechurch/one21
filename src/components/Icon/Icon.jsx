import React from "react";
import { string } from "prop-types";

const Icon = ({ classname = null, icon }) => (
  <svg className={classname}>
    <use
      xlinkHref={`/one21icons.svg#${icon}`}
    />
  </svg>
);

Icon.propTypes = {
  classname: string,
  icon: string.isRequired,
};

export default Icon;
