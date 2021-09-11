import { assert } from "chai";
import * as dotenv from "dotenv";
import "isomorphic-fetch";
import UserService from "../../src/api/UserService";
import UserServiceImpl from "../../src/api/UserServiceImpl";
import fetchMock from "fetch-mock";
import { user1, users } from "../userList";
import User from "../../src/domain/User";

const userService: UserService = new UserServiceImpl();
describe("UserService", () => {
    beforeEach(() => {
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("fetchUsers", async (done) => {
        fetchMock.getOnce("/api/rest/users/", users);
        const fetchedUsers = await userService.fetchUsers();
        assert.equal(fetchedUsers.length, 2);
        done();
    });
    test("fetchUsers fails", async (done) => {
        fetchMock.getOnce("/api/rest/users/", 401);
        await expect(userService.fetchUsers()).rejects.toThrow();
        done();
    });
    test("findById", async (done) => {
        fetchMock.getOnce("/api/rest/users/1", user1);
        const user = await userService.findById(1);
        assert.equal(user.username, "user1");
        done();
    });
    test("findById", async (done) => {
        fetchMock.getOnce("/api/rest/users/1", 401);
        await expect(userService.findById(1)).rejects.toThrow();
        done();
    });
    test("create", async (done) => {
        const userMock: User = new User("user3", "user3", "email3", 3);
        fetchMock.postOnce("/api/rest/users/", userMock);
        const user: User = new User("user3", "user3", "email3");
        const savedUser = await userService.create(user);
        assert.equal(savedUser.username, "user3");
        assert.equal(savedUser.id, 3);
        done();
    });
    test("create fails", async (done) => {
        fetchMock.postOnce("/api/rest/users/", 500);
        await expect(userService.create(null)).rejects.toThrow();
        done();
    });
    test("update", async (done) => {
        const userMock: User = new User("user2", "user2", "email2", 2);
        fetchMock.putOnce("/api/rest/users/2", userMock);
        const user: User = new User("user2", "user2", "email2", 2);
        const savedUser = await userService.update(user);
        assert.equal(savedUser.username, "user2");
        done();
    });
    test("update fails", async (done) => {
        fetchMock.putOnce("/api/rest/users/1", 500);
        await expect(userService.update(user1)).rejects.toThrow();
        done();
    });
    test("delete", async (done) => {
        fetchMock.deleteOnce("/api/rest/users/2", 200);
        const savedUser = await userService.delete(2);
        done();
    });
    test("delete fails", async (done) => {
        fetchMock.deleteOnce("/api/rest/users/2", 500);
        await expect(userService.delete(2)).rejects.toThrow();
        done();
    });
});
