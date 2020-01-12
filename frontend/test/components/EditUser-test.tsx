import { assert } from "chai";
import * as dotenv from "dotenv";
import { shallow, ShallowWrapper } from "enzyme";
import * as fetchMock from "fetch-mock";
import * as React from "react";
import { FormControl } from "react-bootstrap";
import EditUser, { EditUserState, RouteParam } from "../../src/components/EditUser";
import User from "../../src/domain/User";
import { user1 } from "../userList";
import { RouteComponentProps } from "react-router-dom";
import UserRow, { UserProps } from "../../src/components/UserRow";
import createRouteComponentProps from "../RouteComponentPropsMock";

describe("EditUser component", () => {
    beforeEach(() => {
        dotenv.config({ path: "config/development.env" });
        // fetchMock.spy();
    });
    afterEach(() => {
        // fetchMock.restore();
    });
    test("should render a user", () => {
        const routeComponentProps = createRouteComponentProps({ id: "1" });
        const userWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, EditUserState> = shallow(
            <EditUser.WrappedComponent {...routeComponentProps} />,
        );
        expect(userWrapper).toMatchSnapshot();
        // assert.equal(userWrapper.find(FormControl).at(0).prop("value"), "1", "Expected to have value");
        // assert.equal(userWrapper.find(FormControl).at(1).prop("value"), "user1", "Expected to have value");
        // assert.equal(userWrapper.find(FormControl).at(2).prop("value"), "email1", "Expected to have value");
    });
    // test("should not create error with empty user", () => {
    //     const emptyUser = new User();
    //     const userWrapper: ShallowWrapper<RouteComponentProps<RouteParam>, EditUserState> = shallow(<EditUser />);
    //     expect(userWrapper).toMatchSnapshot();
    //     // assert.equal(userWrapper.state("index"), 0);
    //     // assert.equal(userWrapper.state("username"), "");
    // });
    // test("should edit a user", async (done) => {
    //     fetchMock.postOnce(UserApi.getApiUrl(), user1);
    //     fetchMock.putOnce(UserApi.getApiUrl() + "1", 200);
    //     await store.dispatch(UserActions.addUser(user1));
    //     const editUserWrapper: ShallowWrapper<IEditUser, Partial<User>> = shallow(
    //         <EditUser
    //             user={user1}
    //             saveUser={UserContainer.saveUser}
    //         />);
    //     // username
    //     let formControl: ShallowWrapper<any, any> = editUserWrapper.find(FormControl).at(1);
    //     assert.equal(formControl.prop("defaultValue"), "user1");
    //     formControl.simulate("change", { target: { value: "newUsername" } });
    //     assert.equal(editUserWrapper.state().username, "newUsername");
    //     // email
    //     formControl = editUserWrapper.find(FormControl).at(2);
    //     assert.equal(formControl.prop("defaultValue"), "email1");
    //     formControl.simulate("change", { target: { value: "newEmail" } });
    //     assert.equal(editUserWrapper.state().email, "newEmail");
    //     await editUserWrapper.find(Button).at(0).simulate("click");
    //     await sleep(100);
    //     assert.equal(store.getState().users.length, 1, "store should have a new user");
    //     assert.equal(store.getState().users[0].username, "newUsername");
    //     assert.equal(store.getState().users[0].email, "newEmail");
    //     done();
    // });
    // test("edit with keyboard", async (done) => {
    //     fetchMock.postOnce(UserApi.getApiUrl(), user1);
    //     fetchMock.putOnce(UserApi.getApiUrl() + "1", 200);
    //     await store.dispatch(UserActions.addUser(user1));
    //     const editUserWrapper: ShallowWrapper<IEditUser, Partial<User>> = shallow(
    //         <EditUser
    //             user={user1}
    //             saveUser={UserContainer.saveUser}
    //         />);
    //     // username
    //     let formControl: ShallowWrapper<any, any> = editUserWrapper.find(FormControl).at(1);
    //     assert.equal(formControl.prop("defaultValue"), "user1");
    //     formControl.simulate("change", { target: { value: "newUsername" } });
    //     assert.equal(editUserWrapper.state().username, "newUsername");
    //     // email
    //     formControl = editUserWrapper.find(FormControl).at(2);
    //     assert.equal(formControl.prop("defaultValue"), "email1");
    //     formControl.simulate("change", { target: { value: "newEmail" } });
    //     assert.equal(editUserWrapper.state().email, "newEmail");
    //     await formControl.simulate("keyPress", { key: "Enter" });
    //     await sleep(100);
    //     assert.equal(store.getState().users.length, 1, "store should have a new user");
    //     assert.equal(store.getState().users[0].username, "newUsername");
    //     assert.equal(store.getState().users[0].email, "newEmail");
    //     done();
    // });
});
