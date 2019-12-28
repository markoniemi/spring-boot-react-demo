import React, {Component} from "react";
import "../App.css";
interface HelloState {
    message:string;
}
class Hello extends Component<any, HelloState> {
    public state = {message: ""};
    public componentDidMount() {
        setInterval(this.hello, 250);
    }
    public hello = () => {
        fetch("/api/hello", {
            method: "POST",
            body: "world",
        })
            .then((response) => response.text())
            .then((message) => {
                this.setState({message: message});
            });
    }

    public render() {
        return (
            <p id="message">{this.state.message}</p>
        );
    }
}

export default Hello;
