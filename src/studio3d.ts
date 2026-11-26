import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type CameraPresetId = 'showcase' | 'closeup' | 'top';

interface CameraPreset {
  id: CameraPresetId;
  position: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: Record<CameraPresetId, CameraPreset> = {
  showcase: {
    id: 'showcase',
    position: [4.8, 3.1, 5.4],
    target: [0, 1.05, 0],
  },
  closeup: {
    id: 'closeup',
    position: [1.9, 1.85, 3.15],
    target: [0, 0.85, -0.05],
  },
  top: {
    id: 'top',
    position: [0.3, 6.2, 2.4],
    target: [0, 0.9, 0],
  },
};

const _dummyObj = new THREE.Object3D();
const _targetCamPos = new THREE.Vector3();
const _targetCtrl = new THREE.Vector3();

function createLaptopScreenTexture(isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 768, 480);
    grad.addColorStop(0, isDark ? '#181116' : '#1F1722');
    grad.addColorStop(1, isDark ? '#1A1F33' : '#232B47');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 768, 480);

    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(0, 0, 768, 42);
    ['#F2A7C0', '#D5A6E6', '#7ED3C6'].forEach((col, i) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(28 + i * 20, 21, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = '#E7D4DB';
    ctx.font = '600 16px monospace';
    ctx.fillText('laila-enarne.portfolio — 3D Studio', 110, 27);

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

    const codeLines = [
      { text: '  owner: "Laila Mariel Enarne",', color: '#F8EFF2' },
      { text: '  campus: "WVSU Lambunao",', color: '#7ED3C6' },
      { text: '  projects: 8, // Live Netlify', color: '#D5A6E6' },
      { text: '  capstone: "FaithPoint",', color: '#F2A7C0' },
      { text: '  stack: ["HTML", "CSS", "JS"]', color: '#8FA4E8' },
    ];
    codeLines.forEach((line, idx) => {
      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 52, 206 + idx * 34);
    });
    ctx.fillStyle = '#8FA4E8';
    ctx.fillText('};', 52, 380);

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

export interface Studio3DController {
  setPreset: (presetId: CameraPresetId) => void;
  setExplode: (percent: number) => void;
  setAutoSpin: (enabled: boolean) => void;
  dispose: () => void;
}

export function initInteractive3DStudio(
  container: HTMLElement,
  fallbackEl: HTMLElement | null
): Studio3DController | null {
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
    container.classList.add('hidden');
    fallbackEl?.classList.remove('hidden');
    return null;
  }

  const width = Math.max(container.clientWidth, 320);
  const height = Math.max(container.clientHeight, 320);

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const isInitiallyDark = document.documentElement.classList.contains('dark');
  const lightBg = new THREE.Color('#F9EEF2');
  const darkBg = new THREE.Color('#161014');
  scene.background = (isInitiallyDark ? darkBg : lightBg).clone();
  scene.fog = new THREE.FogExp2(isInitiallyDark ? 0x161014 : 0xf9eef2, 0.042);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const roomEnv = new RoomEnvironment();
  const envTex = pmremGenerator.fromScene(roomEnv, 0.04).texture;
  scene.environment = envTex;
  roomEnv.dispose();
  pmremGenerator.dispose();

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
  camera.position.set(...CAMERA_PRESETS.showcase.position);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...CAMERA_PRESETS.showcase.target);
  controls.enableDamping = !isSoftwareGl;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 2.8;
  controls.maxDistance = 10.5;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minPolarAngle = 0.25;

  let presetTarget: CameraPreset | null = null;
  let explodeTarget = 0.15;
  let autoSpin = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onControlStart = () => {
    presetTarget = null;
  };
  controls.addEventListener('start', onControlStart);

  scene.add(new THREE.HemisphereLight(0xfde8ef, 0x3d4e81, 0.95));

  const keyLight = new THREE.DirectionalLight(0xfff4f8, 2.2);
  keyLight.position.set(5, 8, 5);
  keyLight.castShadow = !isSoftwareGl;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 24;
  keyLight.shadow.camera.left = -4.5;
  keyLight.shadow.camera.right = 4.5;
  keyLight.shadow.camera.top = 4.5;
  keyLight.shadow.camera.bottom = -4.5;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.normalBias = 0.02;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x8fa4e8, 1.0);
  fillLight.position.set(-5, 3, 3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x7ed3c6, 1.15);
  rimLight.position.set(0, 4, -5);
  scene.add(rimLight);

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
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  const shadowTex = track(createContactShadowTexture());
  const contactShadow = new THREE.Mesh(
    track(new THREE.PlaneGeometry(5.6, 5.6)),
    track(
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
      })
    )
  );
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.015;
  scene.add(contactShadow);

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
  const floorRing = new THREE.Mesh(
    track(new THREE.RingGeometry(2.55, 2.6, 64)),
    floorRingMat
  );
  floorRing.rotation.x = -Math.PI / 2;
  floorRing.position.y = 0.025;
  scene.add(floorRing);

  const studioRoot = new THREE.Group();
  scene.add(studioRoot);

  const lathePoints = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1.85, 0),
    new THREE.Vector2(1.92, 0.09),
    new THREE.Vector2(1.74, 0.24),
    new THREE.Vector2(1.52, 0.26),
    new THREE.Vector2(1.48, 0.36),
    new THREE.Vector2(0, 0.36),
  ];
  const pedestalMat = track(
    new THREE.MeshStandardMaterial({
      color: isInitiallyDark ? 0x291e24 : 0xfff7fa,
      roughness: 0.42,
      metalness: 0.14,
    })
  );
  const pedestal = new THREE.Mesh(
    track(new THREE.LatheGeometry(lathePoints, 32)),
    pedestalMat
  );
  pedestal.castShadow = true;
  pedestal.receiveShadow = true;
  studioRoot.add(pedestal);

  const trimRing = new THREE.Mesh(
    track(new THREE.TorusGeometry(1.74, 0.032, 16, 64)),
    track(
      new THREE.MeshPhysicalMaterial({
        color: 0xbe4b72,
        metalness: 0.9,
        roughness: 0.18,
        clearcoat: 0.7,
      })
    )
  );
  trimRing.rotation.x = Math.PI / 2;
  trimRing.position.y = 0.24;
  trimRing.castShadow = true;
  studioRoot.add(trimRing);

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

  const trackpad = new THREE.Mesh(
    track(new THREE.BoxGeometry(0.62, 0.015, 0.38)),
    track(
      new THREE.MeshStandardMaterial({
        color: 0x3d4e81,
        metalness: 0.45,
        roughness: 0.35,
      })
    )
  );
  trackpad.position.set(0, 0.116, 0.38);
  laptopGroup.add(trackpad);

  const keyInstanced = new THREE.InstancedMesh(
    track(new THREE.BoxGeometry(0.11, 0.024, 0.11)),
    track(
      new THREE.MeshStandardMaterial({
        color: 0x261d22,
        roughness: 0.55,
        metalness: 0.15,
      })
    ),
    48
  );
  let keyIdx = 0;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 12; c++) {
      _dummyObj.position.set(-0.77 + c * 0.14, 0.124, -0.42 + r * 0.15);
      _dummyObj.rotation.set(0, 0, 0);
      _dummyObj.scale.set(1, 1, 1);
      _dummyObj.updateMatrix();
      keyInstanced.setMatrixAt(keyIdx++, _dummyObj.matrix);
    }
  }
  keyInstanced.instanceMatrix.needsUpdate = true;
  keyInstanced.computeBoundingSphere();
  laptopGroup.add(keyInstanced);

  const screenHinge = new THREE.Group();
  screenHinge.position.set(0, 0.11, -0.66);
  screenHinge.rotation.x = -0.34;
  laptopGroup.add(screenHinge);

  const lidMesh = new THREE.Mesh(
    track(
      new THREE.ExtrudeGeometry(bodyShape, {
        depth: 0.045,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.015,
        bevelSegments: 2,
      })
    ),
    silverMetalMat
  );
  lidMesh.position.set(0, bd / 2 + 0.04, 0);
  lidMesh.castShadow = true;
  screenHinge.add(lidMesh);

  const screenTex = track(createLaptopScreenTexture(isInitiallyDark));
  const screenMesh = new THREE.Mesh(
    track(new THREE.PlaneGeometry(1.88, 1.18)),
    track(
      new THREE.MeshStandardMaterial({
        map: screenTex,
        emissiveMap: screenTex,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.45,
        roughness: 0.18,
        metalness: 0.05,
      })
    )
  );
  screenMesh.position.set(0, bd / 2 + 0.04, 0.064);
  screenHinge.add(screenMesh);

  const orbitalCoreGroup = new THREE.Group();
  orbitalCoreGroup.position.set(0, 2.2, -0.05);
  studioRoot.add(orbitalCoreGroup);

  const crystalCore = new THREE.Mesh(
    track(new THREE.OctahedronGeometry(0.38, 1)),
    track(
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
    )
  );
  crystalCore.castShadow = true;
  orbitalCoreGroup.add(crystalCore);

  const innerGem = new THREE.Mesh(
    track(new THREE.OctahedronGeometry(0.18, 0)),
    track(
      new THREE.MeshStandardMaterial({
        color: 0x7ed3c6,
        emissive: 0x2f7a70,
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.7,
      })
    )
  );
  orbitalCoreGroup.add(innerGem);

  const orbitalRings: THREE.Mesh[] = [];
  [
    { radius: 0.85, color: 0xbe4b72, tiltX: 0.9, tiltZ: 0.3 },
    { radius: 1.12, color: 0x3d4e81, tiltX: -0.7, tiltZ: 0.65 },
    { radius: 1.38, color: 0x2f7a70, tiltX: 0.35, tiltZ: -0.9 },
  ].forEach((cfg) => {
    const rMesh = new THREE.Mesh(
      track(new THREE.TorusGeometry(cfg.radius, 0.022, 14, 72)),
      track(
        new THREE.MeshStandardMaterial({
          color: cfg.color,
          metalness: 0.88,
          roughness: 0.22,
        })
      )
    );
    rMesh.rotation.set(cfg.tiltX, 0, cfg.tiltZ);
    rMesh.castShadow = true;
    orbitalRings.push(rMesh);
    orbitalCoreGroup.add(rMesh);
  });

  const satellites: THREE.Group[] = [];
  const satFrameGeo = track(new THREE.BoxGeometry(0.24, 0.24, 0.24));
  const satJewelGeo = track(new THREE.OctahedronGeometry(0.11, 0));
  [0xbe4b72, 0x3d4e81, 0x7a4988, 0x2f7a70].forEach((hex, idx) => {
    const satGroup = new THREE.Group();
    const frame = new THREE.Mesh(
      satFrameGeo,
      track(
        new THREE.MeshStandardMaterial({
          color: 0xf8eff2,
          metalness: 0.75,
          roughness: 0.25,
        })
      )
    );
    frame.castShadow = true;
    const jewel = new THREE.Mesh(
      satJewelGeo,
      track(
        new THREE.MeshStandardMaterial({
          color: hex,
          emissive: hex,
          emissiveIntensity: 0.35,
          metalness: 0.4,
          roughness: 0.2,
        })
      )
    );
    jewel.position.y = 0.19;
    satGroup.add(frame, jewel);
    satGroup.userData.phase = (idx * Math.PI) / 2;
    satellites.push(satGroup);
    orbitalCoreGroup.add(satGroup);
  });

  const sparkCount = 42;
  const sparkInstanced = new THREE.InstancedMesh(
    track(new THREE.OctahedronGeometry(0.055, 0)),
    track(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.25,
        metalness: 0.6,
      })
    ),
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

  const handleResize = () => {
    const w = Math.max(container.clientWidth, 300);
    const h = Math.max(container.clientHeight, 300);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);

  let disposed = false;
  let frameId = 0;
  let currentExplode = explodeTarget;
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

    currentExplode = THREE.MathUtils.damp(currentExplode, explodeTarget, 6, delta);

    laptopGroup.position.y = 0.38 + currentExplode * 0.28;
    screenHinge.position.y = 0.11 + currentExplode * 0.18;
    orbitalCoreGroup.position.y =
      2.15 + currentExplode * 0.72 + Math.sin(elapsed * 1.6) * 0.05;

    orbitalRings.forEach((ring, idx) => {
      ring.scale.setScalar(1 + currentExplode * (0.22 + idx * 0.12));
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

    if (autoSpin && !presetTarget) {
      studioRoot.rotation.y += delta * 0.22;
    }

    if (presetTarget) {
      _targetCamPos.set(...presetTarget.position);
      _targetCtrl.set(...presetTarget.target);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, 5.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, 5.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, 5.5, delta);
      controls.target.x = THREE.MathUtils.damp(controls.target.x, _targetCtrl.x, 5.5, delta);
      controls.target.y = THREE.MathUtils.damp(controls.target.y, _targetCtrl.y, 5.5, delta);
      controls.target.z = THREE.MathUtils.damp(controls.target.z, _targetCtrl.z, 5.5, delta);
      if (
        camera.position.distanceTo(_targetCamPos) < 0.03 &&
        controls.target.distanceTo(_targetCtrl) < 0.03
      ) {
        presetTarget = null;
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

  if (isSoftwareGl) {
    frameId = window.setTimeout(tick, 16);
  } else {
    frameId = requestAnimationFrame(tick);
  }

  return {
    setPreset: (presetId: CameraPresetId) => {
      presetTarget = CAMERA_PRESETS[presetId];
    },
    setExplode: (percent: number) => {
      explodeTarget = Math.max(0, Math.min(100, percent)) / 100;
    },
    setAutoSpin: (enabled: boolean) => {
      autoSpin = enabled;
    },
    dispose: () => {
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
    },
  };
}
