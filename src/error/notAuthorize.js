import React from "react";
import "../css/form.css";

export const NotAuthorize = () => {
  localStorage.clear();
  return (
    <div className="custom-error-container">
      <h3> 401 </h3> <p> Зайдите пожалуйста в аакаунт </p>
    </div>
  );
};
