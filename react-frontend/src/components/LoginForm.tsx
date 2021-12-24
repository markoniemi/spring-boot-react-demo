import * as React from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
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
import * as Yup from "yup";
import InputField from "./InputField";

export interface ILoginForm {
    username: string;
    password: string;
}

export interface ILoginState extends ILoginForm {
    messages?: ReadonlyArray<Message>;
}

class LoginForm extends React.Component<RouteComponentProps<RouteParam>, ILoginState> {
    private schema = Yup.object().shape({
        username: Yup.string().required("username.required"),
        password: Yup.string().required("password.required"),
    });

    constructor(props: RouteComponentProps<RouteParam>) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.login = this.login.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = { username: "", password: "" };
    }

    public render(): JSX.Element {
        return (
            <Card>
                <Form.Row>
                    <Col sm={1} md={{ span: 4, offset: 4 }}>
                        <Card.Body>
                            <Card.Title>
                                <FormattedMessage id="login" />
                            </Card.Title>
                            <Messages messages={this.state.messages} />
                            <Formik
                                initialValues={this.state}
                                onSubmit={this.onSubmit}
                                enableReinitialize={true}
                                validationSchema={this.schema}
                            >
                                {this.renderForm}
                            </Formik>
                        </Card.Body>
                    </Col>
                </Form.Row>
            </Card>
        );
    }

    private renderForm(form: FormikProps<ILoginForm>): React.ReactNode {
        return (
            <FormikForm>
                <Form.Group>
                    <InputField name="username" form={form} />
                    <InputField name="password" type="password" form={form} />
                    <Col sm={5}>
                        <Button id="login" size="sm" className="pull-right" type="submit">
                            <FontAwesomeIcon icon={Icons.faCheckSquare} />
                        </Button>
                    </Col>
                </Form.Group>
            </FormikForm>
        );
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
