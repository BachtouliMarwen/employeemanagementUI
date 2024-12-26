import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee } from '../User/userSlice';
import DataTable from 'react-data-table-component';
import { FaTrash, FaEdit } from 'react-icons/fa';
import SidebarMenu from '../../components/SideBarMenu';
import ConfirmationModal from '../../components/ConfirmationModal';

const EmployeeManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employees, loading, error } = useSelector((state) => state.employees);

    const [deleteId, setDeleteId] = useState(null);

    const handleAdd = () => navigate('/hr/employees/add');
    const handleEdit = (id) => navigate(`/hr/employees/edit/${id}`);
    const handleDelete = (id) => setDeleteId(id);
    const confirmDelete = () => {
        dispatch(deleteEmployee(deleteId));
        setDeleteId(null);
    };

    const columns = [
        { name: 'First Name', selector: (row) => row.firstName },
        { name: 'Last Name', selector: (row) => row.lastName },
        { name: 'Email', selector: (row) => row.email },
        { name: 'Phone', selector: (row) => row.phone },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEdit(row.id)} className="text-blue-500">
                        <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="text-red-500">
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex">
            <SidebarMenu />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Employee Management</h1>
                    <button
                        onClick={handleAdd}
                        className="bg-indigo-500 text-white px-4 py-2 rounded"
                    >
                        Add Employee
                    </button>
                </div>

                {loading && <p>Loading employees...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                <DataTable
                    columns={columns}
                    data={employees}
                    pagination
                    highlightOnHover
                    className="shadow-md rounded-lg"
                />

                <ConfirmationModal
                    isOpen={deleteId !== null}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteId(null)}
                    message="Are you sure you want to delete this employee?"
                />
            </div>
        </div>
    );
};

export default EmployeeManagement;
