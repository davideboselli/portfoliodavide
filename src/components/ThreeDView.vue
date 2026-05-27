<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const TEAL = '#65DCBC'

// ── Dati immagini ──
const items = [
  { src: '/img/render 1 2.jpg', title: 'Tha Supe', sub: '3D · 2025' },
  { src: '/img/Render 1 3.jpg', title: 'Little nightmers', sub: '3D · 2025' },
  { src: '/img/Render 1 4.jpg', title: 'Ogrim', sub: '3D · 2025' },
  { src: '/img/Render 1.jpg', title: 'Nut house', sub: '3D · 2025' },
  { src: '/img/render 2 2.jpg', title: 'Tha Supe', sub: '3D · 2025' },
  { src: '/img/Render 2.jpg', title: 'Nut house', sub: '3D · 2025' },
  { src: '/img/Render 5.jpg', title: 'Ogrim', sub: '3D · 2025' },
  { src: '/img/Render 11.jpg', title: 'Little nightmers', sub: '3D · 2025' },
  { src: '/img/hardcore.jpg', title: 'Tony the gabber', sub: '3D · 2025' },
  { src: '/img/shiva.jpg', title: 'Shiva', sub: '3D · 2025' },
  { src: '/img/se.jpg', title: 'Sfera', sub: '3D · 2025' },
  { src: '/img/salmo.jpg', title: 'Salmo', sub: '3D · 2025' },
  { src: '/img/robot.jpg', title: 'Robot', sub: '3D · 2025' },
  { src: '/img/RENDER_35.jpg', title: 'Ninja', sub: '3D · 2025' },
  { src: '/img/zac.jpg', title: 'Zac the cat', sub: '3D · 2025' },
]

const trackRef = ref(null)
const mobTrackRef = ref(null)
const gridVPRef = ref(null)

const desktopCells = ref([])
const mobileCells = ref([])

function setDesktopCellRef(el, index) {
  if (el) desktopCells.value[index] = el
}
function setMobileCellRef(el, index) {
  if (el) mobileCells.value[index] = el
}

function handleWheel(e) {
  if (gridVPRef.value) {
    e.preventDefault()
    gridVPRef.value.scrollLeft += e.deltaY + e.deltaX
  }
}

onMounted(() => {
  // ── Scroll orizzontale con rotella ──
  if (gridVPRef.value) {
    gridVPRef.value.addEventListener('wheel', handleWheel, { passive: false })
  }

  // ── Entrata celle desktop ──
  if (desktopCells.value.length) {
    gsap.from(desktopCells.value, {
      opacity: 0, scale: 0.96,
      duration: 0.6, stagger: 0.04,
      ease: 'power2.out', delay: 0.3
    })
  }

  // ── Entrata celle mobile ──
  if (mobileCells.value.length) {
    gsap.from(mobileCells.value, {
      opacity: 0, scale: 0.96,
      duration: 0.6, stagger: 0.04,
      ease: 'power2.out', delay: 0.3
    })
  }
})

onBeforeUnmount(() => {
  if (gridVPRef.value) {
    gridVPRef.value.removeEventListener('wheel', handleWheel)
  }
})

function handleEnter(e) {
  const overlay = e.currentTarget.querySelector('.item-overlay')
  const title = e.currentTarget.querySelector('.item-title')
  const sub = e.currentTarget.querySelector('.item-sub')
  
  gsap.to(overlay, { backgroundColor: 'rgba(0,0,0,0.52)', duration: 0.3, ease: 'power2.out' })
  gsap.to([title, sub], { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' })
}

function handleLeave(e) {
  const overlay = e.currentTarget.querySelector('.item-overlay')
  const title = e.currentTarget.querySelector('.item-title')
  const sub = e.currentTarget.querySelector('.item-sub')
  
  gsap.to(overlay, { backgroundColor: 'rgba(0,0,0,0)', duration: 0.3, ease: 'power2.in' })
  gsap.to([title, sub], { opacity: 0, y: 6, duration: 0.2, ease: 'power2.in' })
}

function handleImageError(e, title) {
  const target = e.target
  const parent = target.parentElement
  target.remove()
  parent.style.background = '#e5e5e5'
  
  const ph = document.createElement('div')
  ph.className = 'absolute inset-0 flex items-end p-4 md:p-5 pointer-events-none'
  ph.innerHTML = `<span style="font-size:clamp(10px,0.8vw,13px);color:#999;letter-spacing:-0.02em;">${title}</span>`
  parent.appendChild(ph)
}
</script>

<template>
  <div>
    <!-- ══ GRIGLIA ORIZZONTALE ══ -->
    <!-- Desktop: scroll orizzontale con 3 righe fisse -->
    <div 
      ref="gridVPRef" 
      id="grid-viewport" 
      class="hidden md:flex w-screen h-screen items-center overflow-x-scroll overflow-y-hidden pt-[72px] pb-[60px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div 
        ref="trackRef" 
        id="grid-track" 
        class="flex flex-col flex-wrap gap-[2px] h-full" 
        style="width:max-content;"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          :ref="el => setDesktopCellRef(el, index)"
          class="relative overflow-hidden flex-none cursor-pointer"
          style="height: calc(100vh - 132px); width: calc((100vh - 132px) * 0.8);"
          @mouseenter="handleEnter"
          @mouseleave="handleLeave"
        >
          <img :src="item.src" :alt="item.title" class="w-full h-full object-cover block" @error="handleImageError($event, item.title)">
          
          <div class="item-overlay absolute inset-0 flex flex-col items-center justify-center p-4 md:p-5 pointer-events-none" style="background: rgba(0,0,0,0); transition: none;">
            <p class="item-title" style="font-size:clamp(14px,1.4vw,20px); color:#fff; letter-spacing:-0.02em; opacity:0; transform:translateY(8px); margin:0 0 6px; text-align:center;">{{ item.title }}</p>
            <p class="item-sub" style="font-size:clamp(9px,0.8vw,12px); color:rgba(255,255,255,0.6); letter-spacing:0.1em; text-transform:uppercase; opacity:0; transform:translateY(8px); margin:0; text-align:center;">{{ item.sub }}</p>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Mobile: scroll verticale, 1 colonna -->
    <div 
      id="grid-mobile" 
      class="flex md:hidden flex-col w-screen h-screen overflow-y-scroll overflow-x-hidden pt-20 pb-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div class="flex flex-col gap-[2px]" ref="mobTrackRef" id="grid-mobile-track">
        <div
          v-for="(item, index) in items"
          :key="index"
          :ref="el => setMobileCellRef(el, index)"
          class="relative overflow-hidden flex-none w-full"
          style="height: 100vw;"
          @mouseenter="handleEnter"
          @mouseleave="handleLeave"
        >
          <img :src="item.src" :alt="item.title" class="w-full h-full object-cover block" @error="handleImageError($event, item.title)">
          
          <div class="item-overlay absolute inset-0 flex flex-col items-center justify-center p-4 md:p-5 pointer-events-none" style="background: rgba(0,0,0,0); transition: none;">
            <p class="item-title" style="font-size:clamp(14px,1.4vw,20px); color:#fff; letter-spacing:-0.02em; opacity:0; transform:translateY(8px); margin:0 0 6px; text-align:center;">{{ item.title }}</p>
            <p class="item-sub" style="font-size:clamp(9px,0.8vw,12px); color:rgba(255,255,255,0.6); letter-spacing:0.1em; text-transform:uppercase; opacity:0; transform:translateY(8px); margin:0; text-align:center;">{{ item.sub }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
