// ---------- Menu mobile ----------
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', String(isHidden));
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

// ---------- Ticker de serviços ----------
const services = [
  "Corte de cabelo", "Corte em degradê", "Corte militar", "Corte com navalha", "Barba",
  "Barba com navalha", "Barbear com toalha quente", "Corte com tesoura", "Coloração de cabelo",
  "Cortes infantis", "Manutenção de barba", "Cabelos cacheados", "Corte personalizado",
  "Tingimento de barba", "Coloração de sobrancelhas", "Serviços a domicílio"
];
const tickerTrack = document.getElementById('tickerTrack');
const tickerHTML = services.map(s => `<span class="px-6 flex items-center gap-6">${s} <span class="text-brass">✦</span></span>`).join('');
tickerTrack.innerHTML = tickerHTML + tickerHTML;

// ---------- Galeria ----------
const galleryImages = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521490878406-9d5c8e7d7c5d?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=900&auto=format&fit=crop"
];
const galleryTrack = document.getElementById('galleryTrack');
const galleryHTML = galleryImages.map(src => `
  <div class="w-[280px] md:w-[340px] h-[400px] flex-shrink-0 overflow-hidden">
    <img src="${src}" alt="Foto da G7 Barbearia" class="w-full h-full" loading="lazy">
  </div>`).join('');
galleryTrack.innerHTML = galleryHTML + galleryHTML;

// ---------- Formulário via e-mail ----------
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const mensagem = document.getElementById('mensagem').value;

  const destino = "contato@g7barbearia.com.br"; // TODO: Kevin, troque pelo e-mail real da barbearia
  const assunto = encodeURIComponent(`Contato pelo site — ${nome}`);
  const corpo = encodeURIComponent(
    `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}`
  );
  formNote.classList.remove('hidden');
  window.location.href = `mailto:${destino}?subject=${assunto}&body=${corpo}`;
});

// ================= GSAP =================
gsap.registerPlugin(ScrollTrigger);

// Hero animation removed as requested

// Reveal on scroll for generic items
gsap.utils.toArray(".reveal-item").forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" }
    }
  );
});

// Service cards stagger
gsap.utils.toArray("#servicos .service-card").forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: "power2.out",
      scrollTrigger: { trigger: "#servicos .grid", start: "top 80%" }
    }
  );
});

// Services ticker infinite scroll (right to left)
const tickerWidth = tickerTrack.scrollWidth / 2;
gsap.to(tickerTrack, {
  x: -tickerWidth,
  duration: 30,
  ease: "none",
  repeat: -1
});

// Gallery infinite scroll (left to right, per brief)
const galleryWidth = galleryTrack.scrollWidth / 2;
gsap.fromTo(galleryTrack,
  { x: -galleryWidth },
  { x: 0, duration: 05, ease: "none", repeat: -1 }
);
// pause on hover
const galleryWrap = galleryTrack.parentElement;
galleryWrap.addEventListener("mouseenter", () => gsap.getTweensOf(galleryTrack).forEach(t => t.pause()));
galleryWrap.addEventListener("mouseleave", () => gsap.getTweensOf(galleryTrack).forEach(t => t.resume()));

// Barber pole scroll-progress fill
gsap.to("#poleFill", {
  scaleY: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3
  }
});
