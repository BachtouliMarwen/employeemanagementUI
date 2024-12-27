import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaves } from './leaveSlice';
import DataTable from 'react-data-table-component';
import SidebarMenu from '../../components/SideBarMenu';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HRLeaves = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { leaves, loading, error } = useSelector((state) => state.leaves);

    useEffect(() => {
        dispatch(fetchLeaves());
    }, [dispatch]);

    const columns = [
        { name: 'Employee', selector: (row) => row.employeeName },
        { name: 'Start Date', selector: (row) => row.startDate },
        { name: 'End Date', selector: (row) => row.endDate },
        { name: 'Reason', selector: (row) => row.reason },
        { name: 'Status', selector: (row) => row.status },
    ];

    return (
        <div className="flex">
            <SidebarMenu />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Leave Requests</h1>
                    <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
                        onClick={() => navigate('/hr/leaves/add')}
                    >
                        <FaPlus className="inline mr-2" /> Add Leave Request
                    </button>
                </div>

                {loading && <p>Loading leave requests...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <DataTable
                    columns={columns}
                    data={leaves}
                    pagination
                    highlightOnHover
                    className="shadow-md rounded-lg"
                />
            </div>
        </div>
    );
};

export default HRLeaves;
