(() => {
  const CONTAINER_ID = "toast-container";
  const STYLE_ID = "toast-style";

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${CONTAINER_ID} {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .toast {
        min-width: 180px;
        max-width: 320px;
        padding: 10px 14px;
        border-radius: 8px;
        color: #ffffff;
        font-size: 0.85rem;
        line-height: 1.4;
        opacity: 0;
        transform: translateY(-8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
      }

      .toast--visible {
        opacity: 1;
        transform: translateY(0);
      }

      .toast--success {
        background-color: rgba(31, 111, 63, 0.92);
        border: 1px solid rgba(91, 220, 137, 0.8);
      }

      .toast--error {
        background-color: rgba(130, 40, 40, 0.92);
        border: 1px solid rgba(255, 117, 117, 0.9);
      }
    `;

    document.head.appendChild(style);
  }

  function ensureContainer() {
    ensureStyles();

    let container = document.getElementById(CONTAINER_ID);

    if (!container) {
      container = document.createElement("div");
      container.id = CONTAINER_ID;
      document.body.appendChild(container);
    }

    return container;
  }

  window.showToast = function showToast(message, type = "success") {
    const container = ensureContainer();
    const toast = document.createElement("div");

    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("toast--visible");
    });

    setTimeout(() => {
      toast.classList.remove("toast--visible");
      setTimeout(() => toast.remove(), 250);
    }, 2200);
  };
})();
