import { assert } from "chai";
import * as dotenv from "dotenv";
import * as React from "react";
import UserRow from "../../src/components/UserRow";
import User from "../../src/domain/User";
import { user1 } from "../userList";
import { BrowserRouter, RouteComponentProps } from "react-router-dom";
import createRouteComponentProps from "../RouteComponentPropsMock";
import { act, configure, fireEvent, render, screen } from "@testing-library/react";
import i18nConfig from "../../src/messages/messages";
import { IntlProvider } from "react-intl";
import { Table } from "react-bootstrap";
import AbstractPage from "../pages/AbstractPage";

describe("UserRow component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        dotenv.config({ path: "config/development.env" });
    });
    test("should render a user", async () => {
        const routeComponentProps = createRouteComponentProps(null);
        renderUserRow(user1, null, routeComponentProps);
        assert.equal((await screen.findByTestId("username")).textContent, "user1");
        assert.equal((await screen.findByTestId("email")).textContent, "email1");
    });
    test("should not create error with empty user", async () => {
        const emptyUser = new User();
        const routeComponentProps = createRouteComponentProps(null);
        renderUserRow(emptyUser, null, routeComponentProps);
        assert.equal((await screen.findByTestId("username")).textContent, "");
        assert.equal((await screen.findByTestId("email")).textContent, "");
    });
    test("should delete a user", async () => {
        const deleteUser = jest.fn();
        const routeComponentProps = createRouteComponentProps(null);
        renderUserRow(user1, deleteUser, routeComponentProps);
        await act(async () => {
            await fireEvent.click(await AbstractPage.findButton("delete"));
        });
        expect(deleteUser).toBeCalledWith(1);
    });
});

function renderUserRow(
    user: User,
    deleteUser: (id: number) => void,
    routeComponentProps: RouteComponentProps<any>,
): void {
    render(
        <Table>
            <tbody>
                <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
                    <BrowserRouter>
                        <UserRow.WrappedComponent user={user} deleteUser={deleteUser} {...routeComponentProps} />
                    </BrowserRouter>
                </IntlProvider>
            </tbody>
        </Table>,
    );
}
