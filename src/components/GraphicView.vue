<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isMobile = ref(window.innerWidth < 768);

const updateMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', updateMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMobile);
});

const imgData = [
  { 
    src: '/img/Compositing 4.jpg', 
    images: ['/img/Post 1.jpg','/img/Post 4.jpg','/img/giornale.jpg','/img/Phone.png'], 
    wD: '32vw', wM: '75vw', 
    topD: '5%', topM: '5%', 
    leftD: '4%', leftM: '12%', 
    title: 'ACD (Brand identity)', 
    label: 'Brand Identity',
    text: 'Progetto accademico mirato alla costruzione di un identità partendo da un elemento del passato. Ho deciso di partire dagli anni 70 e riprendere lo stupefacente LSD e creare un e-commerce nei giorni nostri. Con un approccio ironico, leggero, ma anche professionale che si rifacesse alla corporate ho creato un brand veritiero e serio.'
  },
  { 
    src: '/img/Blooming.jpg', 
    images: ['/img/flyer 1.jpg','/img/flyer 12.jpg','/img/flyer 13.jpg','/img/flyer 14.jpg'], 
    wD: '26vw', wM: '65vw', 
    topD: '30%', topM: '30%', 
    leftD: '60%', leftM: '17%', 
    title: 'Bloomin Festival', 
    label: 'Event Design',
    text: 'Impostazione e direzione creativa del Bloomin festival presso LABA Brescia, creazione di layout e decorazioni ambientali mirati alla promozione del festival.' 
  },
  { 
    src: '/img/borgo.jpg', 
    images: ['/img/01.jpg','/img/04.jpg','/img/Mockup 1.jpg','/img/03.jpg'], 
    wD: '38vw', wM: '85vw', 
    topD: '55%', topM: '55%', 
    leftD: '36%', leftM: '7%', 
    title: 'Borgo Castello', 
    label: 'Graphic Design',
    text: 'Descrizione del progetto. Inserisci qui il testo che vuoi mostrare nel dettaglio.' 
  },
  { 
    src: '/img/bergamoscienza4.png', 
    images: ['/img/bergamoscienza1.png','/img/bergamoscienza2.png','/img/bergamoscienza3.png','/img/Totebag.png'], 
    wD: '24vw', wM: '70vw', 
    topD: '80%', topM: '80%', 
    leftD: '10%', leftM: '15%', 
    title: 'Bergamo scienza', 
    label: 'Concept Design',
    text: 'Concept design realizzato in occasione della fiera Bergamo Scienza, il tema affrontato è quello delle convergenze, diverse strade che si uniscono per risolvere un probelma comune, così ho deciso di utilizzare delle fomre tubolari che ricordano delle strade che si intrecciano e creano la scritta stessa "convergenze", un design dinamico che può essere declinato in vari modi.' 
  },
];

const selectedItem = ref(null);
const heroTextRef = ref(null);
const scrollZoneRef = ref(null);
const wrappers = ref([]);

function setWrapperRef(el, i) {
  if (el) wrappers.value[i] = el;
}

let ctx;

