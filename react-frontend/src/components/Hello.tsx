import React from "react";
import MessageServiceImpl from "../api/MessageServiceImpl";

export interface HelloState {
    message: string;
}
// TODO change name to something else
// TODO use a button instead of interval
class Hello extends React.Component<Readonly<{}>, HelloState> {
    private interval: number;
    private helloService = new MessageServiceImpl();

    constructor(props: {}) {
        super(props);
        this.state = { message: "" };
        this.fetchMessage = this.fetchMessage.bind(this);
    }

    public override componentDidMount(): void {
        this.interval = window.setInterval(this.fetchMessage, 250);
    }

    public componentWillUnmount(): void {
        window.clearInterval(this.interval);
    }

    public async fetchMessage(): Promise<void> {
        const message = await this.helloService.getMessage();
        // const response: Response = await fetch("/api/rest/hello", {
        //     method: "POST",
        //     body: "world",
        // });
        // const message = await response.text();
        this.setState({ message: message });
    }

    public override render(): React.ReactNode {
        return <p id="message">{this.state.message}</p>;
    }
}

export default Hello;
