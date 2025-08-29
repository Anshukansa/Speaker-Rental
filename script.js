
// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if(toggle && nav){
  toggle.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// IntersectionObserver to reveal elements on scroll (no external libs)
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
},{threshold:0.08});

[...document.querySelectorAll('.card, .section-head, .stat, .hero-copy, .hero-media, .notice, .combo')]
  .forEach(el=>{el.classList.add('reveal'); observer.observe(el);});

// Optional: Update current date if an element with id exists (kept from original)
document.addEventListener('DOMContentLoaded', function(){
  const dateElement = document.getElementById('current-date');
  if(dateElement){
    dateElement.textContent = new Date().toLocaleDateString('en-AU', {
      weekday:'long', year:'numeric', month:'long', day:'numeric'
    });
  }
});