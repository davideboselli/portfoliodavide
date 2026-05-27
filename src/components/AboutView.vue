<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const base = import.meta.env.BASE_URL
const TEAL = '#65DCBC'
const rightCol = ref(null)
const mobileContent = ref(null)
const desktopBlocks = ref([])
const mobileBlocks = ref([])
const photoRef = ref(null)
const mobilePhotoRef = ref(null)

function setDesktopBlockRef(el, index) {
  if (el) desktopBlocks.value[index] = el
}
function setMobileBlockRef(el, index) {
  if (el) mobileBlocks.value[index] = el
}

onMounted(() => {
  // ── Foto entrata ──
  if (photoRef.value) {
    gsap.from(photoRef.value, { opacity: 0, scale: 1.04, duration: 1, ease: 'power3.out', delay: 0.3 })
  }
  if (mobilePhotoRef.value) {
    gsap.from(mobilePhotoRef.value, { opacity: 0, scale: 1.04, duration: 1, ease: 'power3.out', delay: 0.3 })
  }

  // ── Reveal blocchi desktop ──
  desktopBlocks.value.forEach((block, i) => {
    if (i === 0) {
      gsap.to(block, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 })
      return
    }
    gsap.set(block, { y: 40 })
    ScrollTrigger.create({
      trigger: block,
      scroller: rightCol.value,
      start: 'top 88%',
      onEnter: () => gsap.to(block, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
      onLeaveBack: () => gsap.to(block, { opacity: 0, y: 40, duration: 0.4, ease: 'power2.in' }),
    })
  })

  // ── Reveal blocchi mobile ──
  mobileBlocks.value.forEach((block, i) => {
    if (i === 0) {
      gsap.to(block, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 })
      return
    }
    gsap.set(block, { y: 30 })
    ScrollTrigger.create({
      trigger: block,
      scroller: mobileContent.value,
      start: 'top 88%',
      onEnter: () => gsap.to(block, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
      onLeaveBack: () => gsap.to(block, { opacity: 0, y: 30, duration: 0.4, ease: 'power2.in' }),
    })
  })
})
</script>

