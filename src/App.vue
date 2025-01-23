<template>
  <Header v-if="!route.meta.hideHeader" />
  <RouterView />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'

const route = useRoute()
</script>
