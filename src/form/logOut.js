import React from "react";

export const LogOut = () => {
  localStorage.clear();
  window.location.href = "/login";
};
