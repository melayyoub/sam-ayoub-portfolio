/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Environment, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Office Room Shell ─── */
function OfficeRoom() {
  const wallColor = '#2a2a3a';
  const floorColor = '#3a3530';
  const ceilingColor = '#1e1e2e';

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color={floorColor} roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, 0]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color={ceilingColor} roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Back Wall */}
      <mesh position={[0, 1.6, -3]} receiveShadow>
        <planeGeometry args={[8, 3.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-4, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[4, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6, 3.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Baseboard trim */}
      <mesh position={[0, 0.06, -2.97]}>
        <boxGeometry args={[8, 0.12, 0.06]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-3.97, 0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 0.12, 0.06]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[3.97, 0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 0.12, 0.06]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  );
}

/* ─── Window with City View ─── */
function CityWindow({ position = [0, 1.8, -2.95] }) {
  return (
    <group position={position}>
      {/* Window frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.6, 0.08]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Window glass - dark with city glow */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.2, 1.4]} />
        <meshStandardMaterial
          color="#0a1525"
          emissive="#1a3050"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Window dividers */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.04, 1.4, 0.02]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[2.2, 0.04, 0.02]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* City light dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -0.9 + Math.random() * 1.8,
            -0.5 + Math.random() * 1.0,
            0.07
          ]}
        >
          <planeGeometry args={[0.03, 0.04]} />
          <meshStandardMaterial
            color="#ffdd88"
            emissive="#ffdd88"
            emissiveIntensity={0.8 + Math.random() * 0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Office Desk ─── */
function OfficeDesk({ onClick, isHovered, onHover = () => {} }) {
  const deskColor = '#4a3a2a';
  const metalColor = '#555555';

  return (
    <group position={[0, 0, -1.5]}>
      {/* Desk surface */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow
        onClick={onClick}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <boxGeometry args={[2.2, 0.06, 1.0]} />
        <meshStandardMaterial
          color={isHovered ? '#5a4a3a' : deskColor}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      {/* Desk legs - metal frame style */}
      {[[-1.0, 0.37, 0.4], [1.0, 0.37, 0.4], [-1.0, 0.37, -0.4], [1.0, 0.37, -0.4]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.05, 0.74, 0.05]} />
          <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {/* Desk crossbar */}
      <mesh position={[0, 0.15, 0.4]} castShadow>
        <boxGeometry args={[2.0, 0.04, 0.04]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.15, -0.4]} castShadow>
        <boxGeometry args={[2.0, 0.04, 0.04]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Keyboard */}
      <mesh position={[-0.1, 0.81, 0.15]} castShadow>
        <boxGeometry args={[0.5, 0.02, 0.18]} />
        <meshStandardMaterial color="#222233" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Mouse */}
      <mesh position={[0.35, 0.81, 0.15]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.1]} />
        <meshStandardMaterial color="#222233" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Coffee mug */}
      <group position={[0.85, 0.81, 0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.09, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Mug handle */}
        <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.025, 0.006, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
      {/* Notepad */}
      <mesh position={[-0.7, 0.8, 0.2]} rotation={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.2, 0.01, 0.15]} />
        <meshStandardMaterial color="#f5f5e8" roughness={0.9} metalness={0} />
      </mesh>
      {/* Pen */}
      <mesh position={[-0.6, 0.82, 0.25]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.005, 0.005, 0.14]} />
        <meshStandardMaterial color="#1a1a3e" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Hover glow indicator */}
      {isHovered && (
        <mesh position={[0, 0.81, 0]}>
          <planeGeometry args={[2.0, 0.8]} />
          <meshStandardMaterial
            color="#4a9eff"
            emissive="#4a9eff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.08}
          />
        </mesh>
      )}
    </group>
  );
}

