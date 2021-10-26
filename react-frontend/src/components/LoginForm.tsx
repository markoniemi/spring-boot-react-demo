import * as React from "react";
import { Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Messages from "./Messages";
import LoginService from "../api/LoginService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Jwt from "../api/Jwt";
import Message, { MessageType } from "../domain/Message";
import { RouteParam } from "./EditUser";
import { RouteComponentProps, withRouter } from "react-router-dom";
import User from "../domain/User";

// TODO separate form and state?
export interface ILoginForm {
    username: string;
    password: string;
    messages?: ReadonlyArray<Message>;
}

class LoginForm extends React.Component<RouteComponentProps<RouteParam>, ILoginForm> {
    constructor(props: any) {
        super(props);
        this.login = this.login.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.state = { username: "", password: "" };
    }

    public render(): JSX.Element {
        return (
            <Card>
                <Row>
                    <Col sm={1} md={{span:4, offset: 4}} >
                        <Card.Body>
                            <Card.Title>
                                <FormattedMessage id="login" />
                            </Card.Title>
                            <Messages messages={this.state.messages} />
                            <Form>
                                <FormGroup>
                                    <Form.Row>
                                        <Col sm={4}>
                                            <FormLabel>
                                                <FormattedMessage id="username" />:
                                            </FormLabel>
                                        </Col>
                                        <Col sm={4}>
                                            <FormControl
                                                id="username"
                                                type="text"
                                                size="sm"
                                                autoFocus={true}
                                                onChange={this.onChangeUsername}
                                                value={this.state.username}
                                            />
                                        </Col>
                                    </Form.Row>
                                </FormGroup>
                                <FormGroup>
                                    <Form.Row>
                                        <Col sm={4}>
                                            <FormLabel>
                                                <FormattedMessage id="password" />:
                                            </FormLabel>
                                        </Col>
                                        <Col sm={4}>
                                            <FormControl
                                                id="password"
                                                type="password"
                                                size="sm"
                                                onKeyPress={this.onKeyPress}
                                                onChange={this.onChangePassword}
                                                value={this.state.password}
                                            />
                                        </Col>
                                    </Form.Row>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={5}>
                                        <Button id="login" size="sm" className="pull-right" onClick={this.login}>
                                            <FontAwesomeIcon icon={Icons.faCheckSquare} />
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        );
    }

    private onChangeUsername(event: React.ChangeEvent<any>): void {
        this.setState({
            username: event.target.value,
        });
    }

    private onChangePassword(event: React.ChangeEvent<any>): void {
        this.setState({
            password: event.target.value,
        });
    }

    private async onKeyPress(event: any): Promise<void> {
        if ("Enter" === event.key) {
            await this.login();
        }
    }

    private async login(): Promise<void> {
        const loginForm: ILoginForm = {
            password: this.state.password,
            username: this.state.username,
        };
        try {
            const token = await LoginService.login(loginForm);
            Jwt.setToken(token);
            this.props.history.push("/users");
        } catch (error) {
            this.setState({ messages: [{ text: error.message, type: MessageType.ERROR }] });
        }
    }
}

export default withRouter(LoginForm);
