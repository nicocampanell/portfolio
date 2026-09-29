type Point = readonly [number, number];
export type Face = readonly [Point, Point, Point];
export const POSTCARD_REST = 0.99;

// Shared vertices keep neighboring paper folds joined throughout the opening.
const vertices: Point[] = Array.from({ length: 20 }, (_, i) => {
  const col = i % 5;
  const row = Math.floor(i / 5);
  return [
    col / 4 + (col > 0 && col < 4 ? Math.sin(i * 7) * 0.045 : 0),
    row / 3 + (row > 0 && row < 3 ? Math.cos(i * 5) * 0.055 : 0),
  ];
});

export const POSTCARD_FACES: Face[] = Array.from({ length: 12 }, (_, i) => {
  const top = Math.floor(i / 4) * 5 + i % 4;
  const [a, b, c, d] = [vertices[top], vertices[top + 1], vertices[top + 5], vertices[top + 6]];
  return i % 2 ? [[a, b, c], [b, d, c]] as Face[] : [[a, b, d], [a, d, c]] as Face[];
}).flat();

function unfold([x, y]: Point, progress: number, width: number, height: number) {
  const folded = 1 - progress;
  const radius = Math.min(width, height) * 0.075;
  const longitude = x * Math.PI * 3 + y * 0.7;
  const latitude = 0.2 + y * 3.8;
  const ridge = 0.65 + 0.35 * Math.sin(x * 29 + y * 17);
  const bx = radius * Math.sin(latitude) * Math.cos(longitude) * ridge;
  const by = -radius * Math.cos(latitude) * ridge;
  const z = radius * Math.sin(latitude) * Math.sin(longitude) * folded;
  const px = bx * folded + (x - 0.5) * width * progress;
  const py = by * folded + (y - 0.5) * height * progress;
  const pivot = -0.45 * folded;
  return [
    width / 2 + px * Math.cos(pivot) - py * Math.sin(pivot),
    height / 2 + px * Math.sin(pivot) + py * Math.cos(pivot),
    z,
  ];
}

/** Affine map from an artwork triangle to its folded position, in CSS pixels. */
export function postcardFold(face: Face, progress: number, width: number, height: number) {
  const source = face.map(([x, y]) => [x * width, y * height]);
  const target = face.map(point => unfold(point, progress, width, height));
  const [p, q, r] = source;
  const [u, v, w] = target;
  const dx1 = q[0] - p[0], dy1 = q[1] - p[1];
  const dx2 = r[0] - p[0], dy2 = r[1] - p[1];
  const det = dx1 * dy2 - dx2 * dy1;
  const a = ((v[0] - u[0]) * dy2 - (w[0] - u[0]) * dy1) / det;
  const b = ((v[1] - u[1]) * dy2 - (w[1] - u[1]) * dy1) / det;
  const c = (dx1 * (w[0] - u[0]) - dx2 * (v[0] - u[0])) / det;
  const d = (dx1 * (w[1] - u[1]) - dx2 * (v[1] - u[1])) / det;
  const e = u[0] - a * p[0] - c * p[1];
  const f = u[1] - b * p[0] - d * p[1];
  const depth = (u[2] + v[2] + w[2]) / 3;
  const shade = 1 + (Math.sin(p[0] * 0.12 + p[1] * 0.07) * 0.22 - 0.16) * Math.sqrt(1 - progress);
  return { matrix: [a, b, c, d, e, f], depth, shade };
}
