import * as React from "react";
import { Alert, Toast, ToastBody, ToastHeader } from "react-bootstrap";
import Message, { MessageType, MessageVariant } from "../domain/Message";
import User from "../domain/User";

export interface MessageProps {
    messages?: ReadonlyArray<Message>;
}

export interface MessageState {
    show: boolean;
}

export class Messages extends React.Component<MessageProps, MessageState> {
    // private static readonly debug: Debug.IDebugger = Debug("Messages");

    constructor(props: MessageProps) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.state = { show: true };
    }

    public render(): JSX.Element {
        if (this.props.messages != null && this.props.messages.length > 0) {
            return (
                <Toast
                    onClose={this.onClose} show={this.state.show}
                    id="messages"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                    }}
                >
                    <ToastHeader />
                    <ToastBody>{this.props.messages.map(this.renderMessage)}</ToastBody>
                </Toast>
            );
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

    private onClose() {
        this.setState({ show: false });
    }
}

export default Messages;
