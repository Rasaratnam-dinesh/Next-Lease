document.documentElement.classList.add('js');

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-spy: highlight the nav link for the section in view
const links = document.querySelectorAll('.nav__list a');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && spy.observe(s));

// Reveal on scroll
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    reveal.unobserve(e.target);
  });
}, { threshold: .2 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

// Contact form: open WhatsApp with the message pre-filled
const WHATSAPP_NUMBER = '94770000000'; // change to the business number (country code, no +)
const form = document.getElementById('contactForm');
const status = form.querySelector('.form__status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  const name = d.get('name').trim(), contact = d.get('contact').trim(), msg = d.get('message').trim();
  if (!name || !contact || !msg) { status.textContent = 'Please fill in all three fields.'; return; }
  const text = `Hello NextLease, I am ${name} (${contact}). ${msg}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  status.textContent = 'Opening WhatsApp with your message.';
  form.reset();
});
