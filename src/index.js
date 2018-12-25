import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Calendar from "./components/Calendar";

ReactDOM.render(<Calendar />, document.getElementById("root"));

serviceWorker.unregister();