/* ─── Monitor with Screen ─── */
function Monitor({ onClick, isHovered, onHover = () => {} }) {
  const screenRef = useRef();
  const [time, setTime] = useState(0);

  useFrame((state) => {
    if (screenRef.current) {
      setTime(state.clock.elapsedTime);
    }
  });

  return (
    <group position={[0, 0, -1.5]}>
      {/* Monitor body */}
      <group position={[0, 1.15, -0.25]}>
        <RoundedBox
          args={[0.9, 0.55, 0.04]}
          radius={0.02}
          castShadow
          onClick={onClick}
          onPointerOver={() => onHover(true)}
          onPointerOut={() => onHover(false)}
        >
          <meshStandardMaterial
            color={isHovered ? '#2a2a4a' : '#1a1a2e'}
            roughness={0.2}
            metalness={0.8}
          />
        </RoundedBox>
        {/* Screen */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.82, 0.47]} />
          <meshStandardMaterial
            color={isHovered ? '#4a9eff' : '#1a3050'}
            emissive={isHovered ? '#4a9eff' : '#0a2040'}
            emissiveIntensity={isHovered ? 0.8 : 0.4}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        {/* Screen content lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[-0.2 + i * 0.08, 0.05 - i * 0.06, 0.03]}>
            <planeGeometry args={[0.25 - i * 0.03, 0.012]} />
            <meshStandardMaterial
              color="#4a9eff"
              emissive="#4a9eff"
              emissiveIntensity={0.3 + Math.sin(time * 2 + i) * 0.1}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
        {/* Webcam dot */}
        <mesh position={[0, 0.26, 0.03]}>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial
            color="#00ff44"
            emissive="#00ff44"
            emissiveIntensity={1}
          />
        </mesh>
      </group>
      {/* Monitor stand neck */}
      <mesh position={[0, 0.87, -0.25]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Monitor stand base */}
      <mesh position={[0, 0.78, -0.25]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.2]} />
        <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Second monitor - angled */}
      <group position={[-0.7, 1.05, -0.35]} rotation={[0, 0.3, 0]}>
        <RoundedBox args={[0.6, 0.4, 0.03]} radius={0.01} castShadow>
          <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.8} />
        </RoundedBox>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[0.52, 0.32]} />
          <meshStandardMaterial
            color="#0a2040"
            emissive="#0a2040"
            emissiveIntensity={0.3}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Office Chair ─── */
function OfficeChair() {
  return (
    <group position={[0, 0, -0.3]}>
      {/* Seat */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.45]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.85, -0.2]} castShadow>
        <boxGeometry args={[0.48, 0.6, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Armrests */}
      {[[-0.28, 0.6, 0], [0.28, 0.6, 0]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.04, 0.04, 0.35]} />
          <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {/* Center post */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
        <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Base star */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.sin(angle) * 0.2, 0.12, Math.cos(angle) * 0.2]}
            rotation={[0, -angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.25, 0.03, 0.03]} />
            <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
          </mesh>
        );
      })}
      {/* Wheels */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={`w${i}`}
            position={[Math.sin(angle) * 0.35, 0.05, Math.cos(angle) * 0.35]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#222222" roughness={0.2} metalness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Bookshelf ─── */
function Bookshelf({ position = [-3.5, 0, -1] }) {
  const woodColor = '#3a2a1a';
  const bookColors = ['#8b0000', '#00008b', '#006400', '#8b6800', '#4a0080', '#008080'];

  return (
    <group position={position}>
      {/* Shelf frame - sides */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.8, 2.4, 0.35]} />
        <meshStandardMaterial color={woodColor} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Shelves */}
      {[0.15, 0.75, 1.35, 1.95].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <boxGeometry args={[0.76, 0.04, 0.33]} />
          <meshStandardMaterial color={woodColor} roughness={0.7} metalness={0.1} />
        </mesh>
      ))}
      {/* Books on each shelf */}
      {[0.35, 0.95, 1.55].map((shelfY, si) => (
        <group key={si} position={[0, shelfY, 0.02]}>
          {Array.from({ length: 5 + si }).map((_, bi) => {
            const bookH = 0.25 + Math.random() * 0.1;
            const bookW = 0.04 + Math.random() * 0.03;
            const startX = -0.3 + bi * 0.1;
            return (
              <mesh
                key={bi}
                position={[startX, bookH / 2, 0]}
                castShadow
              >
                <boxGeometry args={[bookW, bookH, 0.2]} />
                <meshStandardMaterial
                  color={bookColors[(si + bi) % bookColors.length]}
                  roughness={0.8}
                  metalness={0.05}
                />
              </mesh>
            );
          })}
        </group>
      ))}
      {/* Decorative items on top shelf */}
      <mesh position={[0, 2.15, 0.05]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#c0a060" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

/* ─── Certificate Frames on Wall ─── */
function CertFrames({ onClick, isHovered, onHover = () => {} }) {
  const certs = [
    { label: 'AWS Solutions Architect', pos: [-1.2, 2.2, -2.94] },
    { label: 'NVIDIA AI Inference', pos: [0, 2.2, -2.94] },
    { label: 'Kubernetes Admin', pos: [1.2, 2.2, -2.94] },
    { label: 'Azure DevOps', pos: [-0.6, 1.5, -2.94] },
    { label: 'MLOps Engineer', pos: [0.6, 1.5, -2.94] },
  ];

  return (
    <group>
      {certs.map((cert, i) => (
        <group key={i} position={cert.pos}>
          {/* Frame */}
          <RoundedBox
            args={[0.55, 0.4, 0.03]}
            radius={0.01}
            castShadow
            onClick={onClick}
            onPointerOver={() => onHover(true)}
            onPointerOut={() => onHover(false)}
          >
            <meshStandardMaterial
              color={isHovered ? '#3a3a5a' : '#2a2a3a'}
              roughness={0.4}
              metalness={0.5}
            />
          </RoundedBox>
          {/* Frame border */}
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.5, 0.35]} />
            <meshStandardMaterial
              color="#1a1a2e"
              emissive={isHovered ? '#4a9eff' : '#0a0a1e'}
              emissiveIntensity={isHovered ? 0.4 : 0.1}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
          {/* Certificate text */}
          <Text
            position={[0, 0.02, 0.03]}
            fontSize={0.04}
            color={isHovered ? '#4a9eff' : '#8888aa'}
            anchorX="center"
            anchorY="middle"
          >
            {cert.label}
          </Text>
          {/* Gold seal */}
          <mesh position={[0.15, -0.08, 0.03]}>
            <circleGeometry args={[0.04, 16]} />
            <meshStandardMaterial
              color="#c0a060"
              emissive="#c0a060"
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        </group>
      ))}
      {/* Section label */}
      <Text
        position={[0, 2.65, -2.93]}
        fontSize={0.08}
        color="#4a9eff"
        anchorX="center"
        anchorY="bottom"
      >
        CERTIFICATIONS
      </Text>
    </group>
  );
}

