const THEME_KEY = 'theme';

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
  root.dataset.theme = theme;
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  const theme = isDark ? 'light' : 'dark';

  applyTheme(theme);

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies.
  }
}

// Initialize theme from localStorage
export function initTheme() {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch {
    // Ignore storage access errors and keep the default theme.
  }

  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  } else {
    applyTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
  }
}
