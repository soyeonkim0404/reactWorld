import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from '@/routes';

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
