import { NavLink, Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto flex gap-6 p-4">
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home/ui"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            UI Components
          </NavLink>
          <NavLink
            to="/home/common"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Common Components
          </NavLink>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto mt-6">
        <Outlet />
      </div>
    </div>
  );
}
