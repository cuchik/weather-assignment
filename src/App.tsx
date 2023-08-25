import React from 'react';
import { Route, Routes } from 'react-router';
import PublicLayout from 'src/layout/Public';
import RoutesList from './routes';

const App = () => {
  const renderRoutes = () => {
    const renderRoute = (Component: React.FC) => {
      if (Component) {
        return (
          <PublicLayout>
            <Component />
          </PublicLayout>
        );
      }
      return null;
    };

    return RoutesList.map((route) => (
      <Route
        key={route.name}
        path={route.path}
        element={renderRoute(route.component)}
      />
    ));
  };

  return (
    <div>
      <Routes>{renderRoutes()}</Routes>
    </div>
  );
};

export default App;
