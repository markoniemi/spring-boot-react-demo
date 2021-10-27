import React from "react";
import UserContainer from "./UsersContainer";
import EditUser from "./EditUser";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import i18nConfig from "../messages/messages";
import LoginForm from "./LoginForm";
import Empty from "../domain/Empty";

class App extends React.Component<Empty, Empty> {
    public override render(): React.ReactNode {
        return (
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <BrowserRouter>
                    <Switch>
                        <Redirect exact from="/" to="/login" />
                        <Route exact path="/login" component={LoginForm} />
                        <Route exact path="/users" component={UserContainer} />
                        <Route path="/users/new" component={EditUser} />
                        <Route path="/users/:id" component={EditUser} />
                    </Switch>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
