<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CursorDot from './components/CursorDot.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()

const currentPage = computed(() => {
  const name = route.name || ''
  return name.charAt(0).toUpperCase() + name.slice(1)
})
</script>

<template>
  <CursorDot />
  <AppHeader :currentPage="currentPage" />
  <router-view />
  <AppFooter />
</template>
