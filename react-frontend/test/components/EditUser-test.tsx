import { assert } from "chai";
import * as dotenv from "dotenv";
import { user1 } from "../userList";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import { configure, screen } from "@testing-library/react";
import EditUserPage from "../pages/EditUserPage";
import createHistory from "../HistoryMock";
import LoginPage from "../pages/LoginPage";

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
        await EditUserPage.render(createHistory("/users/1"));
        await EditUserPage.assertUser(user1.id.toString(), user1.username, user1.email, user1.role.toString());
    });
    test("should show an error", async () => {
        fetchMock.getOnce("/api/rest/users/1", 401);
        await EditUserPage.render(createHistory("/users/1"));
        assert.isNotNull(await screen.getByText("Error loading user"));
    });
    test("should show validation error with empty user", async () => {
        await EditUserPage.render(createHistory("/users/1"));
        await EditUserPage.assertUser("", "", "", "");
        await EditUserPage.clickSaveUser();
        assert.isNotNull(await screen.getByText("Username required"));
        assert.isNotNull(await screen.getByText("Password required"));
        assert.isNotNull(await screen.getByText("Email required"));
        assert.isNotNull(await screen.getByText("Role required"));
    });
    test("should show an error with invalid user", async () => {
        await EditUserPage.render(createHistory("/users/new"));
        fetchMock.postOnce("/api/rest/users/", 404);
        await EditUserPage.setUser("invalid", "invalid", "invalid", "ROLE_ADMIN");
        await EditUserPage.clickSaveUser();
        assert.isNotNull(await screen.getByText("Error saving user"));
    });
    test("should add a user", async () => {
        const history = createHistory("/users/new");
        history.push = jest.fn();
        await EditUserPage.render(history);
        await EditUserPage.assertUser("", "", "", "");
        await EditUserPage.setUser("user", "password", "email", "ROLE_USER");
        fetchMock.postOnce("/api/rest/users/", { username: "user", email: "email" });
        await EditUserPage.clickSaveUser();
        expect(history.push).toBeCalledWith("/users");
        assert.isTrue(fetchMock.done());
    });
    test("should edit a user", async () => {
        fetchMock.getOnce("/api/rest/users/1", user1);
        const history = createHistory("/users/1");
        history.push = jest.fn();
        await LoginPage.render(history);
        await EditUserPage.assertUser(user1.id.toString(), user1.username, user1.email, user1.role.toString());
        await EditUserPage.setUser("newUsername", "newPassword", "newEmail", "ROLE_USER");
        await EditUserPage.assertUser("1", "newUsername", "newEmail", "ROLE_USER");
        fetchMock.putOnce("/api/rest/users/1", { username: "newUsername", email: "newEmail" });
        await EditUserPage.pressEnter();
        expect(history.push).toBeCalledWith("/users");
        assert.isTrue(fetchMock.done());
    });
});
