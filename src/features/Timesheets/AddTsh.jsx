import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTimesheet } from './timesheetSlice';

const AddTsh = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            employeeId: '',
            date: '',
            hoursWorked: '',
        },
        validationSchema: Yup.object({
            employeeId: Yup.string().required('Employee is required'),
            date: Yup.date().required('Date is required'),
            hoursWorked: Yup.number()
                .min(0)
                .max(24)
                .required('Hours worked is required'),
        }),
        onSubmit: (values) => {
            dispatch(addTimesheet(values)).then(() => navigate('/hr/timesheets'));
        },
    });

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Timesheet</h1>
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
                    <label className="block text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border rounded px-3 py-2"
                    />
                    {formik.touched.date && formik.errors.date && (
                        <p className="text-red-500">{formik.errors.date}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Hours Worked</label>
                    <input
                        type="number"
                        name="hoursWorked"
                        value={formik.values.hoursWorked}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border rounded px-3 py-2"
                    />
                    {formik.touched.hoursWorked && formik.errors.hoursWorked && (
                        <p className="text-red-500">{formik.errors.hoursWorked}</p>
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

export default AddTsh;
