import { assert } from "chai";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { Alert } from "react-bootstrap";
import { MessageProps, Messages } from "../../src/components/Messages";
import { messages } from "../messageList";

describe("Messages component", () => {
    test("should not create error with empty user list", () => {
        const wrapper: ShallowWrapper<MessageProps, {}> = shallow(<Messages messages={[]}/>);
        assert.isNotNull(wrapper.find(Messages));
        assert.equal(wrapper.find(Alert).length, 0);
    });
    test("should render messages", () => {
        const wrapper: ShallowWrapper<MessageProps, {}> = shallow(<Messages messages={messages}/>);
        assert.isNotNull(wrapper.find(Messages));
        assert.isNotNull(wrapper.find(Alert));
        assert(wrapper.find(Alert).text, "success");
    });
});
