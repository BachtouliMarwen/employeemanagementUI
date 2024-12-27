import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvaluations } from './evaluationSlice';
import DataTable from 'react-data-table-component';
import SidebarMenu from '../../components/SideBarMenu';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HREvaluations = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { evaluations, loading, error } = useSelector((state) => state.evaluations);

    useEffect(() => {
        dispatch(fetchEvaluations());
    }, [dispatch]);

    const columns = [
        { name: 'Employee', selector: (row) => row.employeeName },
        { name: 'Rating', selector: (row) => row.rating },
        { name: 'Feedback', selector: (row) => row.feedback },
        { name: 'Evaluator', selector: (row) => row.evaluatorName },
    ];

    return (
        <div className="flex">
            <SidebarMenu />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Evaluations</h1>
                    <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
                        onClick={() => navigate('/hr/evaluations/add')}
                    >
                        <FaPlus className="inline mr-2" /> Add Evaluation
                    </button>
                </div>

                {loading && <p>Loading evaluations...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <DataTable
                    columns={columns}
                    data={evaluations}
                    pagination
                    highlightOnHover
                    className="shadow-md rounded-lg"
                />
            </div>
        </div>
    );
};

export default HREvaluations;
