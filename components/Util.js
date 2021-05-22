export const sppx = (value) => `calc(${value} / 375 * 100vw)`
export const pcpx = (value) =>
  value < 0
    ? `max(${value} / 1366 * 100vw, 1920px / 1366 * ${value})`
    : `min(${value} / 1366 * 100vw, 1920px / 1366 * ${value})`
export const pcfz = (value) =>
  `clamp(12px, ${value} / 1600 * 100vw, 1920px / 1600 * ${value})`
