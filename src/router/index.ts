import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import profile from '../views/user/settings/profile.vue'
import edit from '../views/user/settings/edit.vue'
import abonnoment from '../views/user/settings/abonnoment.vue'
import afbeeldingen from '../views/user/settings/afbeeldingen.vue'
import users_admin from '../views/admin/dashboard/users_admin.vue'
import abonnoment_admin from '../views/admin/dashboard/abonnoment_admin.vue'
import VerifyEmail from '../views/user/VerifyEmail.vue'
import AdminLayout from '../components/Adminheader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { hideHeader: true },
      component: HomeView,
    },
    {
      path: '/verify-email',
      meta: { hideHeader: true },
      component: VerifyEmail
    },
    {
      path: '/login',
      name: 'login',
      meta: { hideHeader: true },
      component: () => import('../views/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { hideHeader: true },
      component: () => import('../views/register.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/homepage',
      name: 'homepage',
      meta: { showNotificatie: true },
      component: () => import('../views/user/homepage.vue'),
    },
    {
      path: '/matches',
      name: 'matches',
      meta: { showNotificatie: true },
      component: () => import('../views/user/matches.vue'),
    },
    {
      path: '/search',
      name: 'search',
      meta: { showNotificatie: true },
      component: () => import('../views/user/search.vue'),
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
      path: '/info',
      name: 'info',
      meta: { hideHeader: true },
      component: () => import('../views/user/info.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { hideHeader: true },
      component: () => import('../views/user/settings.vue'),
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
        {
          path: 'afbeeldingen',
          component: afbeeldingen,
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AdminLayout,
      meta: { hideHeader: true, showSidebar: true },
      children: [
        {
          path: '',
          component: () => import('../views/admin/dashboard/dashboard.vue'),
        },
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
