import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton'

const SidebarMenu = () => {
    const menuItems = [
        { name: 'Employees', path: '/hr/employees' },
        { name: 'Leaves', path: '/leaves' },
        { name: 'Timesheets', path: '/timesheets' },
        { name: 'Evaluations', path: '/evaluations' },
    ];

    return (
        <div className="w-64 h-screen bg-indigo-500 text-white flex flex-col p-4">
            <h2 className="text-2xl font-bold mb-6">HR Dashboard</h2>
            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-indigo-900 bg-white px-3 py-2 rounded-lg block'
                                    : 'hover:bg-indigo-700 px-3 py-2 rounded-lg block'
                            }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <LogoutButton/>
        </div>
    );
};

export default SidebarMenu;
