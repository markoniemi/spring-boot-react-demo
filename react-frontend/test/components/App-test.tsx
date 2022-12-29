import * as dotenv from "dotenv";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import { configure } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import createHistory from "../HistoryMock";
import UsersPage from "../pages/UsersPage";
import { user1, user2, users } from "../userList";
import EditUserPage from "../pages/EditUserPage";

describe("App component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("app test", async () => {
        LoginPage.render(createHistory());
        // login
        await LoginPage.login("user1", "user1");
        await UsersPage.assertPageLoaded();
        await UsersPage.assertUser(user1.username);
        await UsersPage.assertUser(user2.username);
        // edit user
        await UsersPage.editUser(user1, "newPassword", "newEmail", "ROLE_ADMIN");
        // delete user
        await UsersPage.deleteUser(user2);
        // add user
        await UsersPage.assertPageLoaded();
        fetchMock.getOnce("/users/new", 200);
        await UsersPage.clickAddUser();
        await EditUserPage.assertUser("", "", "", "");
        await EditUserPage.setUser("user", "password", "email", "ROLE_USER");
        fetchMock.postOnce("/api/rest/users/", { username: "user", email: "email" });
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.postOnce("/api/rest/time", "message");
        await EditUserPage.clickSaveUser();
    });
});
