(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const config = window.SIGNED365_CONFIG || {};
  const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key, value) { try { localStorage.setItem(key, value); } catch { /* Preferences remain available in memory. */ } } };
  let scale = Math.min(1.5, Math.max(1, Number(storage.get('reading-scale')) || 1));
  let dark = storage.get('reading-theme') === 'dark';
  function applyReading() {
    document.documentElement.style.setProperty('--scale', scale);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $('#theme-toggle').textContent = dark ? '☼  Cambiar a modo claro' : '☾  Cambiar a modo oscuro';
    $('#font-value').textContent = `${Math.round(scale * 100)}%`;
    $('#font-less').disabled = scale <= 1;
    $('#font-more').disabled = scale >= 1.5;
    storage.set('reading-scale', scale); storage.set('reading-theme', dark ? 'dark' : 'light');
  }
  applyReading();
  $('#theme-toggle').addEventListener('click', () => { dark = !dark; applyReading(); });
  $('#font-more').addEventListener('click', () => { scale = Math.min(1.5, +(scale + .1).toFixed(1)); applyReading(); });
  $('#font-less').addEventListener('click', () => { scale = Math.max(1, +(scale - .1).toFixed(1)); applyReading(); });
  $('#reset-reading').addEventListener('click', () => { dark = false; scale = 1; applyReading(); });
  function disclosure(button, panel) {
    button.addEventListener('click', () => { panel.hidden = !panel.hidden; button.setAttribute('aria-expanded', String(!panel.hidden)); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !panel.hidden) { panel.hidden = true; button.setAttribute('aria-expanded', 'false'); button.focus(); } });
  }
  disclosure($('#access-toggle'), $('#access-panel'));
  disclosure($('#eva-toggle'), $('#eva-panel'));
  const menuButton = $('.menu-toggle'), menu = $('#main-menu');
  menuButton.addEventListener('click', () => { const open = menu.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); }));
  document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => { $('#need').value = link.dataset.interest; }));
  document.querySelectorAll('[data-audience]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-audience]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    const team = button.dataset.audience === 'equipo';
    $('#basic-title').textContent = team ? 'Un primer paso para tu equipo' : 'Empieza a tu ritmo';
    $('#basic-copy').textContent = team ? 'Consulta las opciones de plataforma para organizar el trabajo de tu equipo.' : 'Conoce la plataforma y encuentra el plan que se adapta a tu negocio.';
    $('#premium-title').textContent = team ? 'Más posibilidades para trabajar juntos' : 'Dale más espacio a tu negocio';
    $('#premium-copy').textContent = team ? 'Cuéntanos cuántas personas forman tu equipo y encuentra una solución a tu medida.' : 'Consulta los planes Premium y elige las herramientas que necesitas.';
  }));
  function httpsUrl(value) { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } }
  const proUrl = httpsUrl(config.proUrl);
  if (proUrl) document.querySelectorAll('.pro-link').forEach(link => { link.href = proUrl; });
  $('#contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!/^\d{8,15}$/.test(config.whatsappNumber || '')) { $('#contact-status').textContent = 'El canal de WhatsApp aún no está configurado. Esta consulta no se ha enviado.'; return; }
    const message = `Hola, soy ${$('#name').value.trim()}. Me interesa: ${$('#need').value}. ${$('#message').value.trim()}`;
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    $('#contact-status').textContent = 'Continúa en WhatsApp para revisar y enviar tu consulta.';
  });
  const dialog = $('#payment-dialog');
  document.querySelectorAll('[data-years]').forEach(button => button.addEventListener('click', () => {
    const years = button.dataset.years;
    $('#payment-title').textContent = `Firma electrónica · ${years} ${years === '1' ? 'año' : 'años'}`;
    const paymentUrl = httpsUrl((config.paymentUrls || {})[years]);
    const link = $('#payment-link');
    link.href = paymentUrl || '#contacto'; link.textContent = paymentUrl ? 'Abrir página de pago ↗' : 'Solicitar información ↗';
    if (paymentUrl) { link.target = '_blank'; link.rel = 'noopener noreferrer'; } else { link.removeAttribute('target'); link.removeAttribute('rel'); }
    $('#payment-description').textContent = paymentUrl ? 'Abre la página del proveedor para revisar los datos y realizar el pago.' : 'El enlace oficial de pago está pendiente de configuración. Solicita asesoría para confirmar requisitos e importe total.';
    dialog.showModal();
  }));
  $('#close-payment').addEventListener('click', () => dialog.close());
  $('#payment-link').addEventListener('click', () => { dialog.close(); $('#need').value = 'Firma electrónica'; });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  function countdown() {
    // Ecuador continental uses UTC−5 all year. Target: next Thursday, 00:00.
    const now = Date.now(), local = new Date(now - 5 * 3600000);
    const day = local.getUTCDay();
    let delta = (4 - day + 7) % 7;
    if (delta === 0) { $('.signed-day > p').innerHTML = '<b>✧ SIGNED DAY</b> &nbsp; Hoy es jueves en Ecuador'; }
    else { $('.signed-day > p').innerHTML = '<b>✧ SIGNED DAY</b> &nbsp; El próximo SIGNED DAY empieza en'; }
    const target = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate() + delta, 5);
    let seconds = Math.max(0, Math.floor((target - now) / 1000));
    const values = [Math.floor(seconds / 86400), Math.floor(seconds % 86400 / 3600), Math.floor(seconds % 3600 / 60), seconds % 60];
    ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) => { $(`#${id}`).textContent = String(values[i]).padStart(2, '0'); });
  }
  countdown(); setInterval(countdown, 1000);
  $('#year').textContent = new Date().getFullYear();
})();
