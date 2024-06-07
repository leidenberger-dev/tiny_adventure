export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");

export function setupCanvas() {
  canvas.width = 1280;
  canvas.height = 720;
}
