// Procedural low-poly art, no imported media. MIT, copyright (c) 2026 gnad.
import * as THREE from 'three';
import { ownedScenery } from '../product/owned_assets';
import { groundHeight } from '../sim/world';
import { TEST_SCENERY, type TestAssetPlacement } from './scenery_layout';

const owned = new WeakMap<THREE.Scene, ReturnType<typeof buildTestScenery>>();
export function buildTestScenery(seed: number) {
  const group = new THREE.Group();
  group.name = 'mit-test-scenery';
  const materials = new Map<number, THREE.MeshLambertMaterial>();
  const geometries = new Set<THREE.BufferGeometry>();
  function material(color: number) {
    let mat = materials.get(color);
    if (!mat) {
      mat = new THREE.MeshLambertMaterial({ color, flatShading: true });
      materials.set(color, mat);
    }
    return mat;
  }
  function mesh(
    parent: THREE.Group,
    geometry: THREE.BufferGeometry,
    color: number,
    x: number,
    y: number,
    z: number,
  ) {
    geometries.add(geometry);
    const object = new THREE.Mesh(geometry, material(color));
    object.position.set(x, y, z);
    parent.add(object);
    return object;
  }
  function box(
    parent: THREE.Group,
    w: number,
    h: number,
    d: number,
    color: number,
    x = 0,
    y = h / 2,
    z = 0,
  ) {
    return mesh(parent, new THREE.BoxGeometry(w, h, d), color, x, y, z);
  }
  function house(root: THREE.Group, p: TestAssetPlacement) {
    box(root, p.width, p.solidHeight, p.depth, 0xe4d3a5);
    // Explicit prism: a roof ridge aligned with the house depth.
    const shape = new THREE.Shape();
    shape.moveTo(-p.width / 2 - 0.35, 0);
    shape.lineTo(0, 1.9);
    shape.lineTo(p.width / 2 + 0.35, 0);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: p.depth + 0.6, bevelEnabled: false });
    mesh(root, g, 0x8e4935, 0, p.solidHeight, -p.depth / 2 - 0.3);
    for (const x of [-p.width / 2 + 0.1, p.width / 2 - 0.1])
      box(root, 0.2, p.solidHeight, p.depth + 0.04, 0x65472d, x);
    box(root, p.width, 0.22, p.depth + 0.08, 0x65472d, 0, p.solidHeight - 0.15);
    // Closed decorative door and front windows. This sample house is solid.
    box(root, 1.25, 2.2, 0.1, 0x735033, 0, 1.1, -p.depth / 2 - 0.06);
    box(root, 0.13, 0.16, 0.11, 0xe1b24c, 0.37, 1.1, -p.depth / 2 - 0.13);
    for (const x of [-1.9, 1.9]) {
      box(root, 1.12, 1.12, 0.12, 0x65472d, x, 2.1, -p.depth / 2 - 0.06);
      box(root, 0.86, 0.86, 0.14, 0x7db6c0, x, 2.1, -p.depth / 2 - 0.1);
      box(root, 0.07, 0.86, 0.16, 0xe4d3a5, x, 2.1, -p.depth / 2 - 0.13);
      box(root, 0.86, 0.07, 0.16, 0xe4d3a5, x, 2.1, -p.depth / 2 - 0.13);
    }
    box(root, 0.65, 1.45, 0.7, 0x777a76, 1.7, 4.8, 0.8);
  }
  for (const p of TEST_SCENERY) {
    const root = new THREE.Group();
    root.name = `mit-${p.id}`;
    root.position.set(p.x, groundHeight(p.x, p.z, seed), p.z);
    const custom = ownedScenery(p.kind);
    if (custom) { root.add(custom); } else if (p.kind === 'tree') {
      box(root, p.width, p.solidHeight, p.depth, 0x77502f);
      for (const [radius, y, h] of [
        [2, 3.8, 2.8],
        [1.5, 4.9, 2.4],
        [1, 5.8, 2],
      ])
        mesh(root, new THREE.ConeGeometry(radius, h, 7), 0x477b48, 0, y, 0);
    } else if (p.kind === 'rock') {
      box(root, p.width, p.solidHeight, p.depth, 0x858d90);
      box(
        root,
        p.width * 0.72,
        0.012,
        p.depth * 0.74,
        0xa6aca7,
        -0.14,
        p.solidHeight + 0.006,
        0.05,
      );
    } else if (p.kind === 'chest') {
      box(root, p.width, 0.9, p.depth, 0x986331);
      const lid = mesh(
        root,
        new THREE.CylinderGeometry(0.55, 0.55, p.width, 10, 1, false, 0, Math.PI),
        0xb77d3e,
        0,
        0.9,
        0,
      );
      lid.rotation.z = Math.PI / 2;
      for (const x of [-0.62, 0.62]) box(root, 0.11, 1.44, p.depth + 0.025, 0x48575b, x, 0.72);
      box(root, 0.25, 0.33, 0.11, 0xe2b450, 0, 0.85, -p.depth / 2 - 0.07);
    } else house(root, p);
    group.add(root);
  }
  let disposed = false;
  return {
    group,
    dispose() {
      if (disposed) return;
      disposed = true;
      group.removeFromParent();
      for (const g of geometries) g.dispose();
      for (const m of materials.values()) m.dispose();
    },
  };
}
export function installTestScenery(
  scene: THREE.Scene,
  seed: number,
  attach: (view: { group: THREE.Group }) => void,
) {
  disposeTestScenery(scene);
  const view = buildTestScenery(seed);
  owned.set(scene, view);
  attach(view);
}
export function disposeTestScenery(scene: THREE.Scene) {
  owned.get(scene)?.dispose();
  owned.delete(scene);
}
