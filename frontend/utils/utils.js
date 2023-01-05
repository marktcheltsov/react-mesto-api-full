export function renderLoading(isLoading, btn, text) {
    if (isLoading === true) {
      btn.textContent = 'Сохранение...';
    } else if (isLoading === false) {
      btn.textContent = text;
    }
  }