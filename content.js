// Content script for arXiv pages.
// It injects a floating button on supported arXiv pages so the user can
// jump to the matching AlphaXiv page with one click.

function isSupportedArxivPage(url) {
  return /^https?:\/\/arxiv\.org\/(abs|pdf)\/[^/?#]+/.test(url);
}

function toAlphaXivUrl(arxivUrl) {
  return arxivUrl.replace(/^https?:\/\/arxiv\.org/, "https://alphaxiv.org");
}

function createJumpButton(targetUrl) {
  if (document.getElementById("arxiv-to-alphaxiv-button")) {
    return;
  }

  let isDragging = false;
  let didDrag = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let pointerStartX = 0;
  let pointerStartY = 0;
  const dragThreshold = 6;

  const button = document.createElement("button");
  button.id = "arxiv-to-alphaxiv-button";
  button.textContent = "Open in AlphaXiv";
  button.type = "button";

  // Keep the button visible but unobtrusive.
  Object.assign(button.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    zIndex: "2147483647",
    padding: "10px 14px",
    border: "none",
    borderRadius: "999px",
    background: "#1f6feb",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)"
  });

  const startDrag = (clientX, clientY) => {
    const rect = button.getBoundingClientRect();
    isDragging = true;
    didDrag = false;
    pointerStartX = clientX;
    pointerStartY = clientY;
    dragOffsetX = clientX - rect.left;
    dragOffsetY = clientY - rect.top;
    button.style.transition = "none";
  };

  const updatePosition = (clientX, clientY) => {
    const nextLeft = Math.max(0, clientX - dragOffsetX);
    const nextTop = Math.max(0, clientY - dragOffsetY);
    button.style.left = `${nextLeft}px`;
    button.style.top = `${nextTop}px`;
    button.style.right = "auto";
    button.style.bottom = "auto";
  };

  const stopDrag = () => {
    isDragging = false;
    button.style.transition = "";
  };

  button.addEventListener("pointerdown", (event) => {
    startDrag(event.clientX, event.clientY);
    button.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  button.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }
    const movedDistance = Math.max(
      Math.abs(event.clientX - pointerStartX),
      Math.abs(event.clientY - pointerStartY)
    );
    if (movedDistance >= dragThreshold) {
      didDrag = true;
    }
    updatePosition(event.clientX, event.clientY);
  });

  button.addEventListener("pointerup", () => {
    stopDrag();
  });

  button.addEventListener("pointercancel", () => {
    stopDrag();
  });

  button.addEventListener("click", (event) => {
    if (didDrag) {
      event.preventDefault();
      event.stopPropagation();
      didDrag = false;
      return;
    }
    // Use a normal navigation so the current arXiv page stays in browser history.
    window.location.assign(targetUrl);
  });

  document.documentElement.appendChild(button);
}

if (isSupportedArxivPage(window.location.href)) {
  createJumpButton(toAlphaXivUrl(window.location.href));
}
