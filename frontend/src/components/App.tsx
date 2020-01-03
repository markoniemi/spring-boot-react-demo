import React, { Component } from "react";
import "../App.css";
import UserContainer from "./UserContainer";
import EditUser from "./EditUser";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component<Readonly<{}>, Readonly<{}>> {
    public render(): JSX.Element {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={UserContainer} />
                    <Route path="/users/new" component={EditUser} />
                    <Route path="/users/:id" component={EditUser} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
