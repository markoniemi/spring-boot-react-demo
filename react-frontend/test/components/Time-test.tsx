import { assert } from "chai";
import * as React from "react";
import * as dotenv from "dotenv";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import Time from "../../src/components/Time";
import { act, configure, fireEvent, render, screen } from "@testing-library/react";
import { findButton } from "./EditUser-test";

describe("Hello component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should render text", async () => {
        fetchMock.post("/api/rest/time", "response");
        render(<Time />);
        await sleep(100);
        assert.equal((await screen.findByTestId("message")).textContent, "response");
    });
    test.skip("should update text after button press", async () => {
        fetchMock.postOnce("/api/rest/time", "response1");
        fetchMock.postOnce("/api/rest/time", "response2");
        render(<Time />);
        await sleep(100);
        assert.equal((await screen.findByTestId("message")).textContent, "response1");
        await act(async () => {
            await fireEvent.click(await findButton("fetchMessage"));
            await sleep(100);
        });
        assert.equal((await screen.findByTestId("message")).textContent, "response2");
    });
});
