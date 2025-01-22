import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import profile from '../views/user/settings/profile.vue'
import edit from '../views/user/settings/edit.vue'
import abonnoment from '../views/user/settings/abonnoment.vue'
import users_admin from '../views/admin/dashboard/users_admin.vue'
import abonnoment_admin from '../views/admin/dashboard/abonnoment_admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue'),
    },
    {
      path: '/landingspage',
      name: 'landingspage',
      component: () => import('../views/landingspage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: () => import('../views/user/homepage.vue'),
    },
    {
      path: '/matches',
      name: 'matches',
      component: () => import('../views/user/matches.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/user/chat.vue'),
    },
    {
      path: '/likes',
      name: 'likes',
      component: () => import('../views/user/likes.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/user/settings/settings.vue'),
      children: [
        {
          path: 'profile',
          component: profile,
        },
        {
          path: 'edit',
          component: edit,
        },
        {
          path: 'abonnoment',
          component: abonnoment,
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/admin/dashboard/dashboard.vue'),
      children: [
        {
          path: 'users_admin',
          component: users_admin,
        },
        {
          path: 'abonnoment_admin',
          component: abonnoment_admin,
        },
      ],
    },
  ],
})

export default router
