import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* Layouts */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* STAK Architecture Views */
const Overview = Loadable(lazy(() => import('../views/stak/Overview')));
const ProjectsManager = Loadable(lazy(() => import('../views/stak/ProjectsManager')));
const BriefingsManager = Loadable(lazy(() => import('../views/stak/BriefingsManager')));
const SettingsManager = Loadable(lazy(() => import('../views/stak/SettingsManager')));
const FaqManager = Loadable(lazy(() => import('../views/stak/FaqManager')));
const MenusManager = Loadable(lazy(() => import('../views/stak/MenusManager')));
const ArticlesManager = Loadable(lazy(() => import('../views/stak/ArticlesManager')));
const ServicesManager = Loadable(lazy(() => import('../views/stak/ServicesManager')));
const FrontwebManager = Loadable(lazy(() => import('../views/stak/FrontwebManager')));
const MediaLibraryManager = Loadable(lazy(() => import('../views/stak/MediaLibraryManager')));
const UsersManager = Loadable(lazy(() => import('../views/stak/UsersManager')));

const routes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Overview /> },
      { path: '/frontweb', element: <FrontwebManager /> },
      { path: '/media', element: <MediaLibraryManager /> },
      { path: '/projects', element: <ProjectsManager /> },
      { path: '/briefings', element: <BriefingsManager /> },
      { path: '/users', element: <UsersManager /> },
      { path: '/settings', element: <SettingsManager /> },
      { path: '/atelier', element: <SettingsManager /> },
      { path: '/faqs', element: <FaqManager /> },
      { path: '/menus', element: <MenusManager /> },
      { path: '/articles', element: <ArticlesManager /> },
      { path: '/services', element: <ServicesManager /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
