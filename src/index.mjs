import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Logo fade in
  gsap.from('.logo', { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out' });
  
  // Nav buttons stagger
  gsap.from('.nav-btn, .nav-cta', { 
    opacity: 0, 
    y: -10, 
    duration: 0.5, 
    stagger: 0.1, 
    delay: 0.3,
    ease: 'power2.out'
  });

  // Hero animation
  gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.5 });
  gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.7, ease: 'power3.out' });
  gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6, delay: 1.0 });
  gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.6, delay: 1.2 });

  // Stats bar
  gsap.from('.stat-item', { 
    opacity: 0, 
    y: 20, 
    duration: 0.5, 
    stagger: 0.1, 
    delay: 1.4,
    ease: 'power2.out'
  });

  // Features with scroll trigger
  gsap.from('.feature-card', {
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.features-grid',
      start: 'top 80%'
    }
  });

  // Steps with scroll trigger
  gsap.from('.step-card', {
    opacity: 0,
    x: -30,
    duration: 0.5,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.steps-row',
      start: 'top 80%'
    }
  });

  // Protection cards with scroll trigger
  gsap.from('.protection-card', {
    opacity: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.protection-grid',
      start: 'top 85%'
    }
  });

  // CTA section
  gsap.from('.cta-section', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 80%'
    }
  });

  // Footer
  gsap.from('footer', { opacity: 0, duration: 0.6, delay: 0.2 });

  // Dashboard hover effects
  document.querySelectorAll('.feature-card, .step-card, .protection-card, .card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });

  // Nav button hover
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.05, duration: 0.15 });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.15 });
    });
  });

  // Button hover animations
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { y: -2, duration: 0.15 });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { y: 0, duration: 0.15 });
    });
  });
});

// Page navigation
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById('page' + page.charAt(0).toUpperCase() + page.slice(1)).classList.add('active');
  document.getElementById('nav' + page.charAt(0).toUpperCase() + page.slice(1)).classList.add('active');
  
  // Animate page transition
  gsap.fromTo('.page.active', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
}

window.showPage = showPage;

// ═══════════════════════════════
// PNL SIMULATION (80% WR based)
// ═══════════════════════════════
const SIM_CONFIG = {
  totalTrades: 100,
  winRate: 0.80,
  startBalance: 50,
  perTrade: 5,
  riskReward: 2
};

let hasSeenBanner = localStorage.getItem('pochita_banner_seen');

// Banner dismiss
function dismissBanner() {
  localStorage.setItem('pochita_banner_seen', 'true');
  var banner = document.getElementById('dashboardBanner');
  if (banner) banner.style.display = 'none';
}

window.dismissBanner = dismissBanner;

// PNL Graph Animation
function animatePnL() {
  const wins = Math.floor(SIM_CONFIG.totalTrades * SIM_CONFIG.winRate);
  const losses = SIM_CONFIG.totalTrades - wins;
  const grossWins = wins * SIM_CONFIG.perTrade * SIM_CONFIG.riskReward;
  const grossLosses = losses * SIM_CONFIG.perTrade;
  const netPnl = grossWins - grossLosses;
  
  const balance = SIM_CONFIG.startBalance + netPnl;
  const change = netPnl;
  
  // Animate balance
  const balanceEl = document.getElementById('balanceValue');
  const changeEl = document.getElementById('balanceChange');
  
  // Number animation
  const updateNumber = (el, target, prefix = '$') => {
    const current = parseFloat(el.textContent.replace('$', '')) || 0;
    const diff = target - current;
    const steps = 20;
    const stepVal = diff / steps;
    let i = 0;
    const anim = () => {
      i++;
      const val = current + (stepVal * i);
      el.textContent = prefix + val.toFixed(2);
      if (i < steps) requestAnimationFrame(anim);
    };
    anim();
  };
  
  updateNumber(balanceEl, balance);
  changeEl.textContent = (change >= 0 ? '+' : '') + '$' + change.toFixed(2);
  changeEl.style.color = change >= 0 ? '#4ade80' : '#f87171';
  
  // Update metrics
  document.getElementById('totalTrades').textContent = SIM_CONFIG.totalTrades;
  document.getElementById('wins').textContent = wins;
  document.getElementById('lossesMetric').textContent = losses + ' losses';
  document.getElementById('winRate').textContent = (SIM_CONFIG.winRate * 100) + '%';
  document.getElementById('statWins').textContent = wins;
  document.getElementById('statLosses').textContent = losses;
  document.getElementById('grossWins').textContent = '$' + grossWins.toFixed(2);
  document.getElementById('grossLosses').textContent = '$' + grossLosses.toFixed(2);
  document.getElementById('netPnl').textContent = (change >= 0 ? '+' : '') + '$' + change.toFixed(2);
  document.getElementById('netPnl').style.color = change >= 0 ? '#4ade80' : '#f87171';
  
  // WR Circle animation
  const wrFill = document.getElementById('wrFill');
  const circumference = 2 * Math.PI * 50;
  const offset = circumference * (1 - SIM_CONFIG.winRate);
  gsap.to(wrFill, { strokeDashoffset: offset, duration: 1.5, ease: 'power2.out' });
}