onMounted(() => {
  // Rimuoviamo overflow-hidden aggiunto in index.html in modo che la pagina possa scorrere nativamente
  document.body.classList.remove('overflow-hidden');
  document.body.classList.add('overflow-x-hidden');

  ctx = gsap.context(() => {
    // Animate hero text using just opacity and y since font-size is handled by tailwind
    gsap.fromTo(heroTextRef.value, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );

    wrappers.value.forEach((wrap) => {
      gsap.set(wrap, { scale: 0.08, opacity: 0 });

      ScrollTrigger.create({
        trigger: wrap,
        start: 'top 99%',
        end: 'top 30%',
        scrub: 1.4,
        onUpdate(self) {
          const p = self.progress;
          gsap.set(wrap, {
            scale: 0.08 + p * 0.92,
            opacity: Math.min(p * 2.5, 1),
          });
        },
      });
    });
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
  // Ripristiniamo overflow-hidden per le altre pagine che usano contenitori h-screen
  document.body.classList.remove('overflow-x-hidden');
  document.body.classList.add('overflow-hidden');
});

function openModal(d) {
  selectedItem.value = d;
  document.body.classList.add('overflow-hidden');
  nextTick(() => {
    gsap.to('#overlay', { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo('#modal-content',
      { opacity: 0, scale: 0.97, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    );
  });
}

function closeModal() {
  gsap.to('#overlay', { opacity: 0, duration: 0.3, ease: 'power2.in' });
  gsap.to('#modal-content', { opacity: 0, scale: 0.97, y: 20, duration: 0.3, ease: 'power2.in', onComplete: () => {
    selectedItem.value = null;
    document.body.classList.remove('overflow-hidden');
  }});
}

function handleImageError(e, title) {
  const target = e.target;
  const parent = target.parentElement;
  if (!parent) return;
  target.remove();
  const ph = document.createElement('div');
  ph.className = 'w-full flex items-center justify-center bg-black/5';
  ph.style.cssText = 'aspect-ratio:4/3;';
  ph.innerHTML = `<span style="font-size:clamp(10px,1vw,14px);color:#bbb;letter-spacing:-0.02em;padding:10px;text-align:center;">${title}</span>`;
  parent.appendChild(ph);
}

</script>
<template>
  <div class="bg-white">
    <!-- HERO -->
    <div class="w-screen h-[80vh]"></div>
    <p ref="heroTextRef" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] text-[9vw] md:text-[1.5vw] leading-tight tracking-[-0.02em] text-center text-black opacity-0 pointer-events-none px-8 md:px-0 w-full">
     Perditi nei miei progetti.
    </p>

    <!-- SCROLL ZONE -->
    <div ref="scrollZoneRef" class="relative w-screen h-[400vh] md:h-[300vh] z-10 overflow-hidden">
      <div 
        v-for="(d, i) in imgData" 
        :key="i"
        :ref="el => setWrapperRef(el, i)"
        class="absolute cursor-pointer"
        :style="{
          top: isMobile ? d.topM : d.topD,
          left: isMobile ? d.leftM : d.leftD,
          width: isMobile ? d.wM : d.wD
        }"
        @click="openModal(d)"
      >
        <img :src="d.src" :alt="d.title" class="w-full h-auto block select-none pointer-events-none" draggable="false" @error="handleImageError($event, d.title)">
      </div>
    </div>

    <!-- Spazio finale: permettiamo all'ultima immagine di scorrere fuori -->
    <div class="w-screen h-[80vh]"></div>

    <!-- MODAL -->
    <div v-if="selectedItem" id="overlay" class="fixed inset-0 z-[200] bg-black opacity-0 pointer-events-none" @click="closeModal"></div>
    
    <div v-if="selectedItem" id="modal" class="fixed inset-0 z-[210] flex items-center justify-center pointer-events-none px-4 md:px-0">
      <!-- Chiudi -->
      <button @click="closeModal" class="absolute top-6 right-6 md:top-8 md:right-10 text-[3.5vw] md:text-[1vw] tracking-[-0.02em] uppercase text-white bg-transparent border-none cursor-pointer md:cursor-none z-10 pointer-events-auto mix-blend-difference hover:opacity-70 transition-opacity">Close ✕</button>

      <div id="modal-content" class="pointer-events-auto w-full md:w-auto h-auto md:h-auto flex flex-col md:flex-row shadow-2xl">
        <!-- DESKTOP: due colonne -->
        <div class="hidden md:flex w-[86vw] h-[82vh] gap-10 bg-white p-10">
          <!-- Colonna immagini scrollabile -->
          <div class="w-1/2 h-full overflow-y-scroll flex flex-col gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <img v-for="(imgSrc, idx) in selectedItem.images" :key="idx" :src="imgSrc" :alt="selectedItem.title" class="w-full h-auto block bg-black/5 shrink-0" @error="handleImageError($event, selectedItem.title)">
          </div>
          <!-- Testo fisso a destra -->
          <div class="w-1/2 h-full overflow-y-auto flex flex-col justify-center pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <p class="text-[0.75vw] uppercase tracking-[0.1em] text-black/40 mb-5">{{ selectedItem.label || 'Project' }}</p>
            <h2 class="text-[2.8vw] tracking-[-0.02em] text-black leading-tight mb-6">{{ selectedItem.title }}</h2>
            <p class="text-[1vw] leading-relaxed tracking-[-0.02em] text-black">{{ selectedItem.text }}</p>
          </div>
        </div>

        <!-- MOBILE: colonna singola scrollabile -->
        <div class="flex md:hidden flex-col w-full h-[90vh] bg-white overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-lg">
          <div class="flex flex-col gap-3 shrink-0">
            <img v-for="(imgSrc, idx) in selectedItem.images" :key="idx" :src="imgSrc" :alt="selectedItem.title" class="w-full h-auto block bg-black/5 shrink-0" @error="handleImageError($event, selectedItem.title)">
          </div>
          <div class="flex flex-col px-6 py-8 gap-4 mb-8">
            <p class="text-[3vw] uppercase tracking-[0.1em] text-black/40">{{ selectedItem.label || 'Project' }}</p>
            <h2 class="text-[7vw] tracking-[-0.02em] text-black leading-tight">{{ selectedItem.title }}</h2>
            <p class="text-[4vw] leading-relaxed tracking-[-0.02em] text-black">{{ selectedItem.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
