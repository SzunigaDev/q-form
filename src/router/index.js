import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import { auth } from '../firebaseConfig';
import routes from './routes'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;
    const currentUser = auth.currentUser;

    if (requiresAuth && !currentUser) {
      next('/login');
    } else {
      next();
    }
  });

  return Router;
})
