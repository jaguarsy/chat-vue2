import Login from './pages/Login';
import Register from './pages/Register';
import Index from './pages/Index';

const routes = [{
  path: '/',
  name: 'index',
  component: Index,
  meta: {
    requireAuth: true,
  },
}, {
  path: '/login',
  name: 'login',
  component: Login,
}, {
  path: '/register',
  name: 'register',
  component: Register,
}];

export default routes;
