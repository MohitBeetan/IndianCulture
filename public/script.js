  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => observer.observe(r));

  // Page indicator
  const sections = ['hero','history','culture','architecture','festivals','cuisine','states','philosophy'];
  const dots = document.querySelectorAll('.pi-dot');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = sections.indexOf(e.target.id);
        dots.forEach((d,i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => { const el = document.getElementById(s); if(el) io.observe(el); });

  // States search
  const stateSearchInput = document.getElementById('stateSearch');
  const stateTiles = document.querySelectorAll('#states .state-tile');
  const stateSearchEmpty = document.getElementById('stateSearchEmpty');

  if (stateSearchInput && stateTiles.length && stateSearchEmpty) {
    stateSearchInput.addEventListener('input', () => {
      const query = stateSearchInput.value.trim().toLowerCase();
      let matchCount = 0;

      stateTiles.forEach(tile => {
        const stateName = tile.querySelector('.state-name')?.textContent?.toLowerCase() || '';
        const stateCapital = tile.querySelector('.state-capital')?.textContent?.toLowerCase() || '';
        const isMatch = !query || stateName.includes(query) || stateCapital.includes(query);

        tile.classList.toggle('hidden-by-search', !isMatch);
        if (isMatch) {
          matchCount += 1;
        }
      });

      stateSearchEmpty.hidden = matchCount !== 0;
    });
  }

  stateTiles.forEach(tile => {
    tile.setAttribute('role', 'link');
    tile.setAttribute('tabindex', '0');
    tile.setAttribute('aria-label', `Open ${tile.querySelector('.state-name')?.textContent || 'state'} page`);

    tile.addEventListener('click', () => {
      const slug = tile.dataset.stateSlug || slugifyStateName(tile.querySelector('.state-name')?.textContent || '');

      if (slug) window.location.assign(`/state/${slug}`);
    });

    tile.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        tile.click();
      }
    });
  });

  function slugifyStateName(name) {
    return name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
