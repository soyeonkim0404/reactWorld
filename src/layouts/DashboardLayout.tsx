import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PageHeader from "@/components/dashboard/PageHeader";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex flex-1 flex-col p-6">
        <PageHeader
          title="Dashboard"
          actions={
            <>
              <span className="rounded-[5px] border border-[#030229]/20 bg-white px-3 py-2.5 text-[14px] font-semibold text-[#030229]">
                10-06-2021
              </span>
              <span className="rounded-[5px] border border-[#030229]/20 bg-white px-3 py-2.5 text-[14px] font-semibold text-[#030229]">
                10-10-2021
              </span>
            </>
          }
        />
        <div className="mt-6 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
