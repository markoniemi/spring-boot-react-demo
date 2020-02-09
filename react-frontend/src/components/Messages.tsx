import * as React from "react";
import { Alert } from "react-bootstrap";
import Message, { MessageType, MessageVariant } from "../domain/Message";

export interface MessageProps {
    messages?: ReadonlyArray<Message>;
}

export class Messages extends React.Component<MessageProps, {}> {
    // private static readonly debug: Debug.IDebugger = Debug("Messages");

    constructor(props: MessageProps) {
        super(props);
    }

    public render(): JSX.Element {
        if (this.props.messages != null && this.props.messages.length > 0) {
            // return <Toast></Toast>
            return <div id="messages">{this.props.messages.map(this.renderMessage)}</div>;
        } else {
            return null;
        }
    }

    private renderMessage(message: Message): JSX.Element {
        return (
            <Alert variant={Messages.mapTypeToStyle(message.type)} key={message.id}>
                {message.text}
            </Alert>
        );
    }

    private static mapTypeToStyle(type: MessageType): MessageVariant {
        if (type === MessageType.ERROR) {
            return "danger";
        }
        if (type === MessageType.WARN) {
            return "warning";
        }
        if (type === MessageType.SUCCESS) {
            return "success";
        }
        return "info";
    }
}

export default Messages;
