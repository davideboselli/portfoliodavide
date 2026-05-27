<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router = useRouter()
const TEAL = '#65DCBC'

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'About', to: '/about' },
  { label: 'Graphic', to: '/graphic' },
  { label: 'Illustration', to: '/illustration' },
  { label: '3D', to: '/3d' },
]

const props = defineProps({
  currentPage: {
    type: String,
    default: 'Home'
  }
})

// Burger state
const menuOpen = ref(false)
const burger = ref(null)
const b1 = ref(null)
const b2 = ref(null)
const b3 = ref(null)
const mobileMenu = ref(null)
const navLinksRef = ref([])

function setNavLinkRef(el, index) {
  if (el) navLinksRef.value[index] = el
}

function isActive(item) {
  return item.label.toLowerCase() === props.currentPage.toLowerCase()
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    mobileMenu.value.classList.remove('pointer-events-none')
    gsap.to(mobileMenu.value, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    gsap.to(b2.value, { opacity: 0, duration: 0.2 })
    gsap.to(b1.value, { y: 6, rotate: 45, duration: 0.3, ease: 'power2.out' })
    gsap.to(b3.value, { y: -6, rotate: -45, duration: 0.3, ease: 'power2.out' })
    const menuLinks = mobileMenu.value.querySelectorAll('a')
    gsap.from(menuLinks, { y: 20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.1 })
  } else {
    mobileMenu.value.classList.add('pointer-events-none')
    gsap.to(mobileMenu.value, { opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(b2.value, { opacity: 1, duration: 0.2, delay: 0.1 })
    gsap.to(b1.value, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(b3.value, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' })
  }
}

function closeMenuAndNavigate(to) {
  if (menuOpen.value) {
    menuOpen.value = false
    mobileMenu.value.classList.add('pointer-events-none')
    gsap.to(mobileMenu.value, { opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(b2.value, { opacity: 1, duration: 0.2, delay: 0.1 })
    gsap.to(b1.value, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(b3.value, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' })
  }
  router.push(to)
}

function handleDesktopEnter(el) {
  gsap.to(el, { color: TEAL, duration: 0.25, ease: 'power2.out' })
}
function handleDesktopLeave(el, item) {
  gsap.to(el, { color: isActive(item) ? TEAL : '#000', duration: 0.25, ease: 'power2.out' })
}
function handleMobEnter(el) {
  gsap.to(el, { color: TEAL, duration: 0.2 })
}
function handleMobLeave(el, item) {
  gsap.to(el, { color: isActive(item) ? TEAL : '#000', duration: 0.2 })
}

onMounted(() => {
  gsap.from(navLinksRef.value, {
    y: -16,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.2
  })
})
</script>

<template>
  <!-- ══ NAV DESKTOP ══ -->
  <nav class="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-center gap-12 px-12 py-7">
    <router-link
      v-for="(item, i) in navItems"
      :key="item.label"
      :to="item.to"
      :ref="(el) => setNavLinkRef(el?.$el || el, i)"
      class="nav-link relative text-[1vw] tracking-[-0.02em] uppercase font-normal no-underline transition-none"
      :style="{ color: isActive(item) ? TEAL : '#000' }"
      @mouseenter="handleDesktopEnter($event.currentTarget)"
      @mouseleave="handleDesktopLeave($event.currentTarget, item)"
    >
      {{ item.label }}
      <span
        class="active-dot absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"
        :class="{ hidden: !isActive(item) }"
      ></span>
    </router-link>
  </nav>

  <!-- ══ BURGER MOBILE ══ -->
  <div class="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-6 py-5">
    <button
      ref="burger"
      class="flex flex-col gap-1.5 bg-transparent border-none p-0 cursor-pointer"
      @click="toggleMenu"
    >
      <span ref="b1" class="block w-6 h-px bg-black"></span>
      <span ref="b2" class="block w-6 h-px bg-black"></span>
      <span ref="b3" class="block w-6 h-px bg-black"></span>
    </button>
  </div>

  <!-- ══ MENU MOBILE overlay ══ -->
  <div
    ref="mobileMenu"
    class="fixed inset-0 z-40 bg-white flex flex-col px-8 py-24 opacity-0 pointer-events-none"
  >
    <nav class="flex flex-col gap-8 flex-1">
      <a
        v-for="item in navItems"
        :key="item.label"
        href="#"
        class="text-[8vw] tracking-[-0.02em] uppercase font-normal no-underline"
        :style="{ color: isActive(item) ? TEAL : '#000' }"
        @click.prevent="closeMenuAndNavigate(item.to)"
        @mouseenter="handleMobEnter($event.currentTarget)"
        @mouseleave="handleMobLeave($event.currentTarget, item)"
      >
        {{ item.label }}
      </a>
    </nav>
    <footer class="flex flex-col gap-3 mt-16 pt-8 border-t border-black/10 pb-2">
      <a
        href="mailto:davide.boselli98@gmail.com"
        class="text-[3.5vw] tracking-[-0.02em] text-black font-normal no-underline"
        @mouseenter="handleMobEnter($event.currentTarget)"
        @mouseleave="handleMobLeave($event.currentTarget, {})"
      >davide.boselli98@gmail.com</a>
      <a
        href="https://instagram.com/davideeboselli"
        target="_blank"
        rel="noopener"
        class="text-[3.5vw] tracking-[-0.02em] text-black font-normal no-underline"
        @mouseenter="handleMobEnter($event.currentTarget)"
        @mouseleave="handleMobLeave($event.currentTarget, {})"
      >@davideeboselli</a>
      <a
        href="https://wa.me/393887749397"
        target="_blank"
        rel="noopener"
        class="text-[3.5vw] tracking-[-0.02em] text-black font-normal no-underline"
        @mouseenter="handleMobEnter($event.currentTarget)"
        @mouseleave="handleMobLeave($event.currentTarget, {})"
      >+39 388 774 9397</a>
    </footer>
  </div>
</template>
