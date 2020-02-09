import * as React from "react";
import User from "../domain/User";
import UserService from "../api/UserService";
import UserServiceImpl from "../api/UserServiceImpl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Messages from "./Messages";
import Message, { MessageType } from "../domain/Message";
import { Button, Card, Col, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";

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
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.state = { user: new User("", "", "") };
    }

    public async componentDidMount(): Promise<void> {
        const id = Number(this.props.match.params.id);
        if (id) {
            try {
                this.setState({ user: await this.userService.findById(id) });
            } catch (error) {
                this.setState({ messages: [{ text: error.toString(), type: MessageType.ERROR }] });
            }
        }
    }

    public render(): JSX.Element {
        return (
            <Card>
                <Card.Title>
                    <FormattedMessage id="user"/>
                </Card.Title>
                <Card.Body>
                    <Messages messages={this.state.messages}/>
                    <Form>
                        <FormGroup>
                            <Col sm={1}>
                                <FormLabel>
                                    <FormattedMessage id="id"/>:
                                </FormLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    disabled={true}
                                    type="text"
                                    size="sm"
                                    autoFocus={true}
                                    value={this.state.user.id ? this.state.user.id.toString() : ""}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <FormLabel>
                                    <FormattedMessage id="username"/>:
                                </FormLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    id="username"
                                    name="username"
                                    type="text"
                                    size="sm"
                                    autoFocus={true}
                                    value={this.state.user.username}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <FormLabel>
                                    <FormattedMessage id="email"/>:
                                </FormLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    id="email"
                                    name="email"
                                    type="text"
                                    size="sm"
                                    value={this.state.user.email}
                                    // onKeyPress={this.onKeyPress}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <FormLabel>
                                    <FormattedMessage id="password"/>:
                                </FormLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    id="password"
                                    name="password"
                                    type="password"
                                    size="sm"
                                    value={this.state.user.password}
                                    // onKeyPress={this.onKeyPress}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <FormLabel>
                                    <FormattedMessage id="role"/>:
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
                                    value={this.state.user.role}
                                    onChange={this.onChange}
                                >
                                    <FormattedMessage id="role.ROLE_ADMIN">
                                        {(message) => <option value="ROLE_ADMIN">{message}</option>}
                                    </FormattedMessage>
                                    <FormattedMessage id="role.ROLE_USER">
                                        {(message) => <option value="ROLE_USER">{message}</option>}
                                    </FormattedMessage>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={5}>
                                <Button id="saveUser" size="sm" className="pull-right" onClick={this.submitUser}>
                                    OK
                                    {/*<Glyphicon glyph="glyphicon glyphicon-ok"/>*/}
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    private onChange(event: React.ChangeEvent<any>): void {
        const { name, value } = event.target;
        this.setState(state => ({ user: { ...this.state.user, [name]: value } }));
    }

    private async onKeyPress(event: React.KeyboardEvent<FormControl>): Promise<void> {
        if ("Enter" === event.key) {
            await this.submitUser();
        }
    }

    private async submitUser(): Promise<void> {
        const user: User = this.state.user;
        try {
            if (user.id == undefined) {
                await this.userService.create(user);
            } else {
                await this.userService.update(user);
            }
        } catch (error) {
            this.setState({ messages: [{ text: error.toString(), type: MessageType.ERROR }] });
        }
        this.props.history.push("/");
    }
}

export default withRouter(EditUser);
