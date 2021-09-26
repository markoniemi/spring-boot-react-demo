import React from "react";
import UserContainer from "./UsersContainer";
import EditUser from "./EditUser";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import i18nConfig from "../messages/messages";

class App extends React.Component<Readonly<{}>, Readonly<{}>> {
    public override render(): React.ReactNode {
        return (
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={UserContainer} />
                        <Route path="/users/new" component={EditUser} />
                        <Route path="/users/:id" component={EditUser} />
                    </Switch>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default App;
