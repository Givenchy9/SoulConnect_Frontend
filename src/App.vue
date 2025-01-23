<template>
  <Header v-if="showHeader" /> 
  <RouterView />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Header from '@/components/Header.vue'


const route = useRoute()

const showHeader = computed(() => {
  return !['login', 'register', 'home', 'settings', 'dashboard'  ].includes(route.name as string)
})
</script>
