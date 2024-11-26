import normalize from "./normalize";

export const middleFadeIn = {
  0: {
    opacity: 0,
    translateY: normalize(20),
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};

export const fadeZoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

export const slideInUp = {
  0: {
    translateY: 100,
  },
  0.5: {
    translateY: -0.3,
  },
  1: {
    translateY: -0.5,
  },
  2: {
    translateY: -1,
  },
};

export const slideInLeft = {
  0: {
    translateX: 100,
  },
  0.5: {
    translateX: -0.3,
  },
  1: {
    translateX: -0.5,
  },
  2: {
    translateX: -1,
  },
};

export const slideInRight = {
  0: {
    translateX: -100,
  },
  0.5: {
    translateX: 0.3,
  },
  1: {
    translateX: 0.5,
  },
  2: {
    translateX: 1,
  },
};
