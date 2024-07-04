export const boySprite = {
  img: "./assets/img/boy.png",
  frameWidth: 132.8,
  frameHeight: 125,
  offsetX: 12.5,
  offsetY: 17.5,
  offsetWidth: 60,
  offsetHeight: 29,
  animationSpeed: 7,
  mirrorPoint: 1.38,

  idle: {
    row: 1,
    maxColumns: 4,
  },
  walking: {
    row: 0,
    maxColumns: 4,
    sound: "./assets/sounds/player/footstaps.mp3",
    volume: 1,
    speed: 3,
  },
  jumping: {
    row: 2,
    maxColumns: 6,
    sound: "./assets/sounds/player/jump.mp3",
    volume: 0.7,
    speed: 1,
  },
  falling: {
    row: 5,
    maxColumns: 2,
  },

  attack: {
    row: 4,
    maxColumns: 6,
    sound: "./assets/sounds/player/attack.mp3",
    volume: 0.7,
    speed: 1.3,
  },
  climbing: {
    row: 6,
    maxColumns: 6,
  },

  shooting: {
    row: 8,
    maxColumns: 9,
    sound: "./assets/sounds/player/arrow.mp3",
    volume: 0.7,
    speed: 1,
  },

  hurt: {
    row: 9,
    maxColumns: 5,
    sound: "./assets/sounds/player/hurt.wav",
    volume: 0.7,
    speed: 1,
  },

  dead: {
    row: 7,
    maxColumns: 7,
    sound: "./assets/sounds/player/dead.mp3",
    volume: 0.7,
    speed: 1,
  },
};

export const pepeSprite = {
  img: "./assets/img/pepe.png",
  position: {
    x: 3180 / 2,
    y: 1015 / 2,
  },
  frameWidth: 240.16 / 2,
  frameHeight: 472.44 / 2,
  offsetX: 60 / 2,
  offsetY: 125 / 2,
  offsetWidth: 20 / 2,
  offsetHeight: 120 / 2,
  animationSpeed: 10,
  mirrorPoint: 0.75,

  idle: {
    row: 1,
    maxColumns: 10,
  },
  sleep: {
    row: 2,
    maxColumns: 10,
    sound: "./assets/sounds/pepe/snoring.mp3",
    volume: 0.7,
    speed: 2,
  },

  walking: {
    row: 0,
    maxColumns: 6,
  },
};

export const doorSprite = {
  img: "./assets/img/door.png",
  position: {
    x: 1655,
    y: 600,
  },
  frameWidth: 79.5,
  frameHeight: 126,
  maxColumns: 5,
  offsetX: 0,
  offsetY: 0,
  offsetWidth: 0,
  offsetHeight: 0,
  animationSpeed: 10,

  close: {
    row: 0,
    maxColumns: 0,
  },

  open: {
    row: 0,
    maxColumns: 6,
  },
};

export const wolfSprite = {
  img: "./assets/img/wolf.png",
  position: {
    x: 1655,
    y: 600,
  },
  frameWidth: 205.25,
  frameHeight: 117.25,
  offsetX: 10,
  offsetY: 35,
  offsetWidth: 50,
  offsetHeight: 42.5,
  animationSpeed: 5,
  mirrorPoint: 1.2,

  idle: {
    row: 0,
    maxColumns: 3,
  },

  walk: {
    row: 1,
    maxColumns: 4,
  },

  attack: {
    row: 2,
    maxColumns: 7,
  },

  dead: {
    row: 3,
    maxColumns: 5,
  },
};

export const bisonSprite = {
  img: "./assets/img/bison.png",
  position: {
    x: 1655,
    y: 600,
  },
  frameWidth: 215.25,
  frameHeight: 147,
  offsetX: 20,
  offsetY: 35,
  offsetWidth: 75,
  offsetHeight: 42.5,
  animationSpeed: 8,
  mirrorPoint: 1.2,

  idle: {
    row: 0,
    maxColumns: 3,
  },

  walk: {
    row: 1,
    maxColumns: 4,
  },

  attack: {
    row: 2,
    maxColumns: 4,
  },

  dead: {
    row: 3,
    maxColumns: 5,
  },
};

