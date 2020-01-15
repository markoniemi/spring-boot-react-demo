import { assert } from "chai";
import * as dotenv from "dotenv";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { Button, FormControl } from "react-bootstrap";
import EditUser, { EditUserState, RouteParam } from "../../src/components/EditUser";
import { user1 } from "../userList";
import { RouteComponentProps } from "react-router-dom";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import Messages from "../../src/components/Messages";
import "isomorphic-fetch";

describe("EditUser component", () => {
    beforeEach(() => {
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should render a user", async (done) => {
        fetchMock.getOnce("/api/rest/users/1", user1);
        const routeComponentProps = createRouteComponentProps({ id: "1" });
        const userWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, EditUserState> = shallow(
            <EditUser.WrappedComponent {...routeComponentProps} />,
        );
        await sleep(100);
        assert.equal(userWrapper.find(FormControl).at(0).prop("value"), "1");
        assert.equal(userWrapper.find(FormControl).at(1).prop("value"), "user1");
        assert.equal(userWrapper.find(FormControl).at(2).prop("value"), "email1");
        done();
    });
    test("should show an error", async (done) => {
        fetchMock.getOnce("/api/rest/users/1", 401);
        const routeComponentProps = createRouteComponentProps({ id: "1" });
        const userWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, EditUserState> = shallow(
            <EditUser.WrappedComponent {...routeComponentProps} />,
        );
        await sleep(100);
        assert.equal(userWrapper.find(Messages).props().messages[0].type, "ERROR");
        assert.equal(userWrapper.find(Messages).props().messages[0].text, "Error: Error loading user");
        done();
    });
    test("should edit a user", async (done) => {
        fetchMock.getOnce("/api/rest/users/1", user1);
        fetchMock.putOnce("/api/rest/users/1", 200);
        const routeComponentProps = createRouteComponentProps({ id: "1" });
        const userWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, EditUserState> = shallow(
            <EditUser.WrappedComponent {...routeComponentProps} />,
        );
        await sleep(100);
        // username
        let formControl: ShallowWrapper<any, any> = userWrapper.find(FormControl).at(1);
        assert.equal(formControl.prop("value"), "user1");
        formControl.simulate("change", { target: { name: "username", value: "newUsername" } });
        assert.equal(userWrapper.state().user.username, "newUsername");
        // email
        formControl = userWrapper.find(FormControl).at(2);
        assert.equal(formControl.prop("value"), "email1");
        formControl.simulate("change", { target: { name: "email", value: "newEmail" } });
        assert.equal(userWrapper.state().user.email, "newEmail");
        await userWrapper.find(Button).at(0).simulate("click");
        await sleep(100);
        // TODO how to verify fetchMock was called
        done();
    });
});
