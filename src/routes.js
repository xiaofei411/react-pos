export const loginPageName = 'Home';
export const indexPageName = 'Dashboard';

const routes = {
  '/': loginPageName,
  '/dashboard': indexPageName,
  '/customers': 'Customers',
  '/reports': 'Reports',
  // '/settings': 'Settings',
  '/cashiers': 'Cashiers',
};

export const getPathByPageName = pageName => {
  let routeKeys = Object.keys(routes);

  for (let i = 0; i < routeKeys.length; i++) {
    if (routes[routeKeys[i]] === pageName)
      return routeKeys[i];
  }
};

export default routes;