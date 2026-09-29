/** Motion UI `snap`: { stiffness: 1218, damping: 70 } — ≈ critically damped. */
export const CAMERA_S = 0.25;

/** Computed CSS may normalize a millisecond token to seconds (500ms → .5s). */
export function cssTimeMs(value: string) {
  const time = value.trim();
  return parseFloat(time) * (time.endsWith("ms") ? 1 : 1000);
}

const W0 = Math.sqrt(1218);
const END = 1 - (1 + W0 * CAMERA_S) * Math.exp(-W0 * CAMERA_S);

/** Progress of the snap spring over normalized time `t` ∈ [0, 1]. Matches CSS `--ease-camera`. */
export function cameraEase(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const time = t * CAMERA_S;
  return (1 - (1 + W0 * time) * Math.exp(-W0 * time)) / END;
}
