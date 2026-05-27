<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const gifRef = ref(null)

onMounted(() => {
  // ── GIF entrata ──
  if (gifRef.value) {
    gsap.from(gifRef.value, {
      opacity: 0,
      scale: 1.06,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.3
    })
  }
})
</script>

<template>
  <!-- ══ GIF CENTRALE ══ -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none w-[60vw] max-w-lg md:max-w-none md:w-[40vw]">
    <img
      ref="gifRef"
      src="/img/titolo.gif"
      alt="Titolo"
      class="object-contain block"
    >
  </div>
</template>
