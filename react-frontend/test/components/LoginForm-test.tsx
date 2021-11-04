import { assert } from "chai";
import * as dotenv from "dotenv";
import * as React from "react";
import EditUser from "../../src/components/EditUser";
import { user1 } from "../userList";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import "isomorphic-fetch";
import { act, configure, fireEvent, render, screen } from "@testing-library/react";
import i18nConfig from "../../src/messages/messages";
import { IntlProvider } from "react-intl";
import {findButton, getValueById, setText} from "./EditUser-test";
import LoginForm from "../../src/components/LoginForm";

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
        render(
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <LoginForm.WrappedComponent {...routeComponentProps} />
            </IntlProvider>,
        );
        await sleep(100);
        assert.equal(await getValueById("username"), "");
        assert.equal(await getValueById("password"), "");
        fetchMock.postOnce("/api/rest/auth/login/", 200);
        await act(async () => {
            setText("username", "user1");
            setText("password", "user1");
            assert.equal(await getValueById("username"), "user1");
            assert.equal(await getValueById("password"), "user1");
            await fireEvent.click(await findButton("login"));
            await sleep(100);
        });
        expect(routeComponentProps.history.push).toBeCalledWith("/users");
    });
    test("should show an error with invalid credentials", async () => {
        const routeComponentProps = createRouteComponentProps({});
        render(
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <LoginForm.WrappedComponent {...routeComponentProps} />
            </IntlProvider>,
        );
        await sleep(100);
        assert.equal(await getValueById("username"), "");
        assert.equal(await getValueById("password"), "");
        fetchMock.postOnce("/api/rest/auth/login/", 400);
        await act(async () => {
            await fireEvent.click(await findButton("login"));
            await sleep(100);
        });
        assert.isNotNull(await screen.getByText("Login error"));
    });
});
