/* eslint-disable */
import {Component} from 'react';
import React from 'react';
//import logo from '../logo.svg';
import '../App.css';

class Hello extends Component<any, any> {

    state = {message: ""};

    componentDidMount() {
        setInterval(this.hello, 250);
    }

    hello = () => {
        fetch('/api/hello', {
            method: 'POST',
            body: 'world'
        })
            .then(response => response.text())
            .then(message => {
                this.setState({message: message});
            });
    };

    render() {
        return (
            <p>{this.state.message}</p>
        );
    }
}

export default Hello;