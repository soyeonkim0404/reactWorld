import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import { routes } from "@/routes";
import HomeButton from "@/components/common/HomeButton";

const AppRoutes = () => {
  const location = useLocation();
  const element = useRoutes(routes);
  const showHomeButton = location.pathname !== "/";

  return (
    <>
      {showHomeButton && <HomeButton />}
      {element}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
