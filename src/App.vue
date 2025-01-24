<template>
  <Header v-if="!route.meta.hideHeader" />
  <AdminHeader v-if="route.meta.showSidbar"/>
  <RouterView />
  <FloatingButton/>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import AdminHeader from '@/components/Adminheader.vue'
import FloatingButton from '@/components/FloatingButton.vue'


const route = useRoute()
</script>
