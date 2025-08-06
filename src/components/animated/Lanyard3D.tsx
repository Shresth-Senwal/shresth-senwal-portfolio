// Lanyard3D - 3D falling lanyard tags for each team member, with team name on back.
// Uses @react-three/fiber, drei, rapier, meshline, and three.js. See prompt.md for requirements.
// Each tag: front = member name, back = 'bluds'.
// Dependencies: @react-three/fiber, @react-three/drei, @react-three/rapier, meshline, three
// Asset requirements: card.glb, lanyard.png in src/assets/lanyard
// Vite config: assetsInclude: ['**/*.glb']
// TypeScript: see prompt.md for module declarations if needed
"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer, Html } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, RigidBodyProps } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

// Use dynamic imports for assets to avoid build-time resolution issues
const cardGLBUrl = "/assets/lanyard/card.glb";
const lanyardUrl = "/assets/lanyard/lanyard.png";

// Test asset availability
const testAssetAvailability = async () => {
  try {
    const glbResponse = await fetch(cardGLBUrl);
    const pngResponse = await fetch(lanyardUrl);
    console.log("Asset check - GLB:", glbResponse.ok ? "✅ Available" : "❌ Not found");
    console.log("Asset check - PNG:", pngResponse.ok ? "✅ Available" : "❌ Not found");
  } catch (error) {
    console.warn("Asset availability check failed:", error);
  }
};

testAssetAvailability();

extend({ MeshLineGeometry, MeshLineMaterial });

interface Lanyard3DProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

const TEAM = [
  { name: "Shresth" },
  { name: "Shresth" },
  { name: "Dhruv" },
];

