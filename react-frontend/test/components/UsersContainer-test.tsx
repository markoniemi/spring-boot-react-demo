import { assert } from "chai";
import * as dotenv from "dotenv";
import { user1, users } from "../userList";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import { configure, screen } from "@testing-library/react";
import UsersPage from "../pages/UsersPage";
import User from "../../src/domain/User";
import createHistory from "../HistoryMock";

describe("UsersContainer component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        fetchMock.postOnce("/api/rest/time", "message");
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("renders userlist", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        await UsersPage.render(createHistory("/users"));
        await UsersPage.assertUser("user1");
        await UsersPage.assertUser("user2");
    });
    test("creates no error with empty user", async () => {
        const emptyUser = new User();
        fetchMock.getOnce("/api/rest/users/", [emptyUser]);
        await UsersPage.render(createHistory("/users"));
        await UsersPage.assertUser("", "");
    });
    test("creates no error error with empty list", async () => {
        fetchMock.getOnce("/api/rest/users/", []);
        await UsersPage.render(createHistory("/users"));
        assert.isNotNull(await screen.getByText("Username"));
        assert.isNotNull(await screen.getByText("Email"));
    });
    test("adds user", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        const history = createHistory("/users");
        history.push = jest.fn();
        await UsersPage.render(history);
        await UsersPage.clickAddUser();
        expect(history.push).toBeCalledWith("/users/new");
    });
    test("renders error message when loading users fail", async () => {
        fetchMock.getOnce("/api/rest/users/", 401);
        await UsersPage.render(createHistory("/users"));
        assert.isNotNull(await screen.getByText("Error loading users"));
    });
    test("edits user", async () => {
        window.confirm = jest.fn();
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.getOnce("/api/rest/users/1", user1);
        await UsersPage.render(createHistory("/users"));
        await UsersPage.clickEdit("user1");
        assert.isTrue(fetchMock.done());
    });
    test("deletes user", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.deleteOnce("/api/rest/users/1", 200);
        fetchMock.getOnce("/api/rest/users/", users);
        await UsersPage.render(createHistory("/users"));
        await UsersPage.clickDelete("user1");
        assert.isTrue(fetchMock.done());
    });
    test("logs out", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        const history = createHistory("/users");
        history.push = jest.fn();
        await UsersPage.render(history);
        await UsersPage.clickLogout();
        assert.isTrue(fetchMock.done());
        expect(history.push).toBeCalledWith("/");
    });
});
