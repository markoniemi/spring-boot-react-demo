import AbstractPage from "./AbstractPage";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import i18nConfig from "../../src/messages/messages";
import * as React from "react";
import { assert } from "chai";
import sleep from "es7-sleep";
import { RouteComponentProps } from "react-router-dom";
import UsersContainer from "../../src/components/UsersContainer";
import { BrowserRouter } from "react-router-dom";

export default class UsersPage extends AbstractPage {
    public static async render(routeComponentProps: RouteComponentProps<any>): Promise<void> {
        render(
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <BrowserRouter>
                    <UsersContainer.WrappedComponent {...routeComponentProps} />
                </BrowserRouter>
            </IntlProvider>,
        );
        await sleep(100);
    }

    public static async assertUser(username: string, email?: string, role?: string): Promise<void> {
        assert.isTrue((await this.getTextsById("username")).includes(username));
        if (!!email) {
            assert.isTrue((await this.getTextsById("email")).includes(email));
        }
    }

    public static async pressEnter(): Promise<void> {
        await act(async () => {
            fireEvent.keyPress(await screen.findByTestId("email"), { key: "Enter", code: "Enter", charCode: 13 });
            await sleep(100);
        });
    }
    public static async clickAddUser(username: string): Promise<void> {
        await act(async () => {
            fireEvent.click(await AbstractPage.findButton("addUser"));
            await sleep(100);
        });
    }
    public static async clickDelete(username: string): Promise<void> {
        await act(async () => {
            // TODO how to test that confirm is shown and click confirm button
            window.confirm = jest.fn().mockImplementation(() => true);
            // TODO find row, then button
            fireEvent.click(screen.getAllByTestId("delete")[0]);
            await sleep(100);
        });
    }
}
