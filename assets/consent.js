(()=> {
  'use strict';

  const banner = document.getElementById('privacy-consent');
  if (!banner || !window.PVConsent) return;

  const main = banner.querySelector('[data-consent-view="main"]');
  const settings = banner.querySelector('[data-consent-view="settings"]');
  const toggle = banner.querySelector('#consent-analytics-toggle');

  const choice = () => window.PVConsent.get();

  function show(view='main') {
    const current = choice();
    toggle.checked = current === 'granted';
    main.hidden = view !== 'main';
    settings.hidden = view !== 'settings';
    banner.hidden = false;
    document.body.classList.add('consent-open');
  }

  function hide() {
    banner.hidden = true;
    document.body.classList.remove('consent-open');
  }

  banner.querySelector('[data-consent-accept]')?.addEventListener('click', () => {
    window.PVConsent.grant();
    hide();
  });

  banner.querySelector('[data-consent-reject]')?.addEventListener('click', () => {
    window.PVConsent.deny();
    hide();
  });

  banner.querySelector('[data-consent-settings]')?.addEventListener('click', () => show('settings'));
  banner.querySelector('[data-consent-back]')?.addEventListener('click', () => show('main'));

  banner.querySelector('[data-consent-save]')?.addEventListener('click', () => {
    toggle.checked ? window.PVConsent.grant() : window.PVConsent.deny();
    hide();
  });

  document.querySelectorAll('[data-open-privacy-settings]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      show('settings');
    });
  });

  if (!choice()) show('main');
})();