// Show dashboard first time
if (!hasSeenBanner && document.getElementById('pageDashboard').classList.contains('active')) {
  // Keep banner visible
}

// Auto-animate when dashboard is shown
const origShowPage = window.showPage;
window.showPage = function(page) {
  origShowPage(page);
  if (page === 'dashboard') {
    setTimeout(() => animatePnL(), 300);
  }
};

// ═══════════════════════════════
// INTERACTIVE SIMULATION
// ═══════════════════════════════
const simState = {
  trades: 0,
  wins: 0,
  losses: 0,
  skipped: 0,
  balance: 50,
  paused: false,
  timer: null
};

function runSimTrade() {
  if (simState.paused) return;
  
  // Random outcome based on 80% WR
  const win = Math.random() < 0.80;
  simState.trades++;
  
  if (win) {
    simState.wins++;
    simState.balance += 10; // $10 win (5 × 2)
  } else {
    simState.losses++;
    simState.balance -= 5; // $5 loss
  }
  
  // Update UI with animation
  const balanceEl = document.getElementById('balanceValue');
  const changeEl = document.getElementById('balanceChange');
  const prevBalance = parseFloat(balanceEl.textContent.replace('$', ''));
  
  // Animate to new balance
  const diff = simState.balance - prevBalance;
  const steps = 15;
  let i = 0;
  const anim = () => {
    i++;
    const val = prevBalance + (diff * (i / steps));
    balanceEl.textContent = '$' + val.toFixed(2);
    if (i < steps) requestAnimationFrame(anim);
  };
  anim();
  
  // Flash effect
  gsap.fromTo(balanceEl, { scale: 1.1 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
  changeEl.textContent = (diff >= 0 ? '+' : '') + '$' + diff.toFixed(2);
  changeEl.style.color = diff >= 0 ? '#4ade80' : '#f87171';
  
  // Update metrics
  document.getElementById('totalTrades').textContent = simState.trades;
  document.getElementById('wins').textContent = simState.wins;
  document.getElementById('lossesMetric').textContent = simState.losses + ' losses';
  document.getElementById('winRate').textContent = simState.trades > 0 
    ? Math.round((simState.wins / simState.trades) * 100) + '%' 
    : '0%';
  
  // Update WR circle
  const wr = simState.trades > 0 ? simState.wins / simState.trades : 0;
  const circumference = 2 * Math.PI * 50;
  const offset = circumference * (1 - wr);
  const wrFill = document.getElementById('wrFill');
  if (wrFill) gsap.to(wrFill, { strokeDashoffset: offset, duration: 0.5, ease: 'power2.out' });
  
  // Auto-trigger next trade after delay
  if (!simState.paused) {
    simState.timer = setTimeout(runSimTrade, 2000 + Math.random() * 3000); // 2-5s delay
  }
}

function togglePause() {
  simState.paused = !simState.paused;
  document.getElementById('pauseLabel').textContent = simState.paused ? 'Resume' : 'Pause';
  
  if (!simState.paused && simState.trades < 100) {
    runSimTrade();
  }
}

function resetSim() {
  simState.trades = 0;
  simState.wins = 0;
  simState.losses = 0;
  simState.skipped = 0;
  simState.balance = 50;
  simState.paused = false;
  
  if (simState.timer) clearTimeout(simState.timer);
  
  // Reset UI
  document.getElementById('balanceValue').textContent = '$50.00';
  document.getElementById('balanceChange').textContent = '$0.00';
  document.getElementById('balanceChange').style.color = 'var(--muted)';
  document.getElementById('totalTrades').textContent = '0';
  document.getElementById('wins').textContent = '0';
  document.getElementById('lossesMetric').textContent = '0 losses';
  document.getElementById('winRate').textContent = '0%';
  document.getElementById('pauseLabel').textContent = 'Pause';
  
  const wrFill = document.getElementById('wrFill');
  if (wrFill) gsap.to(wrFill, { strokeDashoffset: 314, duration: 0.5 });
}

window.runSimTrade = runSimTrade;
window.togglePause = togglePause;
window.resetSim = resetSim;

// Trigger on load if already on dashboard
if (document.getElementById('pageDashboard').classList.contains('active') && hasSeenBanner) {
  setTimeout(() => {
    animatePnL();
    // Auto-start simulation
    setTimeout(runSimTrade, 1000);
  }, 500);
}