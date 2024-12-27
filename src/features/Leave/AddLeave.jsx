import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLeave } from './leaveSlice';

const AddLeave = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            employeeId: '',
            startDate: '',
            endDate: '',
            reason: '',
        },
        validationSchema: Yup.object({
            employeeId: Yup.string().required('Employee is required'),
            startDate: Yup.date().required('Start Date is required'),
            endDate: Yup.date().required('End Date is required'),
            reason: Yup.string().required('Reason is required'),
        }),
        onSubmit: (values) => {
            dispatch(addLeave(values)).then(() => navigate('/hr/leaves'));
        },
    });

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Leave</h1>
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
                    <label className="block text-gray-700">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border rounded px-3 py-2"
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                        <p className="text-red-500">{formik.errors.startDate}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border rounded px-3 py-2"
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                        <p className="text-red-500">{formik.errors.endDate}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Reason</label>
                    <textarea
                        name="reason"
                        value={formik.values.reason}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border rounded px-3 py-2"
                    />
                    {formik.touched.reason && formik.errors.reason && (
                        <p className="text-red-500">{formik.errors.reason}</p>
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

export default AddLeave;
