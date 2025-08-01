import * as dotenv from "dotenv";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import {configure} from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import UsersPage from "../pages/UsersPage";
import {user1, user2, users} from "../users";
import EditUserPage from "../pages/EditUserPage";
import {sleep} from "../time";
import {afterEach, beforeEach, describe, test} from "vitest";
import Role from "../../src/domain/Role.ts";

describe("App component", () => {
    beforeEach(() => {
        configure({testIdAttribute: "id"});
        dotenv.config({path: ".env"});
        fetchMock.mockGlobal();
    });
    afterEach(() => {
        fetchMock.hardReset();
    });
    test("shows login page", async () => {
        await LoginPage.render();
        await sleep(100);
        LoginPage.assertPageLoaded();
    });
    test("login, edit, delete and add user", async () => {
        await LoginPage.render();
        // login
        await LoginPage.login("user1", "user1");
        await UsersPage.assertPageLoaded();
        await UsersPage.assertUser(user1?.username);
        await UsersPage.assertUser(user2.username);
        // edit user
        await UsersPage.editUser(user1, "newPassword", "newEmail", Role.ROLE_ADMIN);
        // delete user
        await UsersPage.deleteUser(user2);
        // add user
        await UsersPage.assertPageLoaded();
        await UsersPage.clickAddUser();
        await EditUserPage.assertUser(undefined, "", "", undefined);
        await EditUserPage.setUser("newUser", "password", "email", "ROLE_USER");
        fetchMock.postOnce("/api/rest/users/", {username: "newUser", email: "email"});
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.postOnce("/api/rest/time", "message");
        await EditUserPage.clickSaveUser();
        sleep(100);
    });
});
