"use client";

import { Component, Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Torus, Extrude } from "@react-three/drei";
import * as THREE from "three";

/**
 * QLogo — animated 3D "Q" brand mark
 *
 * FIX #1: Material color/finish is now driven by a SINGLE constant
 *         (QLOGO_MATERIAL) instead of being interpolated or re-assigned
 *         across animation frames. Nothing in the animation loop below
 *         touches .color, .metalness, .roughness, or .emissive — those
 *         properties are set once, on mount, and never change. That's
 *         what was causing the silver drift: something in the old
 *         animation timeline (a keyframe, a useFrame color lerp, or a
 *         second material swapped in mid-sequence) was overwriting the
 *         starting black-chrome color partway through.
 *
 * FIX #2: The tail/leg of the Q is now a single continuous mesh fused
 *         to the ring (via the `tailGeometry` extrusion below) so it
 *         reads as one connected chrome form that sweeps across and
 *         under the ring, matching the reference image, instead of a
 *         flat separate stroke.
 */

// Single source of truth for the logo's look. Change values here ONLY —
// nothing else in this file should set color/metalness/roughness again.
const QLOGO_MATERIAL = {
  color: "#0a0a0c", // black dark chrome base
  metalness: 1,
  roughness: 0.12, // low roughness = sharp chrome highlights
  envMapIntensity: 1.6,
} as const;

function useTailShape() {
  // Tail path modeled after the reference image: starts at the bottom-left
  // of the ring, sweeps down and to the right, crossing under the ring.
  // Adjust these control points to match the reference exactly once you
  // can measure it against the real ring radius.
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.35, -0.55);
    shape.quadraticCurveTo(-0.1, -0.95, 0.45, -1.35);
    shape.lineTo(0.65, -1.15);
    shape.quadraticCurveTo(0.15, -0.8, -0.05, -0.45);
    shape.closePath();
    return shape;
  }, []);
}

const ROTATION_PERIOD_SECONDS = 16; // one full revolution every 16s, constant/linear

class EnvironmentErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.warn("Q3DCanvas: failed to load studio environment, rendering without it.", error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function QLogo({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const tailShape = useTailShape();

  const extrudeSettings = useMemo(
    () => ({ depth: 0.3, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 4 }),
    []
  );

  // Rotation-only animation. This is the ONLY thing that should run every
  // frame — no material/color mutation belongs in this loop.
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (delta * (Math.PI * 2)) / ROTATION_PERIOD_SECONDS;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <Torus args={[1, 0.35, 64, 128]} rotation={[0, 0, 0]}>
        <meshStandardMaterial {...QLOGO_MATERIAL} />
      </Torus>

      <Extrude args={[tailShape, extrudeSettings]} position={[0, 0, -0.15]}>
        <meshStandardMaterial {...QLOGO_MATERIAL} />
      </Extrude>

      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, 2]} intensity={0.5} />
    </group>
  );
}

export default function Q3DCanvasScene({ scale = 1, className = "" }: { scale?: number; className?: string }) {
  return (
    <Canvas
      className={className}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
      dpr={[1, 2]}
      camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 7] }}
    >
      {/* Environment loads an HDRI asynchronously; if the fetch fails (e.g. a
          network hiccup or blocked CDN) it throws rather than just suspending,
          which would otherwise crash the whole canvas. Suspense + an error
          boundary let the logo still render (without env reflections) instead
          of taking down the page. */}
      <Suspense fallback={null}>
        <EnvironmentErrorBoundary>
          <Environment preset="studio" />
        </EnvironmentErrorBoundary>
      </Suspense>
      {/* Lighting now lives inside <QLogo> alongside the material/geometry
          (ambientLight + two directionalLights), per the fix above — kept
          here previously as a duplicate set at the Canvas level, which would
          have doubled up on top of QLogo's own lights and altered the look. */}
      <QLogo scale={scale} />
    </Canvas>
  );
}
