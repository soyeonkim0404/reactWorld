import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-gray-50 p-4">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Dashboard</h2>
        <nav className="flex flex-col gap-1">
          <Link
            to="/dashboard"
            className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            개요
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
