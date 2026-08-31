(function () {
  'use strict';

  // ===== Mobile hamburger menu =====
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // ===== Active nav link on scroll =====
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    var scrollPos = window.scrollY + 100;
    var currentId = 'home';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (anchor) {
      anchor.classList.toggle(
        'active',
        anchor.getAttribute('href') === '#' + currentId
      );
    });
  }

  // ===== Back to top button =====
  var backToTop = document.getElementById('backToTop');

  function handleScroll() {
    setActiveLink();
    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 400);
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', function () {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(handleScroll);
    } else {
      handleScroll();
    }
  });

  // ===== Animate skill progress bars on view =====
  var progressBars = document.querySelectorAll('.progress-bar');

  function animateProgress() {
    progressBars.forEach(function (bar) {
      var rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
        bar.style.width = bar.dataset.progress + '%';
      }
    });
  }

  window.addEventListener('scroll', function () {
    animateProgress();
  });
  window.addEventListener('load', animateProgress);

  // ===== Footer year =====
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== Contact form (demo - no backend) =====
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      var name = (formData.get('name') || '').toString().trim();
      var message = (formData.get('message') || '').toString().trim();

      if (!name || !message) {
        formNote.textContent = 'Mohon lengkapi kolom nama dan pesan.';
        formNote.className = 'form-note error';
        return;
      }

      formNote.textContent =
        'Terima kasih, ' + name + '! Pesan Anda sudah kami terima (demo).';
      formNote.className = 'form-note success';
      contactForm.reset();

      setTimeout(function () {
        formNote.textContent = '';
        formNote.className = 'form-note';
      }, 5000);
    });
  }
})();
