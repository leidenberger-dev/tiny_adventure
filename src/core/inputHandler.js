import { keys, pressedKeys } from "../config/keys.js";

export const handleInput = function () {
  window.addEventListener("keydown", (e) => {
    Object.keys(keys).forEach((key) => {
      if (e.key === keys[key]) {
        pressedKeys[key] = true;
      }
    });
  });

  window.addEventListener("keyup", (e) => {
    Object.keys(keys).forEach((key) => {
      if (e.key === keys[key]) {
        pressedKeys[key] = false;
      }
    });
  });
};
