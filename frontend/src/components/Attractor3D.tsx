import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

type AttractorType = 'lorenz' | 'chen' | 'rossler' | 'chua' | 'sprott';

interface AttractorConfig {
  name: string;
  label: string;
  dt: number;
  steps: number;
  initial: [number, number, number];
  scale: number;
  center: [number, number, number];
  equations: (x: number, y: number, z: number) => [number, number, number];
  description: string;
}

const ATTRACTOR_CONFIGS: Record<AttractorType, AttractorConfig> = {
  lorenz: {
    name: 'Lorenz',
    label: 'Lorenz (1963)',
    dt: 0.008,
    steps: 5000,
    initial: [0.1, 0, 0],
    scale: 3.8,
    center: [0, 0, 27],
    equations: (x, y, z) => {
      const sigma = 10;
      const rho = 28;
      const beta = 8 / 3;
      return [
        sigma * (y - x),
        x * (rho - z) - y,
        x * y - beta * z,
      ];
    },
    description: 'dx/dt = 10(y - x), dy/dt = x(28 - z) - y, dz/dt = xy - 8/3z',
  },
  chen: {
    name: 'Chen',
    label: 'Chen (1999)',
    dt: 0.005,
    steps: 5500,
    initial: [-0.1, 0.5, -0.6],
    scale: 3.5,
    center: [0, 0, 28],
    equations: (x, y, z) => {
      const a = 35;
      const b = 3;
      const c = 28;
      return [
        a * (y - x),
        (c - a) * x - x * z + c * y,
        x * y - b * z,
      ];
    },
    description: 'dx/dt = 35(y - x), dy/dt = -7x - xz + 28y, dz/dt = xy - 3z',
  },
  rossler: {
    name: 'Rössler',
    label: 'Rössler (1976)',
    dt: 0.02,
    steps: 5000,
    initial: [0.1, 0, 0],
    scale: 7.0,
    center: [0, 0, 5],
    equations: (x, y, z) => {
      const a = 0.2;
      const b = 0.2;
      const c = 5.7;
      return [
        -y - z,
        x + a * y,
        b + z * (x - c),
      ];
    },
    description: 'dx/dt = -y - z, dy/dt = x + 0.2y, dz/dt = 0.2 + z(x - 5.7)',
  },
  chua: {
    name: 'Chua',
    label: 'Chua Double Scroll',
    dt: 0.015,
    steps: 5000,
    initial: [0.7, 0, 0],
    scale: 35.0,
    center: [0, 0, 0],
    equations: (x, y, z) => {
      const alpha = 9.0;
      const beta = 14.286;
      const m0 = -1 / 7;
      const m1 = 2 / 7;
      const h = m1 * x + 0.5 * (m0 - m1) * (Math.abs(x + 1) - Math.abs(x - 1));
      return [
        alpha * (y - x - h),
        x - y + z,
        -beta * y,
      ];
    },
    description: 'Piecewise-linear non-linear resistor double-scroll attractor',
  },
  sprott: {
    name: 'Sprott',
    label: 'Sprott (Case B)',
    dt: 0.02,
    steps: 5000,
    initial: [0.1, 0.1, 0.1],
    scale: 35.0,
    center: [0, 0, 0],
    equations: (x, y, z) => {
      return [
        y * z,
        x - y,
        1 - x * y,
      ];
    },
    description: 'dx/dt = yz, dy/dt = x - y, dz/dt = 1 - xy (Minimal chaotic flow)',
  },
};

