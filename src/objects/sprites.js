export const boySprite = {
  img: "../assets/img/boy.png",
  frameWidth: 265.6,
  frameHeight: 250,
  maxColumns: 10,
  offsetX: 25,
  offsetY: 35,
  offsetWidth: 165,
  offsetHeight: 58,
  animationSpeed: 7,
  mirrorPoint: 1.75,

  idle: {
    row: 1,
    maxColumns: 4,
  },
  walking: {
    row: 0,
    maxColumns: 4,
  },
  jumping: {
    row: 2,
    maxColumns: 6,
  },
  falling: {
    row: 5,
    maxColumns: 2,
  },

  attack: {
    row: 4,
    maxColumns: 6,
  },
  climbing: {
    row: 6,
    maxColumns: 6,
  },
};

export const pepeSprite = {
  img: "../assets/img/pepe.png",
  position: {
    x: 3180,
    y: 1015,
  },
  frameWidth: 240.16,
  frameHeight: 472.44,
  maxColumns: 9,
  offsetX: 60,
  offsetY: 125,
  offsetWidth: 20,
  offsetHeight: 120,
  animationSpeed: 10,
  mirrorPoint: 0.75,

  idle: {
    row: 1,
    maxColumns: 10,
  },
  sleep: {
    row: 2,
    maxColumns: 10,
  },

  walking: {
    row: 0,
    maxColumns: 6,
  },
};

export const doorSprite = {
  img: "../assets/img/door.png",
  position: {
    x: 3310,
    y: 1200,
  },
  frameWidth: 159,
  frameHeight: 252,
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
  img: "../assets/img/wolf.png",
  position: {
    x: 3310,
    y: 1200,
  },
  frameWidth: 410.5,
  frameHeight: 234.5,
  maxColumns: 5,
  offsetX: 20,
  offsetY: 70,
  offsetWidth: 100,
  offsetHeight: 85,
  animationSpeed: 7,
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
};
