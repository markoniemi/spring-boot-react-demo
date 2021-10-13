import { assert } from "chai";
import Jwt from "../../src/api/Jwt";

describe("Jwt", () => {
    test("isAuthenticated returns false if sessionStorage does not have token", () => {
        assert.isFalse(Jwt.isAuthenticated());
    });
    test("isAuthenticated returns true if sessionStorage has token", () => {
        sessionStorage.setItem(Jwt.JWT_TOKEN_KEY, "token");
        assert.isTrue(Jwt.isAuthenticated());
    });
    test("isAuthenticated returns false if sessionStorage is cleared", () => {
        sessionStorage.removeItem(Jwt.JWT_TOKEN_KEY);
        assert.isFalse(Jwt.isAuthenticated());
    });
});
