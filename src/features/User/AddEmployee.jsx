import EmployeeForm from '../../components/EmployeeForm';

const AddEmployee = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
            <EmployeeForm />
        </div>
    );
};

export default AddEmployee;
