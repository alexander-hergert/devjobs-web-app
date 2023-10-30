export const fadeIn = {
  hidden: {
    opacity: 0,
    transition: { duration: 1 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const fadeUp = {
  hidden: {
    y: 100,
    opacity: 0,
    transition: { duration: 1 },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const fadeDown = {
  hidden: {
    y: -100,
    opacity: 0,
    transition: { duration: 1 },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const fadeLeft = {
  hidden: {
    x: -200,
    opacity: 0,
    transition: { duration: 1 },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const fadeRight = {
  hidden: {
    x: 200,
    opacity: 0,
    transition: { duration: 1 },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const shake = {
  animation: {
    x: [0, -10, 10, -10, 10, -5, 5, -5, 0],
  },
  duration: {
    duration: 0.25,
  },
};
