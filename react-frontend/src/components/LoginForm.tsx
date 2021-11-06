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
import { Form as FormikForm, Formik, FormikProps } from "formik";

export interface ILoginForm {
    username: string;
    password: string;
}

export interface ILoginState extends ILoginForm {
    messages?: ReadonlyArray<Message>;
}

class LoginForm extends React.Component<RouteComponentProps<RouteParam>, ILoginState> {
    constructor(props: RouteComponentProps<RouteParam>) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.login = this.login.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = { username: "", password: "" };
    }

    public render(): JSX.Element {
        return (
            <Card>
                <Row>
                    <Col sm={1} md={{ span: 4, offset: 4 }}>
                        <Card.Body>
                            <Card.Title>
                                <FormattedMessage id="login" />
                            </Card.Title>
                            <Messages messages={this.state.messages} />
                            <Formik initialValues={this.state} onSubmit={this.onSubmit} enableReinitialize={true}>
                                {this.renderForm}
                            </Formik>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        );
    }

    private renderForm(form?: FormikProps<ILoginForm>): React.ReactNode {
        return (
            <FormikForm>
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
                                name="username"
                                type="text"
                                size="sm"
                                autoFocus={true}
                                onChange={form.handleChange}
                                value={form.values.username}
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
                                name="password"
                                type="password"
                                size="sm"
                                onChange={form.handleChange}
                                onKeyPress={this.onKeyPress}
                                value={form.values.password}
                            />
                        </Col>
                    </Form.Row>
                </FormGroup>
                <FormGroup>
                    <Col sm={5}>
                        <Button id="login" size="sm" className="pull-right" type="submit">
                            <FontAwesomeIcon icon={Icons.faCheckSquare} />
                        </Button>
                    </Col>
                </FormGroup>
            </FormikForm>
        );
    }

    private async onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): Promise<void> {
        if ("Enter" === event.key) {
            await this.login();
        }
    }

    public async onSubmit(values: ILoginForm) {
        this.setState({
            password: values.password,
            username: values.username,
        });
        await this.login();
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
