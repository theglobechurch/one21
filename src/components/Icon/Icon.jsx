import React from "react";
import { string } from "prop-types";

const Icon = ({ classname, icon }) => (
  <svg className={classname}>
    <use
      xlinkHref={`/one21icons.svg#${icon}`}
    />
  </svg>
);

Icon.propTypes = {
  classname: string.isRequired,
  icon: string.isRequired,

};

export default Icon;
