import { assert } from "chai";
import * as dotenv from "dotenv";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import { configure, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import createHistory from "../HistoryMock";

describe("LoginForm component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        dotenv.config({ path: "config/development.env" });
        fetchMock.postOnce("/api/rest/time", "message");
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should change page with valid credentials", async () => {
        const history = createHistory();
        history.push = jest.fn();
        await LoginPage.render(history);
        await LoginPage.setLogin("", "");
        fetchMock.postOnce("/api/rest/auth/login/", 200);
        await LoginPage.setLogin("user1", "user1");
        await LoginPage.assertLogin("user1", "user1");
        await LoginPage.pressEnter();
        expect(history.push).toBeCalledWith("/users");
    });
    test("should show validation error with empty credentials", async () => {
        await LoginPage.render(createHistory());
        await LoginPage.assertLogin("", "");
        await LoginPage.clickLogin();
        assert.isNotNull(await screen.getByText("Username required"));
        assert.isNotNull(await screen.getByText("Password required"));
    });
    test("should show an error with invalid credentials", async () => {
        await LoginPage.render(createHistory());
        await LoginPage.setLogin("invalid", "invalid");
        fetchMock.postOnce("/api/rest/auth/login/", 400);
        await LoginPage.clickLogin();
        assert.isNotNull(await screen.getByText("Login error"));
    });
});
