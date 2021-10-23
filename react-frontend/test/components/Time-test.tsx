import { assert } from "chai";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { Alert, Button } from "react-bootstrap";
import { Messages } from "../../src/components/Messages";
import * as dotenv from "dotenv";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import Time, { TimeState } from "../../src/components/Time";

describe("Hello component", () => {
    beforeEach(() => {
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should render text", async () => {
        fetchMock.post("/api/rest/time", "response");
        const wrapper: ShallowWrapper<{}, TimeState> = shallow(<Time/>);
        await sleep(100);
        assert.equal(wrapper.find("span").text(), "response");
    });
    test("should update text after button press", async () => {
        fetchMock.postOnce("/api/rest/time", "response1");
        fetchMock.postOnce("/api/rest/time", "response2");
        const wrapper: ShallowWrapper<{}, TimeState> = shallow(<Time/>);
        await sleep(100);
        assert.equal(wrapper.find("span").text(), "response1");
        wrapper.find(Button).simulate("click");
        await sleep(100);
        assert.equal(wrapper.find("span").text(), "response2");
    });
});
