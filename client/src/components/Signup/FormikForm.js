import { Formik, Field, Form, ErrorMessage } from "formik";

function FormikForm(props) {
    const initialValues = props.initialValues;
    const validationSchema = props.validationSchema;
    const handleSignup = props.handleSignup;
    const loading = props.loading;
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
        >
            <Form>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                    />
                </div>

                <div>
                    <label htmlFor="username">Username</label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" className="form-control" />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-dark" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Sign Up</span>
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

export default FormikForm;