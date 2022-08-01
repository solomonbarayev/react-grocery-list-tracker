import React, { useEffect } from "react";

const Alert = ({ alert }) => {
  return (
    <div
      className={`alert ${
        alert.type === "success" ? "alert-success" : "alert-danger"
      }`}
    >
      <p>{alert.message}</p>
    </div>
  );
};

export default Alert;
