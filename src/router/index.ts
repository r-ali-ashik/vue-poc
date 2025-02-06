/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
// import { routes } from 'vue-router/auto-routes'
import type { RouteRecordRaw } from 'vue-router'

// Import pages
const DashboardPage = () => import('@/pages/dashboard.vue')
const UserList = () => import('@/pages/user-list.vue')
const LoginPage = () => import('@/pages/login.vue')
const ManageUser = () => import('@/pages/user-manage.vue')

// Define routes
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: DashboardPage
      },
      {
        path: 'users',
        component: UserList
      },
      {
        path: 'manage-user',
        component: ManageUser
      },
    ],
  },
  {
    path: '/login',
    component: LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
