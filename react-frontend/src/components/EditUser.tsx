import React from "react";
import User from "../domain/User";
import UserService from "../api/UserService";
import UserServiceImpl from "../api/UserServiceImpl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Messages from "./Messages";
import Message, { MessageType } from "../domain/Message";
import { Button, Card, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { Form as FormikForm, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";

export interface RouteParam {
    id: string;
}

export interface EditUserState {
    user: User;
    messages?: ReadonlyArray<Message>;
}

class EditUser extends React.Component<RouteComponentProps<RouteParam>, EditUserState> {
    private userService: UserService = new UserServiceImpl();
    private schema = Yup.object().shape({
        username: Yup.string().required("username.required"),
        email: Yup.string().required("email.required"),
        password: Yup.string().required("password.required"),
        role: Yup.string().required("role.required"),
    });

    constructor(props) {
        super(props);
        this.submitUser = this.submitUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = { user: new User("", "", "", null) };
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
            <Card id="EditUser">
                <Card.Body>
                    <Card.Title>
                        <FormattedMessage id="user" />
                    </Card.Title>
                    <Formik
                        initialValues={this.state.user}
                        onSubmit={this.onSubmit}
                        enableReinitialize={true}
                        validationSchema={this.schema}
                    >
                        {this.renderForm}
                    </Formik>
                </Card.Body>
            </Card>
        );
    }

    private renderForm(form: FormikProps<User>): React.ReactNode {
        return (
            <FormikForm>
                <Messages messages={this.state.messages} />
                <Form.Group>
                    <InputField
                        name="id"
                        disabled={true}
                        value={form.values.id ? form.values.id.toString() : ""}
                        form={form}
                    />
                    <InputField name="username" form={form} />
                    <InputField name="email" form={form} />
                    <InputField name="password" type="password" form={form} />
                    <InputField name="role" type="select" as="select" form={form}>
                        <option value={null} />
                        <FormattedMessage id="role.ROLE_ADMIN">
                            {(message) => <option value="ROLE_ADMIN">{message}</option>}
                        </FormattedMessage>
                        <FormattedMessage id="role.ROLE_USER">
                            {(message) => <option value="ROLE_USER">{message}</option>}
                        </FormattedMessage>
                    </InputField>
                    <Form.Row>
                        <Col sm={5}>
                            <Button type="submit" id="saveUser" size="sm" className="pull-right">
                                <FontAwesomeIcon icon={Icons.faCheckSquare} />
                            </Button>
                        </Col>
                    </Form.Row>
                </Form.Group>
            </FormikForm>
        );
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
