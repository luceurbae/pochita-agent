import './homepage.css';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  gsap.to('.logo', { opacity: 1, duration: 1, ease: 'power2.out' });
  gsap.to('.hint', { opacity: 1, duration: 0.8, delay: 0.5 });
  
  document.body.addEventListener('click', () => {
    gsap.to(document.body, { 
      opacity: 0, 
      duration: 0.4, 
      onComplete: () => window.location.href = 'index.html' 
    });
  });
});