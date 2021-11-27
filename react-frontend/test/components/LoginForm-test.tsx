import { assert } from "chai";
import * as dotenv from "dotenv";
import * as React from "react";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import "isomorphic-fetch";
import { act, configure, fireEvent, render, screen } from "@testing-library/react";
import i18nConfig from "../../src/messages/messages";
import { IntlProvider } from "react-intl";
import AbstractPage from "../pages/AbstractPage";
import LoginForm from "../../src/components/LoginForm";
import LoginPage from "../pages/LoginPage";

describe("LoginForm component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should change page with valid credentials", async () => {
        const routeComponentProps = createRouteComponentProps({});
        routeComponentProps.history.push = jest.fn();
        LoginPage.render(routeComponentProps);
        LoginPage.setUser("","");
        fetchMock.postOnce("/api/rest/auth/login/", 200);
        LoginPage.setUser("user1","user1");
        LoginPage.assertLogin("user1","user1");
        LoginPage.pressEnter();

        // await act(async () => {
        //     await AbstractPage.setText("username", "user1");
        //     await AbstractPage.setText("password", "user1");
        //     assert.equal(await AbstractPage.getValueById("username"), "user1");
        //     assert.equal(await AbstractPage.getValueById("password"), "user1");
        //     fireEvent.keyPress(await screen.findByTestId("password"), { key: "Enter", code: "Enter", charCode: 13 });
        //     await sleep(100);
        // });
        expect(routeComponentProps.history.push).toBeCalledWith("/users");
    });
    test("should show validation error with empty credentials", async () => {
        const routeComponentProps = createRouteComponentProps({});
        render(
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <LoginForm.WrappedComponent {...routeComponentProps} />
            </IntlProvider>,
        );
        await sleep(100);
        assert.equal(await AbstractPage.getValueById("username"), "");
        assert.equal(await AbstractPage.getValueById("password"), "");
        await act(async () => {
            fireEvent.click(await AbstractPage.findButton("login"));
            await sleep(100);
        });
        assert.isNotNull(await screen.getByText("Username required"));
        assert.isNotNull(await screen.getByText("Password required"));
    });
    test("should show an error with invalid credentials", async () => {
        const routeComponentProps = createRouteComponentProps({});
        render(
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <LoginForm.WrappedComponent {...routeComponentProps} />
            </IntlProvider>,
        );
        await sleep(100);
        fetchMock.postOnce("/api/rest/auth/login/", 400);
        await act(async () => {
            await AbstractPage.setText("username", "invalid");
            await AbstractPage.setText("password", "invalid");
            fireEvent.click(await AbstractPage.findButton("login"));
            await sleep(100);
        });
        assert.isNotNull(await screen.getByText("Login error"));
    });
});
