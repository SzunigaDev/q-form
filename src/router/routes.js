const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      // Otras rutas protegidas
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/BasicLayout.vue'),  // Usar BasicLayout para login
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/BasicLayout.vue'),  // Usar BasicLayout para register
    children: [
      {
        path: '',
        component: () => import('pages/RegisterPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
