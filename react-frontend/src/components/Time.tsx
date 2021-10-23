import React from "react";
import TimeServiceImpl from "../api/TimeServiceImpl";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

export interface TimeState {
    message: string;
}

export default class Time extends React.Component<Readonly<{}>, TimeState> {
    private helloService = new TimeServiceImpl();

    constructor(props: {}) {
        super(props);
        this.state = { message: "" };
        this.fetchMessage = this.fetchMessage.bind(this);
    }

    public override componentDidMount(): void {
        this.fetchMessage();
    }

    public async fetchMessage(): Promise<void> {
        const message = await this.helloService.getTime();
        this.setState({ message: message });
    }

    public override render(): React.ReactNode {
        return (
            <>
                <Button id="fetchMessage" size="sm" onClick={this.fetchMessage}>
                    <FontAwesomeIcon icon={Icons.faClock} />
                </Button>
                <span id="message">{this.state.message}</span>
            </>
        );
    }
}
