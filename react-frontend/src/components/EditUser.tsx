import React from "react";
import User from "../domain/User";
import UserService from "../api/UserService";
import UserServiceImpl from "../api/UserServiceImpl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Messages from "./Messages";
import Message, { MessageType } from "../domain/Message";
import { Button, Card, Col, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { Form as FormikForm, Formik, FormikProps } from "formik";

export interface RouteParam {
    id: string;
}

export interface EditUserState {
    user: User;
    messages?: ReadonlyArray<Message>;
}

class EditUser extends React.Component<RouteComponentProps<RouteParam>, EditUserState> {
    private userService: UserService = new UserServiceImpl();

    constructor(props) {
        super(props);
        // window.onbeforeunload = () => true;
        this.onKeyPress = this.onKeyPress.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = { user: new User("", "", "") };
    }

    public override async componentDidMount(): Promise<void> {
        const id = Number(this.props.match.params.id);
        if (id) {
            try {
                this.setState({ user: await this.userService.findById(id) });
            } catch (error) {
                this.setState({ messages: [{ text: error.message, type: MessageType.ERROR }] });
            }
        }
    }

    public override render(): React.ReactNode {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        <FormattedMessage id="user" />
                    </Card.Title>
                    <Formik initialValues={this.state.user} onSubmit={this.onSubmit} enableReinitialize={true}>
                        {this.renderForm}
                    </Formik>
                </Card.Body>
            </Card>
        );
    }

    private renderForm(form?: FormikProps<User>): React.ReactNode {
        return (
            <FormikForm>
                <Messages messages={this.state.messages} />
                <FormGroup>
                    <Form.Row>
                        <Col sm={1}>
                            <FormLabel>
                                <FormattedMessage id="id" />:
                            </FormLabel>
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                data-testid
                                id="id"
                                name="id"
                                disabled={true}
                                type="text"
                                size="sm"
                                autoFocus={true}
                                value={form.values.id ? form.values.id.toString() : ""}
                                onChange={form.handleChange}
                            />
                        </Col>
                    </Form.Row>
                </FormGroup>
                <FormGroup>
                    <Form.Row>
                        <Col sm={1}>
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
                                onChange={form.handleChange}
                                value={form.values.username}
                            />
                        </Col>
                    </Form.Row>
                </FormGroup>
                <FormGroup>
                    <Form.Row>
                        <Col sm={1}>
                            <FormLabel>
                                <FormattedMessage id="email" />:
                            </FormLabel>
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                id="email"
                                name="email"
                                type="text"
                                size="sm"
                                onChange={form.handleChange}
                                value={form.values.email}
                                onKeyPress={this.onKeyPress}
                            />
                        </Col>
                    </Form.Row>
                </FormGroup>
                <FormGroup>
                    <Form.Row>
                        <Col sm={1}>
                            <FormLabel>
                                <FormattedMessage id="password" />:
                            </FormLabel>
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                id="password"
                                name="password"
                                // type="password"
                                size="sm"
                                onChange={form.handleChange}
                                value={form.values.password}
                                onKeyPress={this.onKeyPress}
                            />
                        </Col>
                    </Form.Row>
                </FormGroup>
                <FormGroup>
                    <Form.Row>
                        <Col sm={1}>
                            <FormLabel>
                                <FormattedMessage id="role" />:
                            </FormLabel>
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                as="select"
                                placeholder="select"
                                id="role"
                                name="role"
                                type="select"
                                size="sm"
                                onChange={form.handleChange}
                                value={form.values.role}
                            >
                                <option value="" />
                                <FormattedMessage id="role.ROLE_ADMIN">
                                    {(message) => <option value="ROLE_ADMIN">{message}</option>}
                                </FormattedMessage>
                                <FormattedMessage id="role.ROLE_USER">
                                    {(message) => <option value="ROLE_USER">{message}</option>}
                                </FormattedMessage>
                            </FormControl>
                        </Col>
                    </Form.Row>
                </FormGroup>
                <FormGroup>
                    <Form.Row>
                        <Col sm={5}>
                            <Button type="submit" id="saveUser" size="sm" className="pull-right">
                                <FontAwesomeIcon icon={Icons.faCheckSquare} />
                            </Button>
                        </Col>
                    </Form.Row>
                </FormGroup>
            </FormikForm>
        );
    }

    private async onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): Promise<void> {
        if ("Enter" === event.key) {
            await this.submitUser();
        }
    }

    public async onSubmit(values: User) {
        this.setState({ user: values });
        await this.submitUser();
    }

    private async submitUser(): Promise<void> {
        const user: User = this.state.user;
        try {
            if (user.id == undefined) {
                await this.userService.create(user);
            } else {
                await this.userService.update(user);
            }
            this.props.history.push("/users");
        } catch (error) {
            this.setState({ messages: [{ text: error.message, type: MessageType.ERROR }] });
        }
    }
}

export default withRouter(EditUser);
