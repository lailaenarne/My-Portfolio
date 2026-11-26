import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  Box,
  ChevronDown,
  ChevronUp,
  Layers,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { PageId } from './Header';

interface Interactive3DStudioProps {
  onNavigate?: (pageId: PageId) => void;
}

type CameraPresetId = 'showcase' | 'closeup' | 'top';

interface CameraPreset {
  id: CameraPresetId;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: 'showcase',
    label: 'Showcase',
    position: [4.8, 3.1, 5.4],
    target: [0, 1.05, 0],
  },
  {
    id: 'closeup',
    label: 'Workstation',
    position: [1.9, 1.85, 3.15],
    target: [0, 0.85, -0.05],
  },
  {
    id: 'top',
    label: 'Top Orbit',
    position: [0.3, 6.2, 2.4],
    target: [0, 0.9, 0],
  },
];

// Reusable math helpers outside animation loop (Zero GC)
const _dummyObj = new THREE.Object3D();
const _targetCamPos = new THREE.Vector3();
const _targetCtrl = new THREE.Vector3();

function createLaptopScreenTexture(isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Screen background
    const grad = ctx.createLinearGradient(0, 0, 768, 480);
    if (isDark) {
      grad.addColorStop(0, '#181116');
      grad.addColorStop(1, '#1A1F33');
    } else {
      grad.addColorStop(0, '#1F1722');
      grad.addColorStop(1, '#232B47');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 768, 480);

    // Top window chrome bar
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(0, 0, 768, 42);
    const dotColors = ['#F2A7C0', '#D5A6E6', '#7ED3C6'];
    dotColors.forEach((col, i) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(28 + i * 20, 21, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = '#E7D4DB';
    ctx.font = '600 16px monospace';
    ctx.fillText('laila-enarne.portfolio — 3D Studio', 110, 27);

    // Left editor panel: LME header & syntax lines
    ctx.fillStyle = 'rgba(242, 167, 192, 0.14)';
    ctx.fillRect(28, 66, 360, 384);
    ctx.strokeStyle = 'rgba(242, 167, 192, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 66, 360, 384);

    ctx.fillStyle = '#F2A7C0';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText('LME  </>', 52, 122);

    ctx.fillStyle = '#8FA4E8';
    ctx.font = '500 15px monospace';
    ctx.fillText('const portfolio = {', 52, 170);

    const codeLines: { text: string; color: string }[] = [
      { text: '  owner: "Laila Mariel Enarne",', color: '#F8EFF2' },
      { text: '  campus: "WVSU Lambunao",', color: '#7ED3C6' },
      { text: '  projects: 8, // Live Netlify', color: '#D5A6E6' },
      { text: '  capstone: "FaithPoint",', color: '#F2A7C0' },
      { text: '  stack: ["HTML", "CSS", "TS"]', color: '#8FA4E8' },
    ];
    codeLines.forEach((line, idx) => {
      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 52, 206 + idx * 34);
    });
    ctx.fillStyle = '#8FA4E8';
    ctx.fillText('};', 52, 380);

    // Right preview panel: mini 3D bar chart readout
    ctx.fillStyle = 'rgba(143, 164, 232, 0.12)';
    ctx.fillRect(410, 66, 330, 384);
    ctx.strokeStyle = 'rgba(143, 164, 232, 0.35)';
    ctx.strokeRect(410, 66, 330, 384);

    ctx.fillStyle = '#F8EFF2';
    ctx.font = '600 18px sans-serif';
    ctx.fillText('Stack Distribution', 436, 108);

    const bars = [
      { label: 'Netlify', h: 210, color: '#F2A7C0' },
      { label: 'HTML5', h: 185, color: '#8FA4E8' },
      { label: 'CSS3', h: 140, color: '#7ED3C6' },
      { label: 'JS/TS', h: 130, color: '#D5A6E6' },
    ];
    bars.forEach((b, i) => {
      const bx = 446 + i * 68;
      const by = 385 - b.h;
      ctx.fillStyle = b.color;
      ctx.fillRect(bx, by, 42, b.h);
      ctx.fillStyle = '#D5C2C9';
      ctx.font = '500 12px monospace';
      ctx.fillText(b.label, bx - 4, 412);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 124);
    grad.addColorStop(0, 'rgba(31, 23, 26, 0.45)');
    grad.addColorStop(0.55, 'rgba(61, 78, 129, 0.18)');
    grad.addColorStop(1, 'rgba(31, 23, 26, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function Interactive3DStudio({ onNavigate }: Interactive3DStudioProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<CameraPresetId>('showcase');
  const [explodePercent, setExplodePercent] = useState<number>(15);
  const [autoSpin, setAutoSpin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });
  const [controlsCollapsed, setControlsCollapsed] = useState<boolean>(false);
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);

  // Mutable refs so React state updates never recreate the WebGL context
  const explodeTargetRef = useRef<number>(0.15);
  const autoSpinRef = useRef<boolean>(autoSpin);
  const presetTargetRef = useRef<CameraPreset | null>(null);
  const triggerRenderRef = useRef<() => void>(() => {});

  useEffect(() => {
    explodeTargetRef.current = explodePercent / 100;
  }, [explodePercent]);

  useEffect(() => {
    autoSpinRef.current = autoSpin;
  }, [autoSpin]);

  const handleSelectPreset = (preset: CameraPreset) => {
    setActivePreset(preset.id);
    presetTargetRef.current = preset;
    triggerRenderRef.current();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per threejs/SKILL.md
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const isInitiallyDark = document.documentElement.classList.contains('dark');
    const lightBg = new THREE.Color('#F9EEF2');
    const darkBg = new THREE.Color('#161014');
    scene.background = (isInitiallyDark ? darkBg : lightBg).clone();
    scene.fog = new THREE.FogExp2(
      isInitiallyDark ? 0x161014 : 0xf9eef2,
      0.042
    );

    // Mandatory Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTex = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTex;
    roomEnv.dispose();
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    camera.position.set(...CAMERA_PRESETS[0].position);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS[0].target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 2.8;
    controls.maxDistance = 10.5;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minPolarAngle = 0.25;

    // Cancel camera preset animation if user manually interacts
    const onControlStart = () => {
      presetTargetRef.current = null;
    };
    controls.addEventListener('start', onControlStart);

    // 3-Point Warm/Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xfde8ef, 0x3d4e81, 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4f8, 2.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 24;
    const shadowBounds = 4.5;
    keyLight.shadow.camera.left = -shadowBounds;
    keyLight.shadow.camera.right = shadowBounds;
    keyLight.shadow.camera.top = shadowBounds;
    keyLight.shadow.camera.bottom = -shadowBounds;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8fa4e8, 1.0);
    fillLight.position.set(-5, 3, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x7ed3c6, 1.15);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    // Ground Stage + Contact Shadow Plane
    const disposables: { dispose: () => void }[] = [envTex];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    const floorGeo = track(new THREE.CircleGeometry(14, 64));
    const floorMat = track(
      new THREE.MeshStandardMaterial({
        color: isInitiallyDark ? 0x1c1419 : 0xf4e3e9,
        roughness: 0.9,
        metalness: 0.05,
      })
    );
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const shadowTex = track(createContactShadowTexture());
    const contactShadowGeo = track(new THREE.PlaneGeometry(5.6, 5.6));
    const contactShadowMat = track(
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
      })
    );
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.015;
    scene.add(contactShadow);

    // Subtle concentric studio floor grid ring
    const floorRingGeo = track(new THREE.RingGeometry(2.55, 2.6, 64));
    const floorRingMat = track(
      new THREE.MeshBasicMaterial({
        color: 0xbe4b72,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      })
    );
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = 0.025;
    scene.add(floorRing);

    // Hero Composite Assembly Group (Grounded at y = 0)
    const studioRoot = new THREE.Group();
    scene.add(studioRoot);

    // 1. Sculpted Lathe Pedestal Base
    const lathePoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.85, 0),
      new THREE.Vector2(1.92, 0.09),
      new THREE.Vector2(1.74, 0.24),
      new THREE.Vector2(1.52, 0.26),
      new THREE.Vector2(1.48, 0.36),
      new THREE.Vector2(0, 0.36),
    ];
    const pedestalGeo = track(new THREE.LatheGeometry(lathePoints, 32));
    const pedestalMat = track(
      new THREE.MeshStandardMaterial({
        color: isInitiallyDark ? 0x291e24 : 0xfff7fa,
        roughness: 0.42,
        metalness: 0.14,
      })
    );
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    studioRoot.add(pedestal);

    const trimRingGeo = track(new THREE.TorusGeometry(1.74, 0.032, 16, 64));
    const roseMetalMat = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xbe4b72,
        metalness: 0.9,
        roughness: 0.18,
        clearcoat: 0.7,
      })
    );
    const trimRing = new THREE.Mesh(trimRingGeo, roseMetalMat);
    trimRing.rotation.x = Math.PI / 2;
    trimRing.position.y = 0.24;
    trimRing.castShadow = true;
    studioRoot.add(trimRing);

    // 2. Composite 3D Laptop Workstation Group
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 0.38, 0.12);
    studioRoot.add(laptopGroup);

    const bodyShape = new THREE.Shape();
    const bw = 2.04;
    const bd = 1.38;
    const br = 0.12;
    bodyShape.moveTo(-bw / 2 + br, -bd / 2);
    bodyShape.lineTo(bw / 2 - br, -bd / 2);
    bodyShape.quadraticCurveTo(bw / 2, -bd / 2, bw / 2, -bd / 2 + br);
    bodyShape.lineTo(bw / 2, bd / 2 - br);
    bodyShape.quadraticCurveTo(bw / 2, bd / 2, bw / 2 - br, bd / 2);
    bodyShape.lineTo(-bw / 2 + br, bd / 2);
    bodyShape.quadraticCurveTo(-bw / 2, bd / 2, -bw / 2, bd / 2 - br);
    bodyShape.lineTo(-bw / 2, -bd / 2 + br);
    bodyShape.quadraticCurveTo(-bw / 2, -bd / 2, -bw / 2 + br, -bd / 2);

    const deckGeo = track(
      new THREE.ExtrudeGeometry(bodyShape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
      })
    );
    deckGeo.rotateX(Math.PI / 2);
    const silverMetalMat = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xd8dce8,
        metalness: 0.88,
        roughness: 0.2,
        clearcoat: 0.3,
      })
    );
    const laptopDeck = new THREE.Mesh(deckGeo, silverMetalMat);
    laptopDeck.position.y = 0.1;
    laptopDeck.castShadow = true;
    laptopDeck.receiveShadow = true;
    laptopGroup.add(laptopDeck);

    // Trackpad inlay
    const trackpadGeo = track(new THREE.BoxGeometry(0.62, 0.015, 0.38));
    const indigoMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x3d4e81,
        metalness: 0.45,
        roughness: 0.35,
      })
    );
    const trackpad = new THREE.Mesh(trackpadGeo, indigoMat);
    trackpad.position.set(0, 0.116, 0.38);
    laptopGroup.add(trackpad);

    // Instanced Keyboard Matrix (4 rows x 12 cols = 48 keys)
    const keyGeo = track(new THREE.BoxGeometry(0.11, 0.024, 0.11));
    const keyMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x261d22,
        roughness: 0.55,
        metalness: 0.15,
      })
    );
    const keyInstanced = new THREE.InstancedMesh(keyGeo, keyMat, 48);
    let keyIdx = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 12; c++) {
        _dummyObj.position.set(
          -0.77 + c * 0.14,
          0.124,
          -0.42 + r * 0.15
        );
        _dummyObj.rotation.set(0, 0, 0);
        _dummyObj.scale.set(1, 1, 1);
        _dummyObj.updateMatrix();
        keyInstanced.setMatrixAt(keyIdx++, _dummyObj.matrix);
      }
    }
    keyInstanced.instanceMatrix.needsUpdate = true;
    keyInstanced.computeBoundingSphere();
    laptopGroup.add(keyInstanced);

    // Hinged Laptop Screen Lid Group
    const screenHinge = new THREE.Group();
    screenHinge.position.set(0, 0.11, -0.66);
    screenHinge.rotation.x = -0.34;
    laptopGroup.add(screenHinge);

    const lidGeo = track(
      new THREE.ExtrudeGeometry(bodyShape, {
        depth: 0.045,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.015,
        bevelSegments: 2,
      })
    );
    const lidMesh = new THREE.Mesh(lidGeo, silverMetalMat);
    lidMesh.position.set(0, bd / 2 + 0.04, 0);
    lidMesh.castShadow = true;
    screenHinge.add(lidMesh);

    const screenTex = track(createLaptopScreenTexture(isInitiallyDark));
    const screenMat = track(
      new THREE.MeshStandardMaterial({
        map: screenTex,
        emissiveMap: screenTex,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.45,
        roughness: 0.18,
        metalness: 0.05,
      })
    );
    const screenPlaneGeo = track(new THREE.PlaneGeometry(1.88, 1.18));
    const screenMesh = new THREE.Mesh(screenPlaneGeo, screenMat);
    screenMesh.position.set(0, bd / 2 + 0.04, 0.064);
    screenHinge.add(screenMesh);

    // 3. Levitating Architectural Crystal Core & Multi-Tone Orbital System
    const orbitalCoreGroup = new THREE.Group();
    orbitalCoreGroup.position.set(0, 2.2, -0.05);
    studioRoot.add(orbitalCoreGroup);

    const coreGeo = track(new THREE.OctahedronGeometry(0.38, 1));
    const crystalMat = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xf2a7c0,
        metalness: 0.08,
        roughness: 0.08,
        clearcoat: 1.0,
        ior: 1.65,
        transmission: isSoftwareGl ? 0 : 0.72,
        thickness: 0.9,
        attenuationColor: new THREE.Color(0xbe4b72),
        attenuationDistance: 1.1,
        transparent: true,
        opacity: isSoftwareGl ? 0.78 : 1.0,
      })
    );
    const crystalCore = new THREE.Mesh(coreGeo, crystalMat);
    crystalCore.castShadow = true;
    orbitalCoreGroup.add(crystalCore);

    const innerGemGeo = track(new THREE.OctahedronGeometry(0.18, 0));
    const innerGemMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x7ed3c6,
        emissive: 0x2f7a70,
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.7,
      })
    );
    const innerGem = new THREE.Mesh(innerGemGeo, innerGemMat);
    orbitalCoreGroup.add(innerGem);

    // 3 Inclined Metallic Orbital Rings
    const ringConfigs = [
      { radius: 0.85, color: 0xbe4b72, tiltX: 0.9, tiltZ: 0.3 },
      { radius: 1.12, color: 0x3d4e81, tiltX: -0.7, tiltZ: 0.65 },
      { radius: 1.38, color: 0x2f7a70, tiltX: 0.35, tiltZ: -0.9 },
    ];
    const orbitalRings: THREE.Mesh[] = [];
    ringConfigs.forEach((cfg) => {
      const rGeo = track(new THREE.TorusGeometry(cfg.radius, 0.022, 14, 72));
      const rMat = track(
        new THREE.MeshStandardMaterial({
          color: cfg.color,
          metalness: 0.88,
          roughness: 0.22,
        })
      );
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.rotation.set(cfg.tiltX, 0, cfg.tiltZ);
      rMesh.castShadow = true;
      orbitalRings.push(rMesh);
      orbitalCoreGroup.add(rMesh);
    });

    // 4 Composite Orbiting Tech Satellites
    const satelliteColors = [0xbe4b72, 0x3d4e81, 0x7a4988, 0x2f7a70];
    const satellites: THREE.Group[] = [];
    const satFrameGeo = track(new THREE.BoxGeometry(0.24, 0.24, 0.24));
    const satJewelGeo = track(new THREE.OctahedronGeometry(0.11, 0));
    satelliteColors.forEach((hex, idx) => {
      const satGroup = new THREE.Group();
      const frameMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xf8eff2,
          metalness: 0.75,
          roughness: 0.25,
        })
      );
      const jewelMat = track(
        new THREE.MeshStandardMaterial({
          color: hex,
          emissive: hex,
          emissiveIntensity: 0.35,
          metalness: 0.4,
          roughness: 0.2,
        })
      );
      const frame = new THREE.Mesh(satFrameGeo, frameMat);
      frame.castShadow = true;
      const jewel = new THREE.Mesh(satJewelGeo, jewelMat);
      jewel.position.y = 0.19;
      satGroup.add(frame, jewel);
      satGroup.userData.phase = (idx * Math.PI) / 2;
      satellites.push(satGroup);
      orbitalCoreGroup.add(satGroup);
    });

    // 4. Instanced Floating Pastel Facet Constellation
    const sparkCount = 42;
    const sparkGeo = track(new THREE.OctahedronGeometry(0.055, 0));
    const sparkMat = track(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.25,
        metalness: 0.6,
      })
    );
    const sparkInstanced = new THREE.InstancedMesh(
      sparkGeo,
      sparkMat,
      sparkCount
    );
    sparkInstanced.frustumCulled = false;
    const sparkPalette = [
      new THREE.Color(0xf2a7c0),
      new THREE.Color(0x8fa4e8),
      new THREE.Color(0xd5a6e6),
      new THREE.Color(0x7ed3c6),
    ];
    const sparkSeeds = Array.from({ length: sparkCount }, (_, i) => {
      const angle = (i / sparkCount) * Math.PI * 2 + (i % 3) * 0.4;
      const radius = 2.1 + (i % 5) * 0.42;
      const heightBase = 0.5 + ((i * 0.37) % 2.9);
      const speed = 0.25 + (i % 4) * 0.08;
      sparkInstanced.setColorAt(i, sparkPalette[i % sparkPalette.length]);
      return { angle, radius, heightBase, speed, scale: 0.75 + (i % 4) * 0.16 };
    });
    if (sparkInstanced.instanceColor) {
      sparkInstanced.instanceColor.needsUpdate = true;
    }
    sparkInstanced.computeBoundingSphere();
    studioRoot.add(sparkInstanced);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Watch .dark class changes dynamically
    const syncSceneTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      const targetBg = dark ? darkBg : lightBg;
      scene.background = targetBg.clone();
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.copy(targetBg);
      }
      floorMat.color.setHex(dark ? 0x1c1419 : 0xf4e3e9);
      pedestalMat.color.setHex(dark ? 0x291e24 : 0xfff7fa);
      floorRingMat.color.setHex(dark ? 0xf2a7c0 : 0xbe4b72);
    };

    const themeObserver = new MutationObserver(syncSceneTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Resize Observer for responsive canvas container
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = Math.max(mountRef.current.clientWidth, 300);
      const h = Math.max(mountRef.current.clientHeight, 300);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Paced Animation & Software-WebGL Safe Loop
    let disposed = false;
    let frameId = 0;
    let currentExplode = explodeTargetRef.current;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl.fenceSync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      // Smooth damped exploded-layer separation
      currentExplode = THREE.MathUtils.damp(
        currentExplode,
        explodeTargetRef.current,
        6,
        delta
      );

      laptopGroup.position.y = 0.38 + currentExplode * 0.28;
      screenHinge.position.y = 0.11 + currentExplode * 0.18;
      orbitalCoreGroup.position.y =
        2.15 + currentExplode * 0.72 + Math.sin(elapsed * 1.6) * 0.05;

      orbitalRings.forEach((ring, idx) => {
        const ringScale = 1 + currentExplode * (0.22 + idx * 0.12);
        ring.scale.setScalar(ringScale);
        ring.rotation.y += delta * (0.35 + idx * 0.14);
      });

      crystalCore.rotation.y += delta * 0.55;
      crystalCore.rotation.x = Math.sin(elapsed * 0.8) * 0.18;
      innerGem.rotation.y -= delta * 0.9;

      satellites.forEach((sat, idx) => {
        const angle = elapsed * 0.65 + (sat.userData.phase as number);
        const orbitR = 1.65 + currentExplode * 0.45;
        sat.position.set(
          Math.cos(angle) * orbitR,
          Math.sin(elapsed * 1.4 + idx) * 0.24,
          Math.sin(angle) * orbitR
        );
        sat.rotation.y = -angle;
      });

      // Animate floating constellation facets
      for (let i = 0; i < sparkCount; i++) {
        const s = sparkSeeds[i];
        const a = s.angle + elapsed * 0.12 * s.speed;
        const r = s.radius + currentExplode * 0.4;
        _dummyObj.position.set(
          Math.cos(a) * r,
          s.heightBase + Math.sin(elapsed * s.speed + i) * 0.16,
          Math.sin(a) * r
        );
        _dummyObj.rotation.set(elapsed * 0.6 + i, elapsed * 0.4, 0);
        _dummyObj.scale.setScalar(s.scale);
        _dummyObj.updateMatrix();
        sparkInstanced.setMatrixAt(i, _dummyObj.matrix);
      }
      sparkInstanced.instanceMatrix.needsUpdate = true;

      if (autoSpinRef.current && !presetTargetRef.current) {
        studioRoot.rotation.y += delta * 0.22;
      }

      // Smooth damped camera preset transitions
      const activeTarget = presetTargetRef.current;
      if (activeTarget) {
        _targetCamPos.set(...activeTarget.position);
        _targetCtrl.set(...activeTarget.target);
        camera.position.x = THREE.MathUtils.damp(
          camera.position.x,
          _targetCamPos.x,
          5.5,
          delta
        );
        camera.position.y = THREE.MathUtils.damp(
          camera.position.y,
          _targetCamPos.y,
          5.5,
          delta
        );
        camera.position.z = THREE.MathUtils.damp(
          camera.position.z,
          _targetCamPos.z,
          5.5,
          delta
        );
        controls.target.x = THREE.MathUtils.damp(
          controls.target.x,
          _targetCtrl.x,
          5.5,
          delta
        );
        controls.target.y = THREE.MathUtils.damp(
          controls.target.y,
          _targetCtrl.y,
          5.5,
          delta
        );
        controls.target.z = THREE.MathUtils.damp(
          controls.target.z,
          _targetCtrl.z,
          5.5,
          delta
        );
        if (
          camera.position.distanceTo(_targetCamPos) < 0.03 &&
          controls.target.distanceTo(_targetCtrl) < 0.03
        ) {
          presetTargetRef.current = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    triggerRenderRef.current = () => {
      // Continuous loop picks up preset refs immediately
    };

    if (isSoftwareGl) {
      frameId = window.setTimeout(tick, 16);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.removeEventListener('start', onControlStart);
      controls.dispose();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      aria-labelledby="studio-3d-heading"
      className="relative rounded-2xl border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] bg-[#F9EEF2] dark:bg-[#161014] overflow-hidden shadow-[0_24px_60px_-28px_rgba(190,75,114,0.28)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)]"
    >
      {/* Top-Left Minimal Spec Overlay */}
      <div className="pointer-events-none absolute top-4 left-4 right-4 z-10 flex flex-wrap items-start justify-between gap-3">
        <div className="pointer-events-auto rounded-xl border border-[#E5C6D0] dark:border-[#3D2C35] bg-[#FDF7F8]/92 dark:bg-[#1D161A]/92 px-3.5 py-2.5 shadow-sm">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">
            <Box className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Interactive 3D Workspace</span>
          </p>
          <h2
            id="studio-3d-heading"
            className="font-display text-sm sm:text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]"
          >
            Architectural Tech Orbit &amp; Live Workstation
          </h2>
          <p className="text-[11px] text-[#665058] dark:text-[#B59EA7]">
            Drag to rotate · Scroll to zoom · Explode layers below
          </p>
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="pointer-events-auto hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#C7D3EA] dark:border-[#333D5C] bg-[#FDF7F8]/92 dark:bg-[#1D161A]/92 text-[#3D4E81] dark:text-[#8FA4E8] hover:border-[#BE4B72] dark:hover:border-[#F2A7C0] transition-colors shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Inspect 8 Projects</span>
          </button>
        )}
      </div>

      {/* Isolated 3D WebGL Viewport Container */}
      <div className="relative w-full h-[400px] sm:h-[460px] md:h-[500px]">
        {webglUnavailable ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
            <Box className="w-10 h-10 text-[#BE4B72] dark:text-[#F2A7C0] mb-3" />
            <p className="font-display text-base font-bold text-[#1F171A] dark:text-[#F8EFF2]">
              3D WebGL Workspace
            </p>
            <p className="text-xs text-[#665058] dark:text-[#B59EA7] mt-1 max-w-sm">
              WebGL hardware context is unavailable in this browser session.
            </p>
          </div>
        ) : (
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            aria-label="Interactive 3D developer workstation and orbiting technology rings"
          />
        )}
      </div>

      {/* Collapsible Unified Bottom Control Dock */}
      {!webglUnavailable && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[min(780px,94%)] flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setControlsCollapsed((prev) => !prev)}
            aria-expanded={!controlsCollapsed}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold rounded-lg border border-[#E5C6D0] dark:border-[#3D2C35] bg-[#FDF7F8]/95 dark:bg-[#1D161A]/95 text-[#4D3B42] dark:text-[#D5C2C9] hover:border-[#BE4B72] dark:hover:border-[#F2A7C0] transition-colors shadow-sm"
          >
            {controlsCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Show 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Hide Controls</span>
              </>
            )}
          </button>

          {!controlsCollapsed && (
            <div className="pointer-events-auto w-full rounded-2xl border border-[#E5C6D0] dark:border-[#3D2C35] bg-[#FDF7F8]/95 dark:bg-[#1D161A]/95 px-4 py-3 shadow-lg flex flex-wrap items-center justify-between gap-3">
              {/* Camera Presets */}
              <div
                role="group"
                aria-label="3D camera viewpoints"
                className="flex flex-wrap items-center gap-1.5"
              >
                {CAMERA_PRESETS.map((preset) => {
                  const active = activePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      aria-pressed={active}
                      className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#BE4B72] dark:bg-[#F2A7C0] text-white dark:text-[#140F12] border-transparent'
                          : 'bg-white dark:bg-[#140F12] text-[#4D3B42] dark:text-[#D5C2C9] border-[#EAD6DC] dark:border-[#33262D] hover:border-[#3D4E81] dark:hover:border-[#8FA4E8]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Layer Explode Slider */}
              <label className="flex items-center gap-2.5 text-xs font-medium text-[#4D3B42] dark:text-[#D5C2C9]">
                <span className="whitespace-nowrap">Explode</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={explodePercent}
                  onChange={(e) => setExplodePercent(Number(e.target.value))}
                  className="w-24 sm:w-28 accent-[#BE4B72] dark:accent-[#F2A7C0] cursor-pointer"
                />
                <span className="font-mono-code tabular-nums text-[11px] w-8 text-right text-[#3D4E81] dark:text-[#8FA4E8]">
                  {explodePercent}%
                </span>
              </label>

              {/* Spin & Reset Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setAutoSpin((prev) => !prev)}
                  aria-pressed={autoSpin}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[#EAD6DC] dark:border-[#33262D] bg-white dark:bg-[#140F12] text-[#2F7A70] dark:text-[#7ED3C6] hover:border-[#2F7A70] dark:hover:border-[#7ED3C6] transition-colors whitespace-nowrap shrink-0"
                >
                  {autoSpin ? (
                    <>
                      <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Spinning</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Orbit</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setExplodePercent(15);
                    handleSelectPreset(CAMERA_PRESETS[0]);
                  }}
                  aria-label="Reset 3D view"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#EAD6DC] dark:border-[#33262D] bg-white dark:bg-[#140F12] text-[#665058] dark:text-[#B59EA7] hover:text-[#1F171A] dark:hover:text-[#F8EFF2] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
