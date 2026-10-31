(() => {
  const header = document.querySelector('.site-header, .page-header, .doctor-header');
  const desktopNav = header?.querySelector('.desktop-nav, .page-nav, .doctor-nav');

  if (header && desktopNav) {
    let toggle = header.querySelector('.menu-toggle');
    let menu = header.querySelector('.mobile-menu');

    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'menu-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'false');
      header.append(toggle);
    }

    if (!menu) {
      menu = document.createElement('nav');
      menu.className = 'mobile-menu';
      menu.setAttribute('aria-label', 'Mobile menu');
      menu.innerHTML = desktopNav.innerHTML;
      header.append(menu);
    }

    if (!menu.id) menu.id = 'mobile-menu';
    toggle.setAttribute('aria-controls', menu.id);
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.textContent = '';

    if (!menu.querySelector('a[href^="booking.html"]')) {
      const bookingLink = document.createElement('a');
      bookingLink.href = 'booking.html';
      bookingLink.textContent = 'Book an appointment';
      bookingLink.className = 'mobile-menu-book';
      menu.append(bookingLink);
    }

    menu.hidden = true;
    let closeTimer;

    const setMenu = (open, returnFocus = false) => {
      window.clearTimeout(closeTimer);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      header.classList.toggle('nav-active', open);
      document.body.classList.toggle('nav-open', open);

      if (open) {
        menu.hidden = false;
        requestAnimationFrame(() => {
          menu.classList.add('is-open');
        });
      } else {
        menu.classList.remove('is-open');
        closeTimer = window.setTimeout(() => { menu.hidden = true; }, 360);
        if (returnFocus) toggle.focus({ preventScroll: true });
      }
    };

    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenu(false, true);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [toggle, ...menu.querySelectorAll('a')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const wideScreen = window.matchMedia('(min-width: 901px)');
    wideScreen.addEventListener('change', (event) => {
      if (event.matches) setMenu(false);
    });
  }

  document.querySelectorAll('.faq-list details, .faq details').forEach((details) => {
    const summary = details.querySelector(':scope > summary');
    if (!summary || details.querySelector(':scope > .accordion-panel')) return;

    const panel = document.createElement('div');
    const inner = document.createElement('div');
    panel.className = 'accordion-panel';
    inner.className = 'accordion-panel-inner';

    while (summary.nextSibling) inner.append(summary.nextSibling);
    panel.append(inner);
    details.append(panel);

    const startsOpen = details.open;
    details.open = startsOpen;
    details.classList.toggle('is-open', startsOpen);

    summary.addEventListener('click', (event) => {
      event.preventDefault();
      const opening = !details.classList.contains('is-open');

      if (opening) {
        details.open = true;
        requestAnimationFrame(() => details.classList.add('is-open'));
      } else {
        details.classList.remove('is-open');
        const finishClose = () => {
          if (!details.classList.contains('is-open')) details.open = false;
        };
        panel.addEventListener('transitionend', finishClose, { once: true });
        window.setTimeout(finishClose, 500);
      }
    });
  });
})();
