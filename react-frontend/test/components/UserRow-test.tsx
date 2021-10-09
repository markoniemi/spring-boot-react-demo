import { assert } from "chai";
import * as dotenv from "dotenv";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import UserRow, { UserProps } from "../../src/components/UserRow";
import User from "../../src/domain/User";
import { user1 } from "../userList";
import { RouteComponentProps } from "react-router-dom";
import createRouteComponentProps from "../RouteComponentPropsMock";

describe("UserRow component", () => {
    beforeEach(() => {
        dotenv.config({ path: "config/development.env" });
    });
    test("should render a user", () => {
        const routeComponentProps = createRouteComponentProps(null);
        const userWrapper: ShallowWrapper<RouteComponentProps & UserProps, Readonly<{}>> = shallow(
            <UserRow.WrappedComponent user={user1} deleteUser={null} {...routeComponentProps} />,
        );
        assert.equal(userWrapper.find("td").at(0).text(), "user1");
        assert.equal(userWrapper.find("td").at(1).text(), "email1");
    });
    test("should not create error with empty user", () => {
        const emptyUser = new User();
        const routeComponentProps = createRouteComponentProps(null);
        const userWrapper: ShallowWrapper<RouteComponentProps & UserProps, Readonly<{}>> = shallow(
            <UserRow.WrappedComponent user={emptyUser} deleteUser={null} {...routeComponentProps} />,
        );
        assert.equal(userWrapper.find("td").at(0).text(), "");
        assert.equal(userWrapper.find("td").at(1).text(), "");
    });
    test("should delete a user", () => {
        const deleteUser = jest.fn();
        const routeComponentProps = createRouteComponentProps(null);
        const userWrapper: ShallowWrapper<RouteComponentProps & UserProps, Readonly<{}>> = shallow(
            <UserRow.WrappedComponent user={user1} deleteUser={deleteUser} {...routeComponentProps} />,
        );
        userWrapper.find("#delete").at(0).simulate("click");
        expect(deleteUser).toBeCalledWith(1);
    });
});
