import AbstractPage from "./AbstractPage";
import { act, fireEvent, screen } from "@testing-library/react";
import * as React from "react";
import { assert } from "chai";
import sleep from "es7-sleep";
import { user1, users } from "../userList";
import EditUserPage from "./EditUserPage";
import User from "../../src/domain/User";
import fetchMock from "fetch-mock";

export default class UsersPage extends AbstractPage {
    static async deleteUser(user:User) {
        await UsersPage.assertPageLoaded();
        fetchMock.deleteOnce("/api/rest/users/"+user.id, 200);
        fetchMock.getOnce("/api/rest/users/", users);
        await UsersPage.clickDelete(user.username);
    }
    public static async assertPageLoaded() {
        assert.isNotNull(await this.findById("UsersContainer"));
    }
    public static async assertUser(username: string, email?: string, role?: string): Promise<void> {
        assert.isTrue((await this.getTextsById("username")).includes(username));
        if (!!email) {
            assert.isTrue((await this.getTextsById("email")).includes(email));
        }
    }

    public static async pressEnter(): Promise<void> {
        await act(async () => {
            fireEvent.keyPress(await screen.findByTestId("email"), { key: "Enter", code: "Enter", charCode: 13 });
            await sleep(100);
        });
    }
    public static async clickAddUser(): Promise<void> {
        await act(async () => {
            fireEvent.click(await AbstractPage.findButton("addUser"));
            await sleep(100);
        });
    }
    public static async clickDelete(username: string): Promise<void> {
        await act(async () => {
            window.confirm = jest.fn().mockImplementation(() => true);
            fireEvent.click(screen.getByTestId(`delete.${username}`));
            expect(window.confirm).toBeCalled();
            await sleep(100);
        });
    }
    public static async clickEdit(username: string): Promise<void> {
        await act(async () => {
            fireEvent.click(screen.getByTestId(`edit.${username}`));
            await sleep(100);
        });
    }

    static async editUser(user: User, password: string, email: string, role: string) {
        await UsersPage.assertPageLoaded();
        await UsersPage.assertUser(user.username);
        fetchMock.getOnce("/api/rest/users/" + user.id, user);
        await UsersPage.clickEdit(user.username);
        await EditUserPage.assertPageLoaded();
        await EditUserPage.assertUser(user.id.toString(), user.username, user.email, user.role);
        await EditUserPage.setUser(user.username, password, email, role);
        await EditUserPage.assertUser(user.id.toString(), user.username, email, role);
        fetchMock.putOnce("/api/rest/users/" + user.id, { username: user.username, email: email });
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.postOnce("/api/rest/time", "message");
        await EditUserPage.clickSaveUser();
    }
}
