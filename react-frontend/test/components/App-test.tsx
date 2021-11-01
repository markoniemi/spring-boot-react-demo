import * as dotenv from "dotenv";
import * as React from "react";
import fetchMock from "fetch-mock";
import "isomorphic-fetch";
import { configure } from "@testing-library/react";

describe("App component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test.todo("should render app");
});
