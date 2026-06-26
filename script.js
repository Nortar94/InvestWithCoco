/* =========================================================
   Invest With Coco — interactions
   ========================================================= */
(function () {
  'use strict';

  /* -----------------------------------------------------
     Réglages configurables (équivalents des props du proto)
     ----------------------------------------------------- */
  var CONFIG = {
    showPhotos: true,          // placeholders photo (hero + à propos)
    showHeroBadge: true,       // ligne de réassurance du hero
    showFloatingContact: false // bouton flottant « Prendre rendez-vous »
  };

  document.querySelectorAll('[data-toggle]').forEach(function (el) {
    if (CONFIG[el.getAttribute('data-toggle')] === false) {
      el.remove();
    }
  });

  var floating = document.getElementById('floatingCta');
  if (floating && CONFIG.showFloatingContact) {
    floating.hidden = false;
  }

  /* -----------------------------------------------------
     Nav : opacité/ombre renforcées au scroll
     ----------------------------------------------------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 36);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------------------------------
     Nav : lien actif via IntersectionObserver
     ----------------------------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[data-nav]'));
  if (links.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      links.forEach(function (l) {
        l.classList.toggle('is-active', l.getAttribute('data-nav') === id);
      });
    };
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-48% 0px -48% 0px', threshold: 0 });

    ['conseil', 'long-terme', 'defiscalisation', 'apropos', 'temoignages', 'contact'].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) obs.observe(s);
    });
  }

  /* -----------------------------------------------------
     Menu mobile (burger)
     ----------------------------------------------------- */
  var burger = document.getElementById('navBurger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    var closeMenu = function () {
      menu.hidden = true;
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
    };
    var openMenu = function () {
      menu.hidden = false;
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fermer le menu');
    };
    burger.addEventListener('click', function () {
      if (menu.hidden) openMenu(); else closeMenu();
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) closeMenu();
    });
  }

  /* -----------------------------------------------------
     Formulaire de contact
     Le prototype ne fait aucun envoi réel : on bascule
     simplement vers l'écran de confirmation.
     ➜ Pour brancher un vrai envoi, voir README (Formspree,
       Resend, route API…). Si FORM_ENDPOINT est défini,
       le formulaire est posté en fetch().
     ----------------------------------------------------- */
  var FORM_ENDPOINT = ''; // ex. 'https://formspree.io/f/xxxxxxx'

  var form = document.getElementById('contactForm');
  var sent = document.getElementById('formSent');

  var showConfirmation = function () {
    if (form) form.hidden = true;
    if (sent) sent.hidden = false;
  };

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
        return;
      }

      if (FORM_ENDPOINT) {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Envoi…'; }

        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        }).then(function (res) {
          if (res.ok) {
            showConfirmation();
          } else {
            if (btn) { btn.disabled = false; btn.textContent = 'Envoyer le message'; }
            alert("Une erreur est survenue. Merci de réessayer ou de m'écrire directement par email.");
          }
        }).catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = 'Envoyer le message'; }
          alert("Une erreur réseau est survenue. Merci de réessayer.");
        });
      } else {
        // Comportement par défaut du prototype : confirmation locale.
        showConfirmation();
      }
    });
  }
})();
