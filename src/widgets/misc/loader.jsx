import React from "react";

function Loader({ loading }) {
  if (!loading) {
    return null;
  }
  return (
    <div className="flex items-center justify-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