export const bearSprite = {
  img: "./assets/img/bear.png",
  position: {
    x: 1655,
    y: 600,
  },
  frameWidth: 259.25,
  frameHeight: 232,
  offsetX: 35,
  offsetY: 45,
  offsetWidth: 135,
  offsetHeight: 42.5,
  animationSpeed: 10,
  mirrorPoint: 1.35,

  idle: {
    row: 0,
    maxColumns: 3,
  },

  walk: {
    row: 1,
    maxColumns: 4,
  },

  attack: {
    row: 2,
    maxColumns: 5,
  },

  dead: {
    row: 3,
    maxColumns: 6,
  },
};

export const arrowSprite = {
  img: "./assets/img/arrow.png",
  position: {
    x: 1655,
    y: 600,
  },
  frameWidth: 63,
  frameHeight: 8.5,
  offsetX: 0,
  offsetY: 0,
  offsetWidth: 0,
  offsetHeight: 0,
  animationSpeed: 8,
  mirrorPoint: 1.2,

  arrow: {
    row: 0,
    maxColumns: 0,
  },
};

export const barsSprite = {
  img: "./assets/img/bars.png",
  position: {
    x: 0,
    y: 0,
  },
  frameWidth: 148.75,
  frameHeight: 39.5,
  offsetX: 10,
  offsetY: 35,
  offsetWidth: 50,
  offsetHeight: 42.5,
  animationSpeed: 5,
  mirrorPoint: 1.2,
};

export const buttonsSprite = {
  img: "./assets/img/buttons.png",
  position: {
    x: 0,
    y: 0,
  },
  frameWidth: 53,
  frameHeight: 55,
  offsetX: 10,
  offsetY: 35,
  offsetWidth: 50,
  offsetHeight: 42.5,
  animationSpeed: 5,
  mirrorPoint: 1.2,
};

export const mobileButtonsSprite = {
  img: "./assets/img/mobilebuttons.png",
  position: {
    x: 0,
    y: 0,
  },
  frameWidth: 51.3,
  frameHeight: 55,
  offsetX: 10,
  offsetY: 35,
  offsetWidth: 50,
  offsetHeight: 42.5,
  animationSpeed: 5,
  mirrorPoint: 1.2,
};

export const mainButtonsSprite = {
  img: "./assets/img/mainbuttons.png",
  position: {
    x: 0,
    y: 0,
  },
  frameWidth: 131,
  frameHeight: 45,
  maxColumns: 5,
  offsetX: 10,
  offsetY: 35,
  offsetWidth: 50,
  offsetHeight: 42.5,
  animationSpeed: 5,
  mirrorPoint: 1.2,
};

export const keysSprite = {
  img: "./assets/img/keys.png",
  position: {
    x: 0,
    y: 0,
  },
  frameWidth: 167.5,
  frameHeight: 223,
  maxColumns: 5,
  offsetX: 10,
  offsetY: 35,
  offsetWidth: 50,
  offsetHeight: 42.5,
  animationSpeed: 5,
  mirrorPoint: 1.2,
};

export const arrowsAmountSprite = {
  img: "./assets/img/arrows-amount.png",
  position: {
    x: 0,
    y: 0,
  },
  frameWidth: 82.5,
  frameHeight: 39.5,
  maxColumns: 5,
  offsetX: 10,
  offsetY: 35,
  offsetWidth: 50,
  offsetHeight: 42.5,
  animationSpeed: 5,
  mirrorPoint: 1.2,
};

export const bossSprite = {
  img: "./assets/img/level3/boss.png",
  position: {
    x: 827.5,
    y: 300,
  },
  frameWidth: 195.9375,
  frameHeight: 228.1875,
  maxColumns: 8,
  offsetX: 10,
  offsetY: 35,
  offsetWidth: 25,
  offsetHeight: 42.5,
  animationSpeed: 10,
  mirrorPoint: 1,

  idle: {
    row: 0,
    maxColumns: 8,
  },

  walk: {
    row: 1,
    maxColumns: 4,
  },

  attack: {
    row: 2,
    maxColumns: 8,
  },

  dead: {
    row: 3,
    maxColumns: 3,
  },
};
