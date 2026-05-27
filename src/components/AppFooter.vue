<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const TEAL = '#65DCBC'
const footerLinksRef = ref([])

const footerItems = [
  { label: 'davide.boselli98@gmail.com', href: 'mailto:davide.boselli98@gmail.com', external: false },
  { label: '@davideeboselli', href: 'https://instagram.com/davideeboselli', external: true },
  { label: '+39 388 774 9397', href: 'https://wa.me/393887749397', external: true },
]

function setFooterLinkRef(el, index) {
  if (el) footerLinksRef.value[index] = el
}

function handleEnter(el) {
  gsap.to(el, { color: TEAL, duration: 0.25, ease: 'power2.out' })
}
function handleLeave(el) {
  gsap.to(el, { color: '#000', duration: 0.25, ease: 'power2.out' })
}

onMounted(() => {
  gsap.from(footerLinksRef.value, {
    y: 16,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.3
  })
})
</script>

<template>
  <footer class="fixed bottom-0 left-0 right-0 z-50 hidden md:flex items-end justify-between px-12 py-7">
    <a
      v-for="(item, i) in footerItems"
      :key="item.label"
      :href="item.href"
      :target="item.external ? '_blank' : undefined"
      :rel="item.external ? 'noopener' : undefined"
      :ref="(el) => setFooterLinkRef(el, i)"
      class="text-[1vw] tracking-[-0.02em] text-black font-normal no-underline"
      @mouseenter="handleEnter($event.currentTarget)"
      @mouseleave="handleLeave($event.currentTarget)"
    >
      {{ item.label }}
    </a>
  </footer>
</template>