/* ─── Office Plant ─── */
function OfficePlant({ position = [3.2, 0, -2] }) {
  const leafRef = useRef();

  useFrame((state) => {
    if (leafRef.current) {
      leafRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.35, 16]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.03, 16]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      <group ref={leafRef} position={[0, 0.6, 0]}>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const height = 0.3 + Math.random() * 0.3;
          return (
            <mesh
              key={i}
              position={[Math.sin(angle) * 0.08, height / 2, Math.cos(angle) * 0.08]}
              rotation={[Math.sin(angle) * 0.3, 0, Math.cos(angle) * 0.3]}
              castShadow
            >
              <boxGeometry args={[0.06, height, 0.02]} />
              <meshStandardMaterial color="#2d5a1e" roughness={0.8} metalness={0.05} />
            </mesh>
          );
        })}
        {/* Top cluster */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#2d5a1e" roughness={0.8} metalness={0.05} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── AI Assistant Hologram ─── */
function AIAssistant({ onClick, isHovered, onHover = () => {} }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.position.y = 1.2 + Math.sin(t * 1.2) * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.8;
      ring1Ref.current.rotation.z = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.6;
      ring2Ref.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group position={[2.5, 0, -0.5]}>
      {/* Hologram base pedestal */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.6, 16]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Base glow ring */}
      <mesh position={[0, 0.61, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshStandardMaterial
          color="#4a9eff"
          emissive="#4a9eff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Core sphere */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh
          ref={coreRef}
          position={[0, 1.2, 0]}
          onClick={onClick}
          onPointerOver={() => onHover(true)}
          onPointerOut={() => onHover(false)}
        >
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            color={isHovered ? '#00ff88' : '#4a9eff'}
            emissive={isHovered ? '#00ff88' : '#4a9eff'}
            emissiveIntensity={isHovered ? 1.5 : 0.8}
            transparent
            opacity={0.9}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
      </Float>
      {/* Orbiting rings */}
      <mesh ref={ring1Ref} position={[0, 1.2, 0]}>
        <torusGeometry args={[0.3, 0.008, 16, 64]} />
        <meshStandardMaterial
          color="#4a9eff"
          emissive="#4a9eff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 1.2, 0]}>
        <torusGeometry args={[0.38, 0.006, 16, 64]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.4}
          transparent
          opacity={0.35}
        />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 0.55, 0.2]}
        fontSize={0.06}
        color={isHovered ? '#00ff88' : '#4a9eff'}
        anchorX="center"
        anchorY="top"
      >
        AI ASSISTANT
      </Text>
    </group>
  );
}

