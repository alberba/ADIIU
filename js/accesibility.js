let resetFontValue = 16; // Tamaño de fuente por defecto en px

function changeSize(action) {
  const body = document.documentElement;
  let currentSize = parseInt(window.getComputedStyle(body).fontSize);
  let newSize;

  if (action === "increase" && currentSize < 32) {
    newSize = currentSize + 2;
  } else if (action === "decrease" && currentSize > 12) {
    newSize = currentSize - 2;
  } else if (action === "reset") {
    newSize = resetFontValue;
  }

  if (newSize) {
    body.style.fontSize = newSize + "px";
  }
}
