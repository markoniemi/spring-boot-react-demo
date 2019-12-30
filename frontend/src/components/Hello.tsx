import React, { Component } from "react";
import "../App.css";

interface HelloState {
    message: string;
}

class Hello extends Component<Readonly<{}>, HelloState> {
    public state = { message: "" };

    public componentDidMount(): void {
        setInterval(this.hello, 250);
    }

    public hello = () => {
        fetch("/api/rest/hello", {
            method: "POST",
            body: "world",
        })
            .then(response => response.text())
            .then(message => {
                this.setState({ message: message });
            });
    };

    public render(): JSX.Element {
        return <p id="message">{this.state.message}</p>;
    }
}

export default Hello;
