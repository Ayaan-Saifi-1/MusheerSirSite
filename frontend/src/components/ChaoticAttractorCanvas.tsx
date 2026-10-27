import React, { useEffect, useRef } from 'react';

/**
 * Interactive 3D Hyperchaotic Attractor Canvas
 * Visualizes non-linear dynamical phase trajectories in real time,
 * symbolizing Dr. Musheer Ahmad's research in Chaos Cryptology.
 */
export const ChaoticAttractorCanvas: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 320);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 320);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Lorenz / Chen hyperchaotic system parameters
    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;
    const dt = 0.01;

    let x = 0.1;
    let y = 0;
    let z = 0;

    const points: { x: number; y: number; z: number; color: string }[] = [];
    const maxPoints = 650;
    let angle = 0;

    const render = () => {
      // Step simulation
      for (let i = 0; i < 4; i++) {
        const dx = sigma * (y - x) * dt;
        const dy = (x * (rho - z) - y) * dt;
        const dz = (x * y - beta * z) * dt;
        x += dx;
        y += dy;
        z += dz;

        // Dynamic color shifting between Amber/Gold (#D97706) and Cobalt/Cyan (#2563EB / #06B6D4)
        const hue = 190 + Math.sin(points.length * 0.02) * 50;
        points.push({
          x,
          y,
          z,
          color: `hsla(${hue}, 85%, 60%, 0.85)`,
        });

        if (points.length > maxPoints) {
          points.shift();
        }
      }

      // Clear with slight trail fade
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 15;
      const scale = Math.min(width, height) / 60;
      angle += 0.006;

      ctx.lineWidth = 1.4;
      ctx.lineCap = 'round';

      for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];

        // 3D rotation around Y axis
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const x1Rot = p1.x * cosA - (p1.z - 25) * sinA;
        const x2Rot = p2.x * cosA - (p2.z - 25) * sinA;

        const screenX1 = centerX + x1Rot * scale;
        const screenY1 = centerY - (p1.y - 2) * scale;
        const screenX2 = centerX + x2Rot * scale;
        const screenY2 = centerY - (p2.y - 2) * scale;

        const alpha = (i / points.length) * 0.9;
        ctx.beginPath();
        ctx.strokeStyle = p2.color.replace('0.85)', `${alpha})`);
        ctx.moveTo(screenX1, screenY1);
        ctx.lineTo(screenX2, screenY2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
    />
  );
};
