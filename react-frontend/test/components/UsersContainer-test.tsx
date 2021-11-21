import { assert } from "chai";
import * as dotenv from "dotenv";
import * as React from "react";
import { users } from "../userList";
import { BrowserRouter } from "react-router-dom";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import "isomorphic-fetch";
import UsersContainer from "../../src/components/UsersContainer";
import log, { LogLevelDesc } from "loglevel";
import * as process from "process";
import i18nConfig from "../../src/messages/messages";
import { act, configure, fireEvent, render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import AbstractPage from "../pages/AbstractPage";

describe("UsersContainer component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        fetchMock.postOnce("/api/rest/time", "message");
        dotenv.config({ path: "config/development.env" });
        log.setLevel(process.env.LOG_LEVEL as LogLevelDesc);
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should render userlist", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        renderUsersContainer(createRouteComponentProps(null));
        await sleep(100);
        assert.isNotNull(await screen.getByTestId("user1"));
        assert.isNotNull(await screen.getByTestId("user2"));
    });
    test("should add user", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        const routeComponentProps = createRouteComponentProps(null);
        routeComponentProps.history.push = jest.fn();
        renderUsersContainer(routeComponentProps);
        await act(async () => {
            await sleep(100);
            await fireEvent.click(await AbstractPage.findButton("addUser"));
            await sleep(100);
        });
        expect(routeComponentProps.history.push).toBeCalledWith("/users/new");
    });
    test("should render error message", async () => {
        fetchMock.getOnce("/api/rest/users/", 401);
        renderUsersContainer(createRouteComponentProps(null));
        await sleep(100);
        assert.isNotNull(await screen.getByText("Error loading users"));
    });
    test("should delete user", async () => {
        window.confirm = jest.fn();
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.deleteOnce("/api/rest/users/", 200);
        renderUsersContainer(createRouteComponentProps(null));
        await act(async () => {
            await sleep(100);
            // TODO find row, then button
            fireEvent.click(screen.getAllByTestId("delete")[0]);
            await sleep(100);
        });
        assert.isTrue(fetchMock.done());
    });
});

function renderUsersContainer(routeComponentProps) {
    render(
        <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
            <BrowserRouter>
                <UsersContainer.WrappedComponent {...routeComponentProps} />
            </BrowserRouter>
        </IntlProvider>,
    );
}
