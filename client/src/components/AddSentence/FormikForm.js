import { Formik, Field, Form, ErrorMessage } from "formik";

function FormikForm(props) {
    const initialValues = props.initialValues;
    const handleSubmit = props.handleSubmit
    const loading = props.loading
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <Form>
                <div>
                    <label htmlFor="text">Username</label>
                    <Field name="text" type="text" as="text-area" className="form-control" />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-dark" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Add</span>
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

export default FormikForm;