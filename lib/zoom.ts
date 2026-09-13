/** Zoom floor the camera eases to, measured off the reference capture. */
export const SCALE_OUT = 0.734;

export function zoomFromScroll(scrollLeft: number, step: number) {
  return 1 + (SCALE_OUT - 1) * Math.min(1, scrollLeft / step);
}
