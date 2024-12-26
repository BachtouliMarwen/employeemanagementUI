import { useParams } from 'react-router-dom';
import EmployeeForm from '../../components/EmployeeForm';

const EditEmployee = () => {
    const { id } = useParams();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
            <EmployeeForm editingId={id} />
        </div>
    );
};

export default EditEmployee;
