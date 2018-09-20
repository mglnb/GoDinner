import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./containers/App";
import "./index.scss";
Array.prototype.flatten = function(arr) {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? [].flatten(toFlatten) : toFlatten
    );
  }, []);
};

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
