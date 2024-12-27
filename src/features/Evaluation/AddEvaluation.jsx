import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEvaluation } from './evaluationSlice';

const AddEvaluation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            employeeId: '',
            rating: '',
            feedback: '',
        },
        validationSchema: Yup.object({
            employeeId: Yup.string().required('Employee is required'),
            rating: Yup.number().min(0).max(5).required('Rating is required'),
            feedback: Yup.string().required('Feedback is required'),
        }),
        onSubmit: (values) => {
            dispatch(addEvaluation(values)).then(() => navigate('/hr/evaluations'));
        },
    });

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Evaluation</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Employee</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={formik.values.employeeId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border rounded px-3 py-2"
                    />
                    {formik.touched.employeeId && formik.errors.employeeId && (
                        <p className="text-red-500">{formik.errors.employeeId}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border rounded px-3 py-2"
                    />
                    {formik.touched.rating && formik.errors.rating && (
                        <p className="text-red-500">{formik.errors.rating}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Feedback</label>
                    <textarea
                        name="feedback"
                        value={formik.values.feedback}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border rounded px-3 py-2"
                    />
                    {formik.touched.feedback && formik.errors.feedback && (
                        <p className="text-red-500">{formik.errors.feedback}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddEvaluation;
