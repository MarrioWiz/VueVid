import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/Clientes/index.vue')
    },
    {
      path: '/clientes/create',
      name: 'create-clientes',
      component: () => import('../views/Clientes/Create.vue')
    },
    {
      path: '/clientes/edit/:id',
      name: 'edit-clientes',
      component: () => import('../views/Clientes/Edit.vue')
    },
    {
      path: '/clientes/view/:id',
      name: 'view-clientes',
      component: () => import('../views/Clientes/Vista.vue')
    },
    {
      path: '/devolucions',
      name: 'devolucions',
      component: () => import('../views/Devolucions/index.vue')
    },
    {
      path: '/devolucions/create',
      name: 'create-devolucions',
      component: () => import('../views/Devolucions/Create.vue')
    },
    {
      path: '/devolucions/edit/:id',
      name: 'edit-devolucions',
      component: () => import('../views/Devolucions/Edit.vue')
    },
    {
      path: '/devolucions/view/:id',
      name: 'view-devolucions',
      component: () => import('../views/Devolucions/Vista.vue')
    },
    {
      path: '/inventarios',
      name: 'inventarios',
      component: () => import('../views/Inventarios/index.vue')
    },
    {
      path: '/inventarios/create',
      name: 'create-inventarios',
      component: () => import('../views/Inventarios/Create.vue')
    },
    {
      path: '/inventarios/edit/:id',
      name: 'edit-inventarios',
      component: () => import('../views/Inventarios/Edit.vue')
    },
    {
      path: '/inventarios/view/:id',
      name: 'view-inventarios',
      component: () => import('../views/Inventarios/Vista.vue')
    },
    {
      path: '/vendedors',
      name: 'vendedors',
      component: () => import('../views/Vendedors/index.vue')
    },
    {
      path: '/vendedors/create',
      name: 'create-vendedors',
      component: () => import('../views/Vendedors/Create.vue')
    },
    {
      path: '/vendedors/edit/:id',
      name: 'edit-vendedors',
      component: () => import('../views/Vendedors/Edit.vue')
    },
    {
      path: '/vendedors/view/:id',
      name: 'view-vendedors',
      component: () => import('../views/Vendedors/Vista.vue')
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/Ventas/index.vue')
    },
    {
      path: '/ventas/create',
      name: 'create-ventas',
      component: () => import('../views/Ventas/Create.vue')
    },
    {
      path: '/ventas/edit/:id',
      name: 'edit-ventas',
      component: () => import('../views/Ventas/Edit.vue')
    },
    {
      path: '/ventas/view/:id',
      name: 'view-ventas',
      component: () => import('../views/Ventas/Vista.vue')
    },
    {
      path: '/graphic',
      name: 'graphic',
      component: () => import('../views/Ventas/Graphic.vue')
    }
  ]
});

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
});

export default router;