export const Lanyard3D: React.FC<Lanyard3DProps> = ({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Add error boundary with more detailed error handling
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.warn("3D scene taking too long to load, showing fallback");
        setHasError(true);
        setErrorMessage("3D scene load timeout");
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (hasError) {
    return (
      <div className="relative z-0 w-full h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-white text-center p-8">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Team Lanyard
          </h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {TEAM.map((member, index) => (
              <div 
                key={member.name} 
                className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3 mx-auto flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{member.name[0]}</span>
                </div>
                <p className="font-bold text-lg">{member.name}</p>
                <p className="text-sm opacity-70 text-blue-300">AI/ML Engineer</p>
              </div>
            ))}
          </div>
          {errorMessage && (
            <p className="text-xs text-gray-400 mt-4">Debug: {errorMessage}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center bg-black">
      {/* Always visible debug info */}
      <div className="absolute top-4 left-4 text-white text-xs z-50 bg-black/50 p-2 rounded">
        3D Status: {isLoading ? "Loading..." : hasError ? "Error" : "Ready"}
      </div>
      
      <Canvas
        camera={{ position, fov }}
        gl={{ 
          alpha: transparent,
          antialias: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          console.log("Canvas created successfully");
          setIsLoading(false);
        }}
        onError={(error) => {
          console.error("Canvas error:", error);
          setHasError(true);
          setErrorMessage(`Canvas error: Unknown error`);
        }}
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading 3D Scene...</p>
            </div>
          </div>
        }
      >
        {/* Always visible test mesh */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="red" />
        </mesh>
        
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={
          <Html center>
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-sm">Loading assets...</p>
            </div>
          </Html>
        }>
          <SimpleErrorBoundary onError={(error) => {
            console.error("Physics error:", error);
            setHasError(true);
            setErrorMessage(`Physics error: ${error.message}`);
          }}>
            <Physics gravity={gravity} timeStep={1 / 60}>
              {TEAM.map((member, i) => (
                <Band key={member.name} index={i} name={member.name} onError={(error) => {
                  console.error(`Band error for ${member.name}:`, error);
                  setHasError(true);
                  setErrorMessage(`Band error: ${error}`);
                }} />
              ))}
            </Physics>
          </SimpleErrorBoundary>
        </Suspense>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
};

interface BandProps {
  index: number;
  name: string;
  maxSpeed?: number;
  minSpeed?: number;
  onError?: (error: string) => void;
}

// Simple Error Boundary Component
class SimpleErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError?: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return null; // Let parent handle the error
    }

    return this.props.children;
  }

}

function Band({ index, name, maxSpeed = 50, minSpeed = 0, onError }: BandProps) {
  // Refs for physics bodies
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const ropeJoints = useRef<any[]>([]);
  const sphericalJoint = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  // Add error handling for asset loading
  let nodes: any, materials: any, texture: any;
  
  try {
    const gltf = useGLTF(cardGLBUrl);
    nodes = gltf.nodes;
    materials = gltf.materials;
    console.log("GLB loaded successfully:", gltf);
  } catch (error) {
    console.warn("Failed to load GLB model:", error);
    onError?.("Failed to load GLB model");
    // Use fallback geometry
    nodes = { 
      card: { geometry: new THREE.BoxGeometry(1, 1, 0.1) },
      clip: { geometry: new THREE.BoxGeometry(0.2, 0.2, 0.1) },
      clamp: { geometry: new THREE.BoxGeometry(0.1, 0.1, 0.1) }
    };
    materials = { 
      base: { map: null }, 
      metal: new THREE.MeshStandardMaterial({ color: 0x888888 }) 
    };
  }

  // Load texture with proper error handling
  try {
    console.log("Attempting to load texture from:", lanyardUrl);
    texture = useLoader(THREE.TextureLoader, lanyardUrl);
    
    if (texture) {
      console.log("✅ Texture loaded successfully:", texture);
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.needsUpdate = true;
    } else {
      throw new Error("Texture loader returned null");
    }
    console.log("useLoader hook executed successfully");
  } catch (error) {
    console.error("❌ Failed to load texture:", error);
    onError?.(`Failed to load texture: ${error}`);
    
    // Create a more visible fallback texture with pattern
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, 256, 256);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    // Add texture pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let x = 0; x < 256; x += 32) {
      for (let y = 0; y < 256; y += 32) {
        if ((x + y) % 64 === 0) {
          ctx.fillRect(x, y, 16, 16);
        }
      }
    }
    
    // Add "FALLBACK" text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('FALLBACK', 128, 128);
    
    texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    console.log("✅ Fallback texture created successfully");
  }
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const [isSmall, setIsSmall] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmall(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  // Imperative joint creation for @react-three/rapier v0.11.1
  useEffect(() => {
    if (
      fixed.current && j1.current && j2.current && j3.current && card.current &&
      fixed.current.world &&
      ropeJoints.current.length === 0
    ) {
      const world = fixed.current.world;
      // Rope joints
      ropeJoints.current.push(
        world.createImpulseJoint(
          "rope",
          fixed.current,
          j1.current,
          [[0, 0, 0], [0, 0, 0], 1]
        )
      );
      ropeJoints.current.push(
        world.createImpulseJoint(
          "rope",
          j1.current,
          j2.current,
          [[0, 0, 0], [0, 0, 0], 1]
        )
      );
      ropeJoints.current.push(
        world.createImpulseJoint(
          "rope",
          j2.current,
          j3.current,
          [[0, 0, 0], [0, 0, 0], 1]
        )
      );
      // Spherical joint
      sphericalJoint.current = world.createImpulseJoint(
        "spherical",
        j3.current,
        card.current,
        [
          [0, 0, 0],
          [0, 1.45, 0],
        ]
      );
    }
    return () => {
      if (ropeJoints.current.length && fixed.current && fixed.current.world) {
        ropeJoints.current.forEach(joint => fixed.current.world.removeImpulseJoint(joint));
        ropeJoints.current = [];
      }
      if (sphericalJoint.current && fixed.current && fixed.current.world) {
        fixed.current.world.removeImpulseJoint(sphericalJoint.current);
        sphericalJoint.current = null;
      }
    };
  }, [fixed.current, j1.current, j2.current, j3.current, card.current]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";

  // Offset each lanyard horizontally
  const xOffset = (index - 1) * 3.5;

  return (
    <>
      <group position={[xOffset, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={"fixed" as RigidBodyProps["type"]} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]} >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]} >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]} >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? ("kinematicPosition" as RigidBodyProps["type"])
              : ("dynamic" as RigidBodyProps["type"])
          }
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            {/* Card front: member name */}
            <mesh geometry={nodes.card?.geometry || new THREE.BoxGeometry(1, 1, 0.1)}>
              <meshPhysicalMaterial
                map={materials.base?.map || null}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
              <Html
                position={[0, 0, 0.06]}
                center
                style={{
                  fontSize: isSmall ? 18 : 28,
                  fontWeight: 700,
                  color: "#fff",
                  textShadow: "0 2px 8px #000, 0 0 2px #000",
                  letterSpacing: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                transform
                occlude
              >
                {name}
              </Html>
              {/* Card back: team name */}
              <Html
                position={[0, 0, -0.06]}
                center
                style={{
                  fontSize: isSmall ? 18 : 28,
                  fontWeight: 700,
                  color: "#fff",
                  textShadow: "0 2px 8px #000, 0 0 2px #000",
                  letterSpacing: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                  transform: "rotateY(180deg)",
                }}
                transform
                occlude
              >
                bluds
              </Html>
            </mesh>
            <mesh geometry={nodes.clip?.geometry || new THREE.BoxGeometry(0.2, 0.2, 0.1)} material={materials.metal || new THREE.MeshStandardMaterial({ color: 0x888888 })} material-roughness={0.3} />
            <mesh geometry={nodes.clamp?.geometry || new THREE.BoxGeometry(0.1, 0.1, 0.1)} material={materials.metal || new THREE.MeshStandardMaterial({ color: 0x888888 })} />
          </group>
        </RigidBody>
      </group>
      {/* Lanyard band */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

// Add at the top or after imports:
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}