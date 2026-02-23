import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

const HomeButton = () => {
  return (
    <Link
      to="/"
      className="fixed right-4 bottom-4 z-[9999] flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-gray-700 shadow-md transition-colors hover:bg-gray-100 hover:text-gray-900"
      aria-label="홈으로 이동"
    >
      <HomeIcon className="h-5 w-5" />
      <span className="text-sm font-medium">Home</span>
    </Link>
  );
};

export default HomeButton;
