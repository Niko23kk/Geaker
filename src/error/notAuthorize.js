import React from "react";
import "../css/form.css";

export const NotAuthorize = () => {
  localStorage.clear();
  return (
    <div className="custom-error-container">
      <h3> 401 </h3>{" "}
      <p> We are sorry but the page you are looking for does not exist. </p>{" "}
    </div>
  );
};
