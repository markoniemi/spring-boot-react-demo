import { assert } from "chai";
import * as dotenv from "dotenv";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { Button, FormControl } from "react-bootstrap";
import EditUser, { EditUserState, RouteParam } from "../../src/components/EditUser";
import { user1 } from "../userList";
import { RouteComponentProps } from "react-router-dom";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import Messages from "../../src/components/Messages";
import "isomorphic-fetch";
import { render, fireEvent, screen, configure, act } from "@testing-library/react";
import i18nConfig from "../../src/messages/messages";
import { IntlProvider } from "react-intl";

function renderEditUser(routeComponentProps) {
    render(
        <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
            <EditUser.WrappedComponent {...routeComponentProps} />
        </IntlProvider>,
    );
}

async function getValueById(id: string) {
    return ((await screen.getByTestId(id)) as HTMLInputElement).value;
}

async function findButton(id: string) {
    return (await screen.getByTestId(id)) as HTMLInputElement;
}

async function setText(id: string, text: string) {
    await fireEvent.change((await screen.getByTestId(id)) as HTMLInputElement, { target: { value: text } });
}

describe("EditUser component", () => {
    beforeEach(() => {
        dotenv.config({ path: "config/development.env" });
        configure({ testIdAttribute: "id" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should render a user", async () => {
        fetchMock.getOnce("/api/rest/users/1", user1);
        const routeComponentProps = createRouteComponentProps({ id: "1" });
        renderEditUser(routeComponentProps);
        await sleep(100);
        assert.equal(await getValueById("id"), "1");
        assert.equal(await getValueById("username"), "user1");
        assert.equal(await getValueById("email"), "email1");
    });
    test("should show an error", async () => {
        fetchMock.getOnce("/api/rest/users/1", 401);
        const routeComponentProps = createRouteComponentProps({ id: "1" });
        renderEditUser(routeComponentProps);
        await sleep(100);
        assert.isNotNull(await screen.getByText("Error loading user"));
    });
    test("should show an error with empty user", async () => {
        const routeComponentProps = createRouteComponentProps({});
        render(
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <EditUser.WrappedComponent {...routeComponentProps} />
            </IntlProvider>,
        );
        await sleep(100);
        assert.equal(await getValueById("id"), "");
        assert.equal(await getValueById("username"), "");
        assert.equal(await getValueById("email"), "");
        fetchMock.postOnce("/api/rest/users/", 404);
        await act(async () => {
            await fireEvent.click(await findButton("saveUser"));
            await sleep(100);
        });
        assert.isNotNull(await screen.getByText("Error saving user"));
    });
    test("should edit a user", async () => {
        fetchMock.getOnce("/api/rest/users/1", user1);
        const routeComponentProps = createRouteComponentProps({ id: "1" });
        routeComponentProps.history.push = jest.fn();
        renderEditUser(routeComponentProps);
        await sleep(100);
        assert.equal(await getValueById("username"), "user1");
        assert.equal(await getValueById("email"), "email1");
        await act(async () => {
            setText("username", "newUsername");
            setText("email", "newEmail");
            assert.equal(await getValueById("username"), "newUsername");
            assert.equal(await getValueById("email"), "newEmail");
            fetchMock.putOnce("/api/rest/users/1", { username: "newUsername", email: "newEmail" });
            await fireEvent.click(await findButton("saveUser"));
            await sleep(100);
        });
        expect(routeComponentProps.history.push).toBeCalledWith("/users");
    });
});
