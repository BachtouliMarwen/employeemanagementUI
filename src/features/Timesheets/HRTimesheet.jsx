import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSheets } from './timesheetSlice';
import DataTable from 'react-data-table-component';
import SidebarMenu from '../../components/SideBarMenu';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HRTimesheets = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { timesheets, loading, error } = useSelector((state) => state.timesheets);

    useEffect(() => {
        dispatch(fetchTimeSheets());
    }, [dispatch]);

    const columns = [
        { name: 'Employee', selector: (row) => row.employeeName },
        { name: 'Date', selector: (row) => row.date },
        { name: 'Hours Worked', selector: (row) => row.hoursWorked },
        { name: 'Status', selector: (row) => row.status },
    ];

    return (
        <div className="flex">
            <SidebarMenu />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Timesheets</h1>
                    <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
                        onClick={() => navigate('/hr/timesheets/add')}
                    >
                        <FaPlus className="inline mr-2" /> Add Timesheet
                    </button>
                </div>

                {loading && <p>Loading timesheets...</p>}
                {error && <p className="text-red-500">{error}</p>}

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

export default HRTimesheets;
