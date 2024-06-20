export const boySprite = {
  img: "../assets/img/boy.png",
  frameWidth: 200,
  frameHeight: 250,
  maxColumns: 10,
  offsetX: 35,
  offsetY: 35,
  offsetWidth: 125,
  offsetHeight: 58,
  animationSpeed: 5,

  idle: {
    row: 1,
    maxColumns: 10,
  },
  walking: {
    row: 0,
    maxColumns: 10,
  },
  jumping: {
    row: 6,
    maxColumns: 10,
  },
  falling: {
    row: 7,
    maxColumns: 10,
  },

  attack: {
    row: 4,
    maxColumns: 10,
  },
};

export const pepeSprite = {
  img: "../assets/img/pepe.png",
  position: {
    x: 3350,
    y: 1015,
  },
  frameWidth: 240.16,
  frameHeight: 472.44,
  maxColumns: 9,
  offsetX: -60,
  offsetY: 125,
  offsetWidth: 20,
  offsetHeight: 58,
  animationSpeed: 10,

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
