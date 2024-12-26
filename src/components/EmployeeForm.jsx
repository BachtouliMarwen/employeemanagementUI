import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateEmployee } from '../features/User/userSlice';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = ({ editingId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employees } = useSelector((state) => state.employees);

    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });

    useEffect(() => {
        if (editingId) {
            const employee = employees.find((emp) => emp.id === editingId);
            setForm(employee || { firstName: '', lastName: '', email: '', phone: '' });
        }
    }, [editingId, employees]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            dispatch(updateEmployee({ id: editingId, employee: form }));
        } else {
            dispatch(createEmployee(form));
        }
        navigate('/hr/employees');
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border rounded px-2 py-1"
            />
            <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border rounded px-2 py-1"
            />
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border rounded px-2 py-1"
            />
            <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="border rounded px-2 py-1"
            />
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">
                {editingId ? 'Update Employee' : 'Add Employee'}
            </button>
        </form>
    );
};

EmployeeForm.propTypes = {
    editingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default EmployeeForm;
