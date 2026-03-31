import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
export default function Alert(props) {
  const [hide, setHide] = useState(false);

  const clicked = () => {
    setHide(true);
  };

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  useEffect(() => {
    setHide(false);
    const timer = setTimeout(() => {
      setHide(true);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [props.currStatus]);

  return (
    <div className="h-12 w-screen">
      {props.Alert && (
        <div
          className={`${
            hide
              ? "hidden"
              : "p-4 mb-4 text-sm text-fg-warning  rounded-base bg-[#52da59ff] dark:bg-[#20B2AA]"
          }`}
          role="alert"
          id="AlertBar"
        >
          <span className="font-medium">
            <strong>{capitalize(props.Alert.type)}</strong>
          </span>

          {props.Alert.msg}
          <button
            id="cancelALert"
            onClick={clicked}
            className={`border-none outline-none float-right`}
          >
            <strong>X</strong>
          </button>
        </div>
      )}
    </div>
  );
}
Alert.propTypes = {
  Alert: PropTypes.object,
};