<template>
  <!-- ══ LAYOUT DESKTOP: due colonne ══ -->
  <div class="hidden md:flex w-screen h-screen pt-[72px] pb-[60px]">

    <!-- Colonna sinistra fissa -->
    <div class="w-1/2 h-full flex items-center justify-center px-16 shrink-0">
      <div class="w-full max-w-sm aspect-[3/4] overflow-hidden bg-black/5">
        <img ref="photoRef" :src="`${base}img/me.JPG`" alt="Davide Boselli" class="w-full h-full object-cover block">
      </div>
    </div>

    <!-- Colonna destra scrollabile -->
    <div ref="rightCol" class="w-1/2 h-full overflow-y-scroll px-16 py-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div class="max-w-lg flex flex-col gap-12">

        <div :ref="(el) => setDesktopBlockRef(el, 0)" class="opacity-0">
          <p class="text-[1.05vw] leading-relaxed tracking-[-0.02em] text-black">
            Ciao, sono <strong>Davide Boselli</strong>, un graphic designer e illustratore con sede a <strong>Brescia</strong>. Il mio lavoro si muove tra la grafica, l'illustrazione e il 3D: tre linguaggi diversi che uso per raccontare storie visive che rimangono <strong>impresse</strong> nella memoria delle persone.
            Tra le esepreinze che mi hanno formato di più, oltre a quelle lavorative, sono i vari viaggi che ho fatto. Ho vissuto negli <strong>Stati Uniti</strong> per 2 anni come ragazzo alla pari e mi ha reso una persona più disinvolta e socievole dandomi anche delle forti skills di <strong>problem solving</strong>.
          </p>
        </div>

        <div :ref="(el) => setDesktopBlockRef(el, 1)" class="opacity-0">
          <p class="text-[1.5vw] tracking-[-0.05em]" :style="{ color: TEAL }">Background</p>
          <p class="text-[1.05vw] leading-relaxed tracking-[-0.02em] text-black">
            Ho frequentato il <strong>Liceo Artistico</strong> Maffeo Olivieri indirizzo Design &amp; Multimedia.
            Dopodichè la mia formazione è continuata tra le aule dell'accademia e i monitor degli studi, accumulando <strong>esperienze</strong> che spaziano dalla comunicazione visiva all'illustrazione. Ho lavorato con agenzie e clienti privati, <strong>adattando il mio stile</strong> alle esigenze del progetto senza mai perdere una visione personale.
          </p>
        </div>

        <div :ref="(el) => setDesktopBlockRef(el, 2)" class="opacity-0">
          <p class="text-[1.5vw] tracking-[-0.05em]" :style="{ color: TEAL }">Approccio</p>
          <p class="text-[1.05vw] leading-relaxed tracking-[-0.02em] text-black">
            Ogni progetto inizia con un <strong>ascolto lungo</strong>. Prima di disegnare qualsiasi cosa, cerco di <strong>capire il contesto</strong>, il pubblico e l'emozione che si vuole comunicare. Questo si traduce
            in una lunga e minuziosa ricerca cercando di non lasciare <strong>nulla al caso</strong>, ma motivando tutto. I miei progettinon si
            basano sulla bellezza estetica, ma sulla <strong>coerenza</strong> tra la richiesta del cliente, il messaggio da comunicare e l'impatto visivo che si vuole ottenere.
          </p>
        </div>

        <div :ref="(el) => setDesktopBlockRef(el, 3)" class="opacity-0">
          <p class="text-[1.5vw] tracking-[-0.05em]" :style="{ color: TEAL }">Strumenti</p>
          <p class="text-[1.05vw] leading-relaxed tracking-[-0.02em] text-black">
            Ottime capacità di utilizzo dell'Adobe Creative Suite (Illustrator, Photoshop, Indesign, After effect, Premiere). Per quanto
            riguarda il 3D ho buone conoscenze sui softwere: Blender, Cinema 4D e Nomad Sculpt per la scultura digitale.
            Per le mie illustrazioni e animazioni utilizzo principalmente Procreate, Procreate dreams e After effect.
          </p>
        </div>

        <div :ref="(el) => setDesktopBlockRef(el, 4)" class="opacity-0">
          <p class="text-[1.5vw] tracking-[-0.05em]" :style="{ color: TEAL }">Collaborazioni</p>
          <p class="text-[1.05vw] leading-relaxed tracking-[-0.02em] text-black">
            Nel tempo ho collaborato con realtà di diversa natura. Ogni settore ha le sue regole visive, conoscerle è il punto di partenza per sovvertirle nel modo giusto.
            Ho collaborato con Studio Sandrini Comunicazione dove mi sono occupato dello sviluppo della brand identity
            di un complesso di ville di lusso situate tra Milano e Monza. Ho lavoarto per Folio Lightning aiutandoli
            a realizzare il catalogo dei loro prodotti. Attualemnte lavoro per Sand.SRL occupandomi della parte di
            grafica e comunicazione creando brand identity, post social per feste con special guest e identity di eventi e feste.
          </p>
        </div>

        <div :ref="(el) => setDesktopBlockRef(el, 5)" class="opacity-0 pb-4">
          <p class="text-[1.5vw] tracking-[-0.05em]" :style="{ color: TEAL }">Contatti</p>
          <p class="text-[1.05vw] leading-relaxed tracking-[-0.02em] text-black">
            Per progetti, commissioni o semplicemente per parlare di lavoro, scrivimi a <a href="mailto:davide.boselli98@gmail.com" class="underline text-black">davide.boselli98@gmail.com</a> , su Instagram <a href="https://www.instagram.com/davideeboselli/" class="underline text-black">@davideeboselli</a>, oppure scrivimi su whatsapp al numero <a href="https://wa.me/393887749397" class="underline text-black">+39 388 774 9397</a> rispondo sempre.
          </p>
        </div>

      </div>
    </div>
  </div>

  <!-- ══ LAYOUT MOBILE ══ -->
  <div ref="mobileContent" class="flex md:hidden flex-col w-screen h-screen overflow-y-scroll pt-20 pb-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

    <div class="w-full px-6 mb-10">
      <div class="w-full aspect-[3/4] overflow-hidden bg-black/5">
        <img ref="mobilePhotoRef" :src="`${base}img/me.JPG`" alt="Davide Boselli" class="w-full h-full object-cover block">
      </div>
    </div>

    <div class="px-6 flex flex-col gap-10 pb-16">

      <div :ref="(el) => setMobileBlockRef(el, 0)" class="opacity-0">
        <p class="text-[3.5vw] leading-relaxed tracking-[-0.02em] text-black">
          Ciao, sono Davide Boselli, un designer e illustratore con sede a Milano. Il mio lavoro si muove tra la grafica, l'illustrazione e il 3D.
        </p>
      </div>

      <div :ref="(el) => setMobileBlockRef(el, 1)" class="opacity-0">
        <p class="text-[5vw] tracking-[-0.05em] mb-3" :style="{ color: TEAL }">Background</p>
        <p class="text-[3.5vw] leading-relaxed tracking-[-0.02em] text-black">
          Mi sono formato tra le aule dell'accademia e i monitor degli studi, accumulando esperienze che spaziano dalla comunicazione visiva al motion design.
        </p>
      </div>

      <div :ref="(el) => setMobileBlockRef(el, 2)" class="opacity-0">
        <p class="text-[5vw] tracking-[-0.05em] mb-3" :style="{ color: TEAL }">Approccio</p>
        <p class="text-[3.5vw] leading-relaxed tracking-[-0.02em] text-black">
          Ogni progetto inizia con un ascolto lungo. Prima di disegnare qualsiasi cosa, cerco di capire il contesto, il pubblico e l'emozione che si vuole comunicare.
        </p>
      </div>

      <div :ref="(el) => setMobileBlockRef(el, 3)" class="opacity-0">
        <p class="text-[5vw] tracking-[-0.05em] mb-3" :style="{ color: TEAL }">Strumenti</p>
        <p class="text-[3.5vw] leading-relaxed tracking-[-0.02em] text-black">
          Adobe Creative Suite, Blender, Procreate, e qualunque altro strumento serva a fare le cose bene.
        </p>
      </div>

      <div :ref="(el) => setMobileBlockRef(el, 4)" class="opacity-0">
        <p class="text-[5vw] tracking-[-0.05em] mb-3" :style="{ color: TEAL }">Contatti</p>
        <p class="text-[3.5vw] leading-relaxed tracking-[-0.02em] text-black">
          Scrivimi a <a href="mailto:davide.boselli98@gmail.com" class="underline">davide.boselli98@gmail.com</a>
        </p>
      </div>

    </div>
  </div>
</template>
