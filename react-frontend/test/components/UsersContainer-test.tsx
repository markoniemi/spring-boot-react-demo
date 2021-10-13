import { assert } from "chai";
import * as dotenv from "dotenv";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { Button } from "react-bootstrap";
import { RouteParam } from "../../src/components/EditUser";
import { users } from "../userList";
import { RouteComponentProps } from "react-router-dom";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import Messages from "../../src/components/Messages";
import "isomorphic-fetch";
import UsersContainer, { UsersContainerState } from "../../src/components/UsersContainer";
import UserRow from "../../src/components/UserRow";
import log, { LogLevelDesc } from "loglevel";
import * as process from "process";

describe("UsersContainer component", () => {
    beforeEach(() => {
        dotenv.config({ path: "config/development.env" });
        log.setLevel(process.env.LOG_LEVEL as LogLevelDesc);
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should render userlist", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        const routeComponentProps = createRouteComponentProps(null);
        const usersContainerWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, UsersContainerState> = shallow(
            <UsersContainer.WrappedComponent {...routeComponentProps} />,
        );
        await sleep(100);
        assert.equal(usersContainerWrapper.find(UserRow).length, 2);
    });
    test("should add user", async () => {
        fetchMock.getOnce("/api/rest/users/", users);
        const routeComponentProps = createRouteComponentProps(null);
        routeComponentProps.history.push = jest.fn();
        const usersContainerWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, UsersContainerState> = shallow(
            <UsersContainer.WrappedComponent {...routeComponentProps} />,
        );
        await sleep(100);
        usersContainerWrapper.find("#addUser").simulate("click");
        await sleep(100);
        expect(routeComponentProps.history.push).toBeCalledWith("/users/new");
    });
    test("should render error message", async () => {
        fetchMock.getOnce("/api/rest/users/", 401);
        const routeComponentProps = createRouteComponentProps(null);
        const usersContainerWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, UsersContainerState> = shallow(
            <UsersContainer.WrappedComponent {...routeComponentProps} />,
        );
        await sleep(100);
        assert.equal(usersContainerWrapper.find(Messages).props().messages[0].type, "ERROR");
        assert.equal(usersContainerWrapper.find(Messages).props().messages[0].text, "Error: Error loading users");
    });
    test("should delete user", async () => {
        window.confirm = jest.fn();
        fetchMock.getOnce("/api/rest/users/", users);
        fetchMock.deleteOnce("/api/rest/users/", 200);
        const routeComponentProps = createRouteComponentProps(null);
        const usersContainerWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, UsersContainerState> = shallow(
            <UsersContainer.WrappedComponent {...routeComponentProps} />,
        );
        await sleep(100);
        log.debug(usersContainerWrapper.debug());
        const userRowWrapper: ShallowWrapper = usersContainerWrapper.find(UserRow).at(0);
        userRowWrapper.getElement().props.deleteUser();
        await sleep(100);
        assert.isTrue(fetchMock.done());
    });
});
