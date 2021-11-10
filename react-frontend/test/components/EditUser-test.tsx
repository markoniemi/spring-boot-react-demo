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

export async function getValueById(id: string): Promise<string> {
    return ((await screen.getByTestId(id)) as HTMLInputElement).value;
}

export async function findButton(id: string): Promise<HTMLInputElement> {
    return (await screen.getByTestId(id)) as HTMLInputElement;
}

export async function setText(id: string, text: string): Promise<void> {
    fireEvent.change((await screen.getByTestId(id)) as HTMLInputElement, { target: { value: text } });
}

export async function selectOption(id: string, value: string): Promise<void> {
    fireEvent.change((await screen.getByTestId(id)) as HTMLInputElement, { target: { value: value } });
}

describe("EditUser component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        dotenv.config({ path: "config/development.env" });
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
    test.todo("should add a user");
    test("should show validation error with empty user", async () => {
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
        await act(async () => {
            fireEvent.click(await findButton("saveUser"));
            await sleep(100);
        });
        assert.isNotNull(await screen.getByText("Username required"));
        assert.isNotNull(await screen.getByText("Password required"));
        assert.isNotNull(await screen.getByText("Email required"));
        // TODO Role does not show error text
        // assert.isNotNull(await screen.getByText("Role required"));
    });
    test("should show an error with invalid user", async () => {
        const routeComponentProps = createRouteComponentProps({});
        render(
            <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                <EditUser.WrappedComponent {...routeComponentProps} />
            </IntlProvider>,
        );
        await sleep(100);
        fetchMock.postOnce("/api/rest/users/", 404);
        await act(async () => {
            await setText("username", "invalid");
            await setText("password", "invalid");
            await setText("email", "invalid");
            await selectOption("role", "ROLE_ADMIN");
            fireEvent.click(await findButton("saveUser"));
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
            await setText("username", "newUsername");
            await setText("email", "newEmail");
            assert.equal(await getValueById("username"), "newUsername");
            assert.equal(await getValueById("email"), "newEmail");
            fetchMock.putOnce("/api/rest/users/1", { username: "newUsername", email: "newEmail" });
            fireEvent.keyPress(await screen.findByTestId("email"), { key: "Enter", code: "Enter", charCode: 13 });
            await sleep(100);
        });
        expect(routeComponentProps.history.push).toBeCalledWith("/users");
    });
});

function renderEditUser(routeComponentProps) {
    render(
        <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
            <EditUser.WrappedComponent {...routeComponentProps} />
        </IntlProvider>,
    );
}
