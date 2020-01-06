import * as React from "react";
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Panel } from "react-bootstrap";
import User from "../domain/User";
import { UserService } from "../api/UserService";
import UserServiceImpl from "../api/UserServiceImpl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface RouteParam {
    id: string;
}

class EditUser extends React.Component<RouteComponentProps<RouteParam>, User> {
    private userService: UserService = new UserServiceImpl();

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.state = new User("", "", "");
    }

    public async componentDidMount(): Promise<void> {
        const id = Number(this.props.match.params.id);
        if (id) {
            this.setState(await this.userService.findById(id));
        }
    }

    public render(): JSX.Element {
        return (
            <Panel>
                <Panel.Heading>
                    <FormattedMessage id="user" />
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal={true}>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>
                                    <FormattedMessage id="id" />:
                                </ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    disabled={true}
                                    type="text"
                                    bsSize="small"
                                    autoFocus={true}
                                    value={this.state.id ? this.state.id.toString() : ""}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>
                                    <FormattedMessage id="username" />:
                                </ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    id="username"
                                    name="username"
                                    type="text"
                                    bsSize="small"
                                    autoFocus={true}
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>
                                    <FormattedMessage id="email" />:
                                </ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    id="email"
                                    name="email"
                                    type="text"
                                    bsSize="small"
                                    value={this.state.email}
                                    onKeyPress={this.onKeyPress}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <ControlLabel>
                                    <FormattedMessage id="password" />:
                                </ControlLabel>
                            </Col>
                            <Col sm={4}>
                                <FormControl
                                    id="password"
                                    name="password"
                                    type="password"
                                    bsSize="small"
                                    value={this.state.password}
                                    onKeyPress={this.onKeyPress}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={5}>
                                <Button id="saveUser" bsSize="small" className="pull-right" onClick={this.submitUser}>
                                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        );
    }

    private onChange(event: React.ChangeEvent<any>): void {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value,
        });
    }

    private async onKeyPress(event: React.KeyboardEvent<FormControl>): Promise<void> {
        if ("Enter" === event.key) {
            await this.submitUser();
        }
    }

    private async submitUser(): Promise<void> {
        const user: User = this.state;
        if (user.id == undefined) {
            await this.userService.create(user);
        } else {
            await this.userService.update(user);
        }
        this.props.history.push("/");
    }
}

export default withRouter(EditUser);
