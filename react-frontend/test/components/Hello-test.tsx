import { assert } from "chai";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { Alert } from "react-bootstrap";
import { Messages } from "../../src/components/Messages";
import * as dotenv from "dotenv";
import fetchMock from "fetch-mock";
import sleep from "es7-sleep";
import Hello, { HelloState } from "../../src/components/Hello";

describe("Hello component", () => {
    beforeEach(() => {
        dotenv.config({ path: "config/development.env" });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test("should render text", async () => {
        fetchMock.post("/api/rest/hello", "response");
        const wrapper: ShallowWrapper<{}, HelloState> = shallow(<Hello/>);
        await sleep(500);
        assert.equal(wrapper.find("p").text(), "response");
    });
    // test("should render messages", () => {
    //     const wrapper: ShallowWrapper<MessageProps, {}> = shallow(<Messages messages={messages}/>);
    //     console.log(wrapper.debug());
    //     assert.isNotNull(wrapper.find(Messages));
    //     assert.isNotNull(wrapper.find(Alert));
    //     assert(wrapper.find(Alert).text, "success");
    //     assert(wrapper.find(Alert).text, "success");
    // });
});
