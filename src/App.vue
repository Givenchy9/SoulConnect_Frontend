<template>
  <Header v-if="!route.meta.hideHeader" />
  <AdminHeader v-if="route.meta.showSidbar"/>
  <RouterView />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import AdminHeader from '@/components/Adminheader.vue'

const route = useRoute()
</script>
