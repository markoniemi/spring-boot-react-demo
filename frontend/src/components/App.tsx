import React, { Component } from "react";
import "../App.css";
import Hello from "./Hello";
import UserContainer from "./UserContainer";

class App extends Component<Readonly<{}>, Readonly<{}>> {
    public render(): JSX.Element {
        return (
            <div>
                <div className="container-fluid">
                    <UserContainer />
                </div>
                <Hello />
            </div>
        );
    }
}

export default App;
