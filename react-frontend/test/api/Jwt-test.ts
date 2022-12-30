import { assert } from "chai";
import Jwt from "../../src/api/Jwt";

describe("Jwt", () => {
    test("isAuthenticated returns false if sessionStorage does not have token", () => {
        assert.isFalse(Jwt.isAuthenticated());
    });
    test("isAuthenticated returns true if sessionStorage has token", () => {
        Jwt.setToken("token");
        sessionStorage.setItem(Jwt.JWT_TOKEN_KEY, "token");
        assert.isTrue(Jwt.isAuthenticated());
        assert.equal(sessionStorage.getItem(Jwt.JWT_TOKEN_KEY), "token");
    });
    test("isAuthenticated returns false if sessionStorage is cleared", () => {
        sessionStorage.setItem(Jwt.JWT_TOKEN_KEY, "token");
        Jwt.clearToken();
        assert.isFalse(Jwt.isAuthenticated());
        assert.isNull(sessionStorage.getItem(Jwt.JWT_TOKEN_KEY));
    });
});
