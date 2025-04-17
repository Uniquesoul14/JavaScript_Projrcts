function showToast(type, message) {
  const toast = document.createElement('div');
  toast.classList.add('toast', 'show', 'bg-white', 'shadow', `toast-${type}`);
  toast.innerHTML = `
    <div class="d-flex justify-content-between align-items-center p-3">
      <div class="toast-body text-dark">${message}</div>
      <button type="button" class="btn-close ms-2" aria-label="Close"></button>
    </div>
  `;

  document.getElementById('toast-container').appendChild(toast);

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);

  // Manual close
  toast.querySelector('.btn-close').addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  });
}