/* ─── Ceiling Light ─── */
function CeilingLight() {
  return (
    <group position={[0, 3.15, -0.5]}>
      {/* Light fixture */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.35, 0.08, 16]} />
        <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Light panel */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.02, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

/* ─── Side Table with Lamp ─── */
function SideTable({ position = [3.2, 0, 0.5] }) {
  const lampShadeRef = useRef();

  useFrame((state) => {
    if (lampShadeRef.current) {
      lampShadeRef.current.material.emissiveIntensity =
        0.5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Table */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 16]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.44, 8]} />
        <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
        <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Lamp */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.05, 16]} />
        <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
        <meshStandardMaterial color="#333344" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Lamp shade */}
      <mesh ref={lampShadeRef} position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.14, 0.15, 16, 1, true]} />
        <meshStandardMaterial
          color="#f5e6c8"
          emissive="#f5e6c8"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

/* ─── Rug ─── */
function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      <circleGeometry args={[1.5, 32]} />
      <meshStandardMaterial
        color="#2a1a2a"
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}

/* ─── Camera Controller ─── */
function CameraController({ target, enabled }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(3, 2.5, 4));
  const targetLook = useRef(new THREE.Vector3(0, 1, -1));

  useFrame(() => {
    if (!enabled) return;
    const pos =
      target === 'default' ? [3, 2.5, 4] :
      target === 'desk' ? [0.5, 1.4, -0.3] :
      target === 'wall' ? [0, 1.8, -1.5] :
      target === 'ai' ? [2, 1.5, 0.5] :
      [3, 2.5, 4];
    const look =
      target === 'default' ? [0, 1, -1] :
      target === 'desk' ? [0, 1, -1.5] :
      target === 'wall' ? [0, 1.8, -3] :
      target === 'ai' ? [2.5, 1, -0.5] :
      [0, 1, -1];

    targetPos.current.lerp(new THREE.Vector3(...pos), 0.03);
    targetLook.current.lerp(new THREE.Vector3(...look), 0.03);
    camera.position.copy(targetPos.current);
    camera.lookAt(targetLook.current);
  });

  return null;
}

/* ─── Main Office Scene ─── */
function OfficeScene({ onDeskClick, onWallClick, onAIClick }) {
  const [hoveredDesk, setHoveredDesk] = useState(false);
  const [hoveredWall, setHoveredWall] = useState(false);
  const [hoveredAI, setHoveredAI] = useState(false);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[2, 5, 3]}
        intensity={0.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Main overhead light */}
      <pointLight position={[0, 2.8, -0.5]} intensity={0.8} color="#ffffff" />
      {/* Desk area task light */}
      <pointLight position={[0, 2, -1.5]} intensity={0.3} color="#4a9eff" />
      {/* Lamp warm light */}
      <pointLight position={[3.2, 1.2, 0.5]} intensity={0.3} color="#f5e6c8" />
      {/* Window ambient */}
      <pointLight position={[0, 1.8, -2.5]} intensity={0.2} color="#88aacc" />
      {/* AI glow */}
      <pointLight position={[2.5, 1.5, -0.5]} intensity={0.2} color="#4a9eff" />

      {/* Room structure */}
      <OfficeRoom />

      {/* Window */}
      <CityWindow />

      {/* Furniture */}
      <OfficeDesk
        onClick={onDeskClick}
        isHovered={hoveredDesk}
        onHover={setHoveredDesk}
      />
      <Monitor
        onClick={onDeskClick}
        isHovered={hoveredDesk}
        onHover={setHoveredDesk}
      />
      <OfficeChair />
      <Bookshelf />
      <SideTable />
      <OfficePlant />
      <Rug />
      <CeilingLight />

      {/* Wall items */}
      <CertFrames
        onClick={onWallClick}
        isHovered={hoveredWall}
        onHover={setHoveredWall}
      />

      {/* AI Assistant */}
      <AIAssistant
        onClick={onAIClick}
        isHovered={hoveredAI}
        onHover={setHoveredAI}
      />

      {/* Environment for reflections */}
      <Environment preset="city" />
    </>
  );
}

