import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { auth } from '../firebaseConfig'; // Importa la autenticación de Firebase
import { onAuthStateChanged } from 'firebase/auth';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });

  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;
    const currentUser = auth.currentUser;

    if (requiresAuth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          next(); // Usuario autenticado, permite la navegación
        } else {
          next('/login'); // Usuario no autenticado, redirige al login
        }
      });
    } else {
      next(); // La ruta no requiere autenticación, permite la navegación
    }
  });

  return Router;
});
