import { assert } from "chai";
import * as dotenv from "dotenv";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import { configure, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";

describe("LoginForm component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should change page with valid credentials", async () => {
        const routeComponentProps = createRouteComponentProps({});
        routeComponentProps.history.push = jest.fn();
        await LoginPage.render(routeComponentProps);
        await LoginPage.setUser("", "");
        fetchMock.postOnce("/api/rest/auth/login/", 200);
        await LoginPage.setUser("user1", "user1");
        await LoginPage.assertLogin("user1", "user1");
        await LoginPage.pressEnter();
        expect(routeComponentProps.history.push).toBeCalledWith("/users");
    });
    test("should show validation error with empty credentials", async () => {
        await LoginPage.render(createRouteComponentProps({}));
        await LoginPage.assertLogin("", "");
        await LoginPage.clickLogin();
        assert.isNotNull(await screen.getByText("Username required"));
        assert.isNotNull(await screen.getByText("Password required"));
    });
    test("should show an error with invalid credentials", async () => {
        await LoginPage.render(createRouteComponentProps({}));
        await LoginPage.setUser("invalid", "invalid");
        fetchMock.postOnce("/api/rest/auth/login/", 400);
        await LoginPage.clickLogin();
        assert.isNotNull(await screen.getByText("Login error"));
    });
});
