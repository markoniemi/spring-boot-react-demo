import { assert } from "chai";
import * as dotenv from "dotenv";
import { users } from "../userList";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import { configure, screen } from "@testing-library/react";
import UsersPage from "../pages/UsersPage";
import User from "../../src/domain/User";

describe("UsersContainer component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        fetchMock.postOnce("/api/rest/time", "message");
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should render userlist", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        await UsersPage.render(createRouteComponentProps(null));
        await UsersPage.assertUser("user1");
        await UsersPage.assertUser("user2");
    });
    test("should not create error with empty user", async () => {
        const emptyUser = new User();
        fetchMock.getOnce("/api/rest/users/", [emptyUser]);
        await UsersPage.render(createRouteComponentProps(null));
        await UsersPage.assertUser("", "");
    });
    test("should not create error with empty list", async () => {
        fetchMock.getOnce("/api/rest/users/", []);
        await UsersPage.render(createRouteComponentProps(null));
        // TODO what to assert?
    });
    test("should add user", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        const routeComponentProps = createRouteComponentProps(null);
        routeComponentProps.history.push = jest.fn();
        await UsersPage.render(routeComponentProps);
        await UsersPage.clickAddUser("user1");
        expect(routeComponentProps.history.push).toBeCalledWith("/users/new");
    });
    test("should render error message", async () => {
        fetchMock.getOnce("/api/rest/users/", 401);
        await UsersPage.render(createRouteComponentProps(null));
        assert.isNotNull(await screen.getByText("Error loading users"));
    });
    test("should delete user", async () => {
        window.confirm = jest.fn();
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.deleteOnce("/api/rest/users/1", 200);
        fetchMock.getOnce("/api/rest/users/", users);
        await UsersPage.render(createRouteComponentProps(null));
        await UsersPage.clickDelete("user1");
        assert.isTrue(fetchMock.done());
    });
});
