import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import "./main.css";

const render = (): void => {
    ReactDOM.render(<App />, document.getElementById("root"));
};

render();

if (module.hot) {
    module.hot.accept("./components/App", () => {
        render();
    });
}
