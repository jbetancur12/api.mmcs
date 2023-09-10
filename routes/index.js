import express from 'express';
const router = express.Router();

import authRoute from './auth.routes.js';
import certificateTypesRoute from './certificateTypes.routes.js';
import customersRoute from './customers.routes.js';
import devicesRoute from './devices.routes.js';
import filesRoute from './files.routes.js';
import usersRoute from './users.routes.js';

const routersList = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/certificateTypes',
    route: certificateTypesRoute,
  },
  {
    path: '/devices',
    route: devicesRoute,
  },
  {
    path: '/files',
    route: filesRoute,
  },
  {
    path: '/users',
    route: usersRoute,
  },
  {
    path: '/customers',
    route: customersRoute
  }
];

routersList.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
