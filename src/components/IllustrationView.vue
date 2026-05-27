<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const items = [
  { src: '/img/ombra.jpg' },
  { src: '/img/incubo.jpg' },
  { src: '/img/rana.jpg' },
  { src: '/img/minatore.jpg' },
  { src: '/img/odno.jpg' },
  { src: '/img/incubo2.jpg' },
  { src: '/img/topo.jpg' },
  { src: '/img/pizza.jpg' },
]

const viewportRef = ref(null)
let swiperInstance = null

onMounted(() => {
  // Inizializza Swiper esattamente come nello snippet originale
  if (viewportRef.value) {
    swiperInstance = new Swiper(viewportRef.value, {
      slidesPerView: 'auto',
      spaceBetween: window.innerWidth * 0.025,
      loop: true,
      speed: 7000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
    })
    
    gsap.from(viewportRef.value, { opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
  }
})

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
  }
})

function handleImageError(e) {
  const target = e.target
  target.style.display = 'none'
}
</script>

<template>
  <div>
    <!-- ══ SLIDER ══ -->
    <div class="swiper w-screen h-screen" ref="viewportRef">
      <div class="swiper-wrapper !items-center ![transition-timing-function:linear]">
        <div 
          class="swiper-slide !w-auto !h-auto" 
          v-for="(item, index) in items" 
          :key="index"
          :data-index="index"
        >
          <img 
            :src="item.src" 
            alt="" 
            class="w-[48vw] h-[64vw] md:w-[21vw] md:h-[30vw] object-cover block bg-black/5" 
            draggable="false"
            @error="handleImageError"
          >
        </div>
      </div>
    </div>
  </div>
</template>
