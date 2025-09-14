import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      color="white"
      size="3x"
      spin
      style={{ animation: "fa-spin 1.5s infinite linear" }}
    />
  );
};

export default Spinner;