// Fourth-order Runge-Kutta numerical solver
function integrateTrajectory(config: AttractorConfig): Float32Array {
  const { dt, steps, initial, scale, center, equations } = config;
  const positions = new Float32Array(steps * 3);

  let [x, y, z] = initial;

  for (let i = 0; i < steps; i++) {
    positions[i * 3] = (x - center[0]) * scale;
    positions[i * 3 + 1] = (y - center[1]) * scale;
    positions[i * 3 + 2] = (z - center[2]) * scale;

    // k1
    const [dx1, dy1, dz1] = equations(x, y, z);
    // k2
    const [dx2, dy2, dz2] = equations(
      x + 0.5 * dt * dx1,
      y + 0.5 * dt * dy1,
      z + 0.5 * dt * dz1
    );
    // k3
    const [dx3, dy3, dz3] = equations(
      x + 0.5 * dt * dx2,
      y + 0.5 * dt * dy2,
      z + 0.5 * dt * dz2
    );
    // k4
    const [dx4, dy4, dz4] = equations(
      x + dt * dx3,
      y + dt * dy3,
      z + dt * dz3
    );

    x += (dt / 6) * (dx1 + 2 * dx2 + 2 * dx3 + dx4);
    y += (dt / 6) * (dy1 + 2 * dy2 + 2 * dy3 + dy4);
    z += (dt / 6) * (dz1 + 2 * dz2 + 2 * dz3 + dz4);
  }

  return positions;
}

export const Attractor3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<AttractorType>('lorenz');
  const lineMeshRef = useRef<THREE.Line | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  // Mouse interaction state
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });

  const activeConfig = ATTRACTOR_CONFIGS[activeType];

  // Update geometry when active system changes
  const updateGeometry = useCallback((type: AttractorType) => {
    if (!lineMeshRef.current) return;
    const config = ATTRACTOR_CONFIGS[type];
    const positions = integrateTrajectory(config);

    const geometry = lineMeshRef.current.geometry;
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();

    // Reset rotation slightly for nice view
    if (groupRef.current) {
      groupRef.current.rotation.set(0.4, 0.6, 0);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 380;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
    camera.position.set(0, 0, 260);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Group for rotation
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Line material with Sage Green from palette (#75A06A)
    const material = new THREE.LineBasicMaterial({
      color: 0x75A06A,
      linewidth: 1.4,
      transparent: true,
      opacity: 0.92,
    });

    const geometry = new THREE.BufferGeometry();
    const line = new THREE.Line(geometry, material);
    group.add(line);
    lineMeshRef.current = line;

    // Initialize with current config
    updateGeometry(activeType);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (groupRef.current && !isDraggingRef.current) {
        groupRef.current.rotation.y += 0.0035;
        groupRef.current.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse handlers for dragging/orbiting
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !groupRef.current) return;
      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;

      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = Math.max(
        120,
        Math.min(420, cameraRef.current.position.z + e.deltaY * 0.15)
      );
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Handle container resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('mousedown', onMouseDown);
      domElement.removeEventListener('wheel', onWheel);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [updateGeometry, activeType]);

  // Handle system switch
  const handleSelectSystem = (type: AttractorType) => {
    setActiveType(type);
    updateGeometry(type);
  };

  return (
    <div className="attractor-figure-wrap">
      <div className="attractor-controls-bar">
        <div className="attractor-system-tabs">
          {(Object.keys(ATTRACTOR_CONFIGS) as AttractorType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSelectSystem(type)}
              className={`attractor-tab-btn ${activeType === type ? 'active' : ''}`}
            >
              {ATTRACTOR_CONFIGS[type].name}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="attractor-canvas-wrapper"
        title="Drag with mouse to rotate 3D phase space trajectory • Scroll to zoom"
      />

      <div className="attractor-caption-box">
        <div>
          <strong>Figure 1:</strong>
          Numerical Runge-Kutta (RK4) integration of the {activeConfig.label} continuous non-linear dynamical system.
          In non-linear cryptography, sensitive dependence on initial conditions (&lambda; &gt; 0) governs pseudorandom sequence generation, confusion-diffusion matrix synthesis, and image cipher keystream expansion.
        </div>
        <div style={{ marginTop: '0.45rem', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
          State Space ODE: {activeConfig.description} • Drag to orbit, scroll to zoom.
        </div>
      </div>
    </div>
  );
};
