import AbstractPage from "./AbstractPage";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import i18nConfig from "../../src/messages/messages";
import EditUser from "../../src/components/EditUser";
import * as React from "react";
import { assert } from "chai";
import sleep from "es7-sleep";
import { RouteComponentProps } from "react-router-dom";
import LoginForm from "../../src/components/LoginForm";

export default class EditUserPage extends AbstractPage {
    public static async render(routeComponentProps: RouteComponentProps<any>): Promise<void> {
        render(
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <LoginForm.WrappedComponent {...routeComponentProps} />
            </IntlProvider>,
        );
        await sleep(100);
    }
    public static async assertLogin(username: string, password: string): Promise<void> {
        assert.equal(await this.getValueById("username"), username);
        assert.equal(await this.getValueById("password"), password);
    }

    public static async setUser(username: string, password: string): Promise<void> {
        await act(async () => {
            await this.setText("username", username);
            await this.setText("password", password);
        });
    }
    public static async pressEnter(): Promise<void> {
        await act(async () => {
            fireEvent.keyPress(await screen.findByTestId("password"), { key: "Enter", code: "Enter", charCode: 13 });
            await sleep(100);
        });
    }

    public static async clickLogin(): Promise<void> {
        await act(async () => {
            fireEvent.click(await EditUserPage.findButton("login"));
            await sleep(100);
        });
    }
}
