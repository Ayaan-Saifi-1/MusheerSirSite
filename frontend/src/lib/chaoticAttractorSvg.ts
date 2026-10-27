/**
 * Generates a deterministic SVG path for the classical Lorenz chaotic attractor.
 * Parameters: sigma = 10, rho = 28, beta = 8/3
 * Rendered with a thin, 0.75px monochrome line in accordance with Section 3.
 */

export function generateLorenzSvgPath(pointsCount: number = 3200): string {
  const sigma = 10.0;
  const rho = 28.0;
  const beta = 8.0 / 3.0;
  const dt = 0.008;

  let x = 0.1;
  let y = 0.0;
  let z = 0.0;

  // Isometric / oblique rotation angles
  const angleY = 0.785; // 45 degrees
  const angleX = 0.35;

  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);

  const coords: [number, number][] = [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  // Burn-in to discard transient initial segment
  for (let i = 0; i < 400; i++) {
    const dx = sigma * (y - x);
    const dy = x * (rho - z) - y;
    const dz = x * y - beta * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
  }

  for (let i = 0; i < pointsCount; i++) {
    const dx = sigma * (y - x);
    const dy = x * (rho - z) - y;
    const dz = x * y - beta * z;

    x += dx * dt;
    y += dy * dt;
    z += dz * dt;

    // Center Z around mean height (~24)
    const cz = z - 24;

    // 3D rotation
    const rotX = x * cosY - cz * sinY;
    const rotZ = x * sinY + cz * cosY;
    const rotY = y * cosX - rotZ * sinX;

    const px = rotX;
    const py = -rotY;

    if (px < minX) minX = px;
    if (px > maxX) maxX = px;
    if (py < minY) minY = py;
    if (py > maxY) maxY = py;

    coords.push([px, py]);
  }

  const targetWidth = 660;
  const targetHeight = 300;
  const padding = 20;

  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  const scale = Math.min((targetWidth - padding * 2) / rangeX, (targetHeight - padding * 2) / rangeY);

  const offsetX = (targetWidth - rangeX * scale) / 2 - minX * scale;
  const offsetY = (targetHeight - rangeY * scale) / 2 - minY * scale;

  let d = '';
  for (let i = 0; i < coords.length; i++) {
    const sx = (coords[i][0] * scale + offsetX).toFixed(1);
    const sy = (coords[i][1] * scale + offsetY).toFixed(1);
    if (i === 0) {
      d += `M ${sx} ${sy}`;
    } else {
      d += ` L ${sx} ${sy}`;
    }
  }

  return d;
}
