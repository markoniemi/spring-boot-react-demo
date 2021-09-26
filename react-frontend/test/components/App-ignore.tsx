import { assert } from "chai";
import * as dotenv from "dotenv";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { Button, FormControl } from "react-bootstrap";
import EditUser, { EditUserState, RouteParam } from "../../src/components/EditUser";
import { user1, users } from "../userList";
import { RouteComponentProps } from "react-router-dom";
import createRouteComponentProps from "../RouteComponentPropsMock";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import Messages, { MessageProps } from "../../src/components/Messages";
import "isomorphic-fetch";
import UsersContainer, { UsersContainerState } from "../../src/components/UsersContainer";
import UserRow from "../../src/components/UserRow";
import App from "../../src/components/App";

describe("App component", () => {
    beforeEach(() => {
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should render app", async (done) => {
        fetchMock.getOnce("/api/rest/users/", users);
        const appWrapper: ShallowWrapper<{}, {}> = shallow(<App />);

        // const routeComponentProps = createRouteComponentProps(null);
        // const usersContainerWrapper: ShallowWrapper<Readonly<{}>, Readonly<{}>> = shallow(
        //     <App.WrappedComponent {...routeComponentProps} />,
        // );
        await sleep(1000);
        console.log(appWrapper.html());
        assert.equal(appWrapper.find("table").length, 1);
        done();
    });
    // test("should add user", async (done) => {
    //     fetchMock.getOnce("/api/rest/users/", users);
    //     const routeComponentProps = createRouteComponentProps(null);
    //     routeComponentProps.history.push = jest.fn();
    //     const usersContainerWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, UsersContainerState> = shallow(
    //         <UsersContainer.WrappedComponent {...routeComponentProps} />,
    //     );
    //     await sleep(100);
    //     usersContainerWrapper.find(Button).simulate("click");
    //     await sleep(100);
    //     expect(routeComponentProps.history.push).toBeCalledWith("/users/new");
    //     done();
    // });
    // test("should render error message", async (done) => {
    //     fetchMock.getOnce("/api/rest/users/", 401);
    //     const routeComponentProps = createRouteComponentProps(null);
    //     const usersContainerWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, UsersContainerState> = shallow(
    //         <UsersContainer.WrappedComponent {...routeComponentProps} />,
    //     );
    //     await sleep(100);
    //     assert.equal(usersContainerWrapper.find(Messages).props().messages[0].type, "ERROR");
    //     assert.equal(usersContainerWrapper.find(Messages).props().messages[0].text, "Error: Error loading users");
    //     done();
    // });
});
