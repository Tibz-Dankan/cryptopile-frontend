import React from "react";
import { Link } from "react-router-dom";

const ViewLink = () => {
  return (
    <div>
      <Link to="viewmypile" className="navigation-link">
        Checkout Pile
      </Link>
    </div>
  );
};

export default ViewLink;
