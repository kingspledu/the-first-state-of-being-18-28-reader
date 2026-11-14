(() => {
  const toggle = document.getElementById('chapterToggle');
  const menu = document.getElementById('chapterMenu');
  const minus = document.getElementById('minus');
  const plus = document.getElementById('plus');
  function close() { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    toggle.setAttribute('aria-expanded', String(!menu.hidden));
  });
  menu.querySelectorAll('[data-chapter]').forEach(button => {
    button.addEventListener('click', () => {
      const chapter = document.getElementById(button.dataset.chapter);
      if (!chapter) return;
      close();
      chapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + chapter.id);
      toggle.textContent = button.textContent + ' \u25be';
    });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.chapter-picker')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { close(); toggle.focus(); }
  });
  let size = 20;
  minus.addEventListener('click', () => { size = Math.max(14, size - 1); document.documentElement.style.setProperty('--size', size + 'px'); });
  plus.addEventListener('click', () => { size = Math.min(66, size + 1); document.documentElement.style.setProperty('--size', size + 'px'); });
})();
