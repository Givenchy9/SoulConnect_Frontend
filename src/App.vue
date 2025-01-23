<template>
  <Header v-if="showHeader" />
  <RouterView />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Header from '@/components/Header.vue'

const route = useRoute()

// List of paths where the header should not be shown
const excludedPaths = [
  '/login',
  '/register',
  '/home',
  '/settings',
  '/settings/profile',
  '/settings/edit',
  '/settings/abonnoment',
  '/settings/afbeeldingen',
  '/dashboard',
  '/dashboard/users_admin',
  '/dashboard/abonnoment_admin'
]

const showHeader = computed(() => {
  return !excludedPaths.some(excludedPath => route.path.startsWith(excludedPath))
})
</script>
