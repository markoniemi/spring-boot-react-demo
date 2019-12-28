import React, {Component} from "react";
import "../App.css";
import UserList from "./UserList";
import Hello from "./Hello";
import UserServiceMock from "../api/UserServiceMock";
import User from "../domain/User";
import {UserService} from "../api/UserService";
import UserContainer from "./UserContainer";

class App extends Component<Readonly<{}>, Readonly<{}>> {
    public render() {
        return (
            <div>
                <div className="container-fluid">
                    <UserContainer/>
                </div>
                <Hello/>
            </div>
        );
    }
}

export default App;
