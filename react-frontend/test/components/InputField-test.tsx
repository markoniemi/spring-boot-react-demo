import { assert } from "chai";
import * as dotenv from "dotenv";
import * as React from "react";
import User from "../../src/domain/User";
import { user1 } from "../users";
import { configure, render, screen } from "@testing-library/react";
import i18nConfig from "../../src/messages/messages";
import { IntlProvider } from "react-intl";
import InputField from "../../src/components/InputField";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { ObjectSchema } from "yup";

describe("InputField component", () => {
    beforeEach(() => {
        configure({ testIdAttribute: "id" });
        dotenv.config({ path: "config/development.env" });
    });
    test.skip("renders an input field", async () => {
        const onSubmit = jest.fn();
        const schema = Yup.object().shape({
            username: Yup.string().required("username.required"),
        });
        renderInputField(user1, schema, onSubmit);
        assert.equal((await screen.findByTestId("username")).textContent, "user1");
    });
    // test("should not create error with empty user", async () => {
    //     const emptyUser = new User();
    //     renderInputField(emptyUser, null );
    //     assert.equal((await screen.findByTestId("username")).textContent, "");
    //     assert.equal((await screen.findByTestId("email")).textContent, "");
    // });
    // test("should delete a user", async () => {
    //     const deleteUser = jest.fn();
    //     const routeComponentProps = createRouteComponentProps(null);
    //     renderInputField(user1, deleteUser, routeComponentProps);
    //     await act(async () => {
    //         await fireEvent.click(await findButton("delete"));
    //     });
    //     expect(deleteUser).toBeCalledWith(1);
    // });
});

function renderInputField(user: User, schema: ObjectSchema<any>, onSubmit: () => void) {
    render(
        <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
            <Formik initialValues={user} onSubmit={onSubmit} enableReinitialize={true} validationSchema={schema}>
                {renderForm}
            </Formik>
        </IntlProvider>,
    );
}

function renderForm(form: FormikProps<User>): React.ReactNode {
    return <InputField name="name" formik={form} />;
}
