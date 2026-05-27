<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const cursorDot = ref(null)

onMounted(() => {
  document.addEventListener('mousemove', (e) => {
    gsap.set(cursorDot.value, { x: e.clientX, y: e.clientY })
  })
})
</script>

<template>
  <div
    ref="cursorDot"
    class="fixed z-[9999] w-2 h-2 bg-black rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
  ></div>
</template>
