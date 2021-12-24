import AbstractPage from "./AbstractPage";
import { act, fireEvent, screen } from "@testing-library/react";
import * as React from "react";
import { assert } from "chai";
import sleep from "es7-sleep";

export default class LoginPage extends AbstractPage {
    public static async assertLogin(username: string, password: string): Promise<void> {
        assert.equal(await this.getValueById("username"), username);
        assert.equal(await this.getValueById("password"), password);
    }

    public static async setUser(username: string, password: string): Promise<void> {
        await act(async () => {
            await this.setText("username", username);
            await this.setText("password", password);
        });
    }
    public static async pressEnter(): Promise<void> {
        await act(async () => {
            fireEvent.keyPress(await screen.findByTestId("password"), { key: "Enter", code: "Enter", charCode: 13 });
            await sleep(100);
        });
    }

    public static async clickLogin(): Promise<void> {
        await act(async () => {
            fireEvent.click(await LoginPage.findButton("login"));
            await sleep(100);
        });
    }
}
