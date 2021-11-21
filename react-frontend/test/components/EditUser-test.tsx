import { assert } from "chai";
import * as dotenv from "dotenv";
import { user1 } from "../userList";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import { configure, screen } from "@testing-library/react";
import EditUserPage from "../pages/EditUserPage";

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
        await EditUserPage.render(createRouteComponentProps({ id: "1" }));
        await EditUserPage.assertUser(user1.id.toString(), user1.username, user1.email, user1.role.toString());
    });
    test("should show an error", async () => {
        fetchMock.getOnce("/api/rest/users/1", 401);
        await EditUserPage.render(createRouteComponentProps({ id: "1" }));
        assert.isNotNull(await screen.getByText("Error loading user"));
    });
    test.todo("should add a user");
    test("should show validation error with empty user", async () => {
        await EditUserPage.render(createRouteComponentProps({}));
        await EditUserPage.assertUser("", "", "", "");
        await EditUserPage.clickSaveUser();
        assert.isNotNull(await screen.getByText("Username required"));
        assert.isNotNull(await screen.getByText("Password required"));
        assert.isNotNull(await screen.getByText("Email required"));
        // TODO Role does not show error text
        // assert.isNotNull(await screen.getByText("Role required"));
    });
    test("should show an error with invalid user", async () => {
        await EditUserPage.render(createRouteComponentProps({}));
        fetchMock.postOnce("/api/rest/users/", 404);
        await EditUserPage.setUser("invalid", "invalid", "invalid", "ROLE_ADMIN");
        await EditUserPage.clickSaveUser();
        assert.isNotNull(await screen.getByText("Error saving user"));
    });
    test("should edit a user", async () => {
        fetchMock.getOnce("/api/rest/users/1", user1);
        const routeComponentProps = createRouteComponentProps({ id: "1" });
        routeComponentProps.history.push = jest.fn();
        await EditUserPage.render(routeComponentProps);
        await EditUserPage.assertUser(user1.id.toString(), user1.username, user1.email, user1.role.toString());
        await EditUserPage.setUser("newUsername", "newPassword", "newEmail", "ROLE_USER");
        await EditUserPage.assertUser("1", "newUsername", "newEmail", "ROLE_USER");
        fetchMock.putOnce("/api/rest/users/1", { username: "newUsername", email: "newEmail" });
        await EditUserPage.pressEnter();
        expect(routeComponentProps.history.push).toBeCalledWith("/users");
    });
});
