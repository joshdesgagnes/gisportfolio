let zIndexCounter = 10;

function openWindow(id) {
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  document.getElementById('start-menu').classList.add('hidden');
  focusWindow(el);
}

function closeWindow(id) {
  document.getElementById(id).classList.add('hidden');
}

function focusWindow(el) {
  zIndexCounter++;
  el.style.zIndex = zIndexCounter;
}

let dragOffsetX, dragOffsetY;
function startDrag(e, windowEl) {
  const rect = windowEl.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;

  function onMouseMove(e) {
    windowEl.style.left = (e.clientX - dragOffsetX) + 'px';
    windowEl.style.top = (e.clientY - dragOffsetY) + 'px';
  }

  function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

document.getElementById('start-button').addEventListener('click', () => {
  document.getElementById('start-menu').classList.toggle('hidden');
});

// Live Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();
