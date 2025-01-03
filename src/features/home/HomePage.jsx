import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeTimesheets } from '../Timesheets/timesheetSlice';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import SidebarMenu from '../../components/SideBarMenu';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { timesheets, loading, error } = useSelector((state) => state.timesheets);

    useEffect(() => {
        const employeeId = localStorage.getItem('employeeId');
        if (employeeId) {
            dispatch(fetchEmployeeTimesheets(employeeId));
        }
    }, [dispatch]);

    const columns = [
        { name: 'Date', selector: (row) => row.date },
        { name: 'Hours Worked', selector: (row) => row.hoursWorked },
    ];

    return (
        <div className="flex">
            <SidebarMenu />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Timesheets</h1>
                    <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
                        onClick={() => navigate('/employee/timesheet/add')}
                    >
                        <FaPlus className="inline mr-2" /> Add Timesheet
                    </button>
                </div>

                {loading && <p>Loading timesheets...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && timesheets.length === 0 && (
                    <p className="text-gray-500">No timesheets available.</p>
                )}

                <DataTable
                    columns={columns}
                    data={timesheets}
                    pagination
                    highlightOnHover
                    className="shadow-md rounded-lg"
                />
            </div>
        </div>
    );
};

export default HomePage;
