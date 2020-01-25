import * as React from "react";
import { Button, Col, ControlLabel, Dropdown, Form, FormControl, FormGroup, Glyphicon, Panel } from "react-bootstrap";
import User from "../domain/User";
import UserService from "../api/UserService";
import UserServiceImpl from "../api/UserServiceImpl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Messages from "./Messages";
import Message, { MessageType } from "../domain/Message";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

export interface RouteParam {
    id: string;
}

export interface EditUserState {
    user: User;
    messages?: ReadonlyArray<Message>;
}

class EditUser extends React.Component<RouteComponentProps<RouteParam> & InjectedIntlProps, EditUserState> {
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
            <Panel>
                <Panel.Heading>
                    <FormattedMessage id="user"/>
                </Panel.Heading>
                <Panel.Body>
                    <Messages messages={this.state.messages}/>
                    <Form horizontal={true}>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>
                                    <FormattedMessage id="id"/>:
                                </ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    disabled={true}
                                    type="text"
                                    bsSize="small"
                                    autoFocus={true}
                                    value={this.state.user.id ? this.state.user.id.toString() : ""}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>
                                    <FormattedMessage id="username"/>:
                                </ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    id="username"
                                    name="username"
                                    type="text"
                                    bsSize="small"
                                    autoFocus={true}
                                    value={this.state.user.username}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>
                                    <FormattedMessage id="email"/>:
                                </ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    id="email"
                                    name="email"
                                    type="text"
                                    bsSize="small"
                                    value={this.state.user.email}
                                    onKeyPress={this.onKeyPress}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>
                                    <FormattedMessage id="password"/>:
                                </ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    id="password"
                                    name="password"
                                    type="password"
                                    bsSize="small"
                                    value={this.state.user.password}
                                    onKeyPress={this.onKeyPress}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>
                                    <FormattedMessage id="role"/>:
                                </ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    id="role"
                                    name="role"
                                    type="select"
                                    bsSize="small"
                                    value={this.state.user.role}
                                    onChange={this.onChange}
                                >
                                    <option value="ROLE_ADMIN">Admin</option>
                                    <option value="ROLE_USER">User</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={5}>
                                <Button id="saveUser" bsSize="small" className="pull-right" onClick={this.submitUser}>
                                    <Glyphicon glyph="glyphicon glyphicon-ok"/>
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
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

export default withRouter(injectIntl(EditUser));
