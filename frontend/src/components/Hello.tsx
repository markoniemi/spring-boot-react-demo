import React, { Component } from "react";
import "../App.css";

interface HelloState {
    message: string;
}

class Hello extends Component<Readonly<{}>, HelloState> {
    constructor(props) {
        super(props);
        this.state = { message: "" };
        this.fetchMessage = this.fetchMessage.bind(this);
    }

    public componentDidMount(): void {
        setInterval(this.fetchMessage, 250);
    }

    public async fetchMessage(): Promise<void> {
        const response: Response = await fetch("/api/rest/hello", {
            method: "POST",
            body: "world",
        });
        const message = await response.text();
        this.setState({ message: message });
    }

    public render(): JSX.Element {
        return <p id="message">{this.state.message}</p>;
    }
}

export default Hello;
