import AbstractPage from "./AbstractPage";
import { act, fireEvent, screen } from "@testing-library/react";
import * as React from "react";
import { assert } from "chai";
import sleep from "es7-sleep";

export default class UsersPage extends AbstractPage {
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
}
