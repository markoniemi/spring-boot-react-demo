import AbstractPage from "./AbstractPage";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import i18nConfig from "../../src/messages/messages";
import EditUser from "../../src/components/EditUser";
import * as React from "react";
import { assert } from "chai";
import sleep from "es7-sleep";
import { RouteComponentProps } from "react-router-dom";

export default class EditUserPage extends AbstractPage {
    public static async render(routeComponentProps: RouteComponentProps<any>): Promise<void> {
        render(
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <EditUser.WrappedComponent {...routeComponentProps} />
            </IntlProvider>,
        );
        await sleep(100);
    }

    public static async assertUser(id: string, username: string, email: string, role: string): Promise<void> {
        assert.equal(await this.getValueById("id"), id);
        assert.equal(await this.getValueById("username"), username);
        assert.equal(await this.getValueById("email"), email);
        assert.equal(await this.getValueById("role"), role);
    }

    public static async setUser(username: string, password: string, email: string, role: string): Promise<void> {
        await act(async () => {
            await this.setText("username", username);
            await this.setText("password", password);
            await this.setText("email", email);
            await this.selectOption("role", role);
        });
    }

    public static async pressEnter(): Promise<void> {
        await act(async () => {
            fireEvent.keyPress(await screen.findByTestId("email"), { key: "Enter", code: "Enter", charCode: 13 });
            await sleep(100);
        });
    }

    public static async clickSaveUser(): Promise<void> {
        await act(async () => {
            fireEvent.click(await AbstractPage.findButton("saveUser"));
            await sleep(100);
        });
    }
}
