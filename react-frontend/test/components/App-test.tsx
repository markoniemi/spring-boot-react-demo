import * as dotenv from "dotenv";
import * as React from "react";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import { configure } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import createHistory from "../HistoryMock";
import UsersPage from "../pages/UsersPage";
import {user1, users} from "../userList";
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
        await LoginPage.assertPageLoaded();
        await LoginPage.setLogin("user1", "user1");
        await LoginPage.assertLogin("user1", "user1");
        fetchMock.postOnce("/api/rest/auth/login/", 200);
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.postOnce("/api/rest/time", "message");
        await LoginPage.clickLogin();
        // edit user
        await UsersPage.assertPageLoaded();
        await UsersPage.assertUser(user1.username);
        fetchMock.getOnce("/api/rest/users/1", user1);
        await UsersPage.clickEdit("user1");
        await EditUserPage.assertPageLoaded();
        await EditUserPage.assertUser("1","user1","email1","ROLE_USER");
        await EditUserPage.setUser("user1","password","email1","ROLE_ADMIN");
        await EditUserPage.assertUser("1","user1","email1","ROLE_ADMIN");
        fetchMock.putOnce("/api/rest/users/1", { username: "user1", email: "email1" });
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.postOnce("/api/rest/time", "message");
        await EditUserPage.clickSaveUser();
        // delete user
        await UsersPage.assertPageLoaded();
        fetchMock.deleteOnce("/api/rest/users/2", 200);
        fetchMock.getOnce("/api/rest/users/", users);
        await UsersPage.clickDelete("user2");
        // add user
        await UsersPage.assertPageLoaded();
        fetchMock.getOnce("/users/new",200);
        await UsersPage.clickAddUser();
        await EditUserPage.assertUser("", "", "", "");
        await EditUserPage.setUser("user", "password", "email", "ROLE_USER");
        fetchMock.postOnce("/api/rest/users/", { username: "user", email: "email" });
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.postOnce("/api/rest/time", "message");
        await EditUserPage.clickSaveUser();
    });
});