/* ─── Overlay Panel ─── */
function OverlayPanel({ type, data, onClose }) {
  if (!type) return null;

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          className="office-overlay-panel"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={panelVariants}
        >
          <button className="office-overlay-close" onClick={onClose}>✕</button>
          {type === 'resume' && (
            <div className="office-overlay-content">
              <h2>📋 Resume</h2>
              {data?.work && data.work.map((job, i) => (
                <div key={i} className="office-resume-item">
                  <h3>{job.company}</h3>
                  <p className="office-resume-role">{job.role}</p>
                  <p className="office-resume-desc">{job.description}</p>
                </div>
              ))}
            </div>
          )}
          {type === 'certs' && (
            <div className="office-overlay-content">
              <h2>🏆 Certifications</h2>
              {data?.certs && data.certs.map((cert, i) => (
                <div key={i} className="office-cert-item">
                  <h3>{cert.name}</h3>
                  <p>{cert.issuer}</p>
                  <span className="office-cert-date">{cert.date}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Exported Component ─── */
export default function Office3D({ resumeData }) {
  const [cameraTarget, setCameraTarget] = useState('default');
  const [overlayType, setOverlayType] = useState(null);
  const [isEntered, setIsEntered] = useState(false);

  const handleDeskClick = () => {
    setCameraTarget('desk');
    setOverlayType('resume');
  };
  const handleWallClick = () => {
    setCameraTarget('wall');
    setOverlayType('certs');
  };
  const handleAIClick = () => {
    setCameraTarget('ai');
    const event = new CustomEvent('openAIChat');
    window.dispatchEvent(event);
  };
  const handleClose = () => {
    setOverlayType(null);
    setCameraTarget('default');
  };

  return (
    <section className="office-3d-section" id="office">
      <div className="office-3d-header">
        <h2>🏢 My Digital Office</h2>
        <p>Step inside and explore — click the desk for my resume, the wall for certifications, or the AI assistant to chat</p>
      </div>

      {!isEntered ? (
        <div className="office-entrance">
          <div className="office-entrance-content">
            <div className="office-entrance-icon">🏢</div>
            <h2>Welcome to My Virtual Office</h2>
            <p>Come on in — make yourself at home</p>
            <motion.button
              className="office-enter-btn"
              onClick={() => setIsEntered(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(74, 158, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              🚪 Enter Office
            </motion.button>
          </div>
        </div>
      ) : (
        <>
          <div className="office-3d-canvas-wrapper">
            <Canvas shadows dpr={[1, 2]} style={{ width: '100%', height: '500px' }}>
              <PerspectiveCamera makeDefault position={[3, 2.5, 4]} fov={55} />
              <CameraController target={cameraTarget} enabled={true} />
              <OfficeScene
                onDeskClick={handleDeskClick}
                onWallClick={handleWallClick}
                onAIClick={handleAIClick}
              />
            </Canvas>
          </div>
          <div className="office-nav-buttons">
            <motion.button
              className="office-nav-btn"
              onClick={() => { setCameraTarget('desk'); setOverlayType('resume'); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📋 Resume
            </motion.button>
            <motion.button
              className="office-nav-btn"
              onClick={() => { setCameraTarget('wall'); setOverlayType('certs'); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🏆 Certifications
            </motion.button>
            <motion.button
              className="office-nav-btn"
              onClick={handleAIClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🤖 AI Chat
            </motion.button>
            <motion.button
              className="office-nav-btn office-nav-btn-reset"
              onClick={() => { setCameraTarget('default'); setOverlayType(null); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Reset View
            </motion.button>
          </div>
          <OverlayPanel type={overlayType} data={resumeData} onClose={handleClose} />
        </>
      )}
    </section>
  );
}
