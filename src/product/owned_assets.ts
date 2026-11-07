/** Product-owned GLBs only. Does not use WoC's legacy media loader. */
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

import { ASSET_MANIFEST, type AssetManifest, type ModelSpec } from './asset_manifest';
let manifest: AssetManifest = { version: 1, character: null, scenery: {} };
const models = new Map<string, GLTF>();
export function localAssetUrl(url: string): string {
  if (!url.startsWith('/assets/') || url.includes('..') || url.includes('\\') || /[?#%]/.test(url))
    throw new Error(`Asset URL must be a plain local /assets/ path: ${url}`);
  return url;
}
export async function initializeOwnedAssets(): Promise<void> {
  const response = await fetch('/assets/manifest.json');
  if (!response.ok) throw new Error(`Asset manifest: HTTP ${response.status}`);
  const value = await response.json() as AssetManifest;
  const colliders = (m: AssetManifest) => JSON.stringify(Object.entries(m.scenery).map(([key,s]) => [key,s?.collider]).sort());
  if (colliders(value) !== colliders(ASSET_MANIFEST)) throw new Error('Asset collider configuration changed. Rebuild BOTH server and client.');
  if (value.version !== 1 || !value.scenery || typeof value.scenery !== 'object') throw new Error('Invalid asset manifest v1');
  for (const spec of Object.values(value.scenery)) {
    if (!spec?.collider || ![spec.collider.width,spec.collider.depth,spec.collider.height].every(v => Number.isFinite(v) && v > 0)) throw new Error('Scenery requires positive collider width/depth/height');
  }
  const specs = [...Object.values(value.scenery), ...(value.character ? [value.character] : [])];
  const loader = new GLTFLoader();
  // Block GLB references escaping the product's owned asset directory as well.
  loader.manager.setURLModifier(url => url.startsWith('blob:') ? url : localAssetUrl(url));
  const loaded = new Map<string, GLTF>();
  for (const spec of specs) {
    if (!spec || !Number.isFinite(spec.height) || spec.height <= 0) throw new Error('Asset height must be positive');
    const url = localAssetUrl(spec.url);
    if (!url.endsWith('.glb')) throw new Error('Use self-contained uncompressed .glb files');
    if (!loaded.has(url)) loaded.set(url, await loader.loadAsync(url));
    const bounds = new THREE.Box3().setFromObject(loaded.get(url)!.scene);
    if (bounds.isEmpty() || bounds.max.y - bounds.min.y < 0.0001) throw new Error(`Empty model: ${url}`);
  }
  if (value.character) {
    const clips = value.character.clips;
    if (!clips?.idle || !clips.walk) throw new Error('Character requires idle and walk clip names');
    const names = new Set(loaded.get(value.character.url)!.animations.map(c => c.name));
    for (const name of Object.values(clips)) if (name && !names.has(name)) throw new Error(`Character animation missing: ${name}`);
  }
  manifest = value;
  models.clear();
  for (const [url, gltf] of loaded) models.set(url, gltf);
}
function instantiate(spec: ModelSpec): THREE.Group {
  const source = models.get(spec.url);
  if (!source) throw new Error(`Asset was not preloaded: ${spec.url}`);
  const model = clone(source.scene);
  const bounds = new THREE.Box3().setFromObject(model);
  const scale = spec.height / (bounds.max.y - bounds.min.y);
  const root = new THREE.Group();
  root.add(model);
  root.scale.setScalar(scale);
  model.position.y -= bounds.min.y;
  model.position.x -= (bounds.min.x + bounds.max.x) / 2;
  model.position.z -= (bounds.min.z + bounds.max.z) / 2;
  return root;
}
export function ownedCharacter(): THREE.Group | null {
  return manifest.character ? instantiate(manifest.character) : null;
}
export function ownedCharacterDefinition() {
  const spec = manifest.character;
  if (!spec) return null;
  return { spec, clips: models.get(spec.url)!.animations };
}
export function ownedScenery(kind: 'tree' | 'rock' | 'house' | 'chest'): THREE.Group | null {
  const spec = manifest.scenery[kind];
  return spec ? instantiate(spec) : null;
}

export function ownedSceneryCollider(kind: 'tree' | 'rock' | 'house' | 'chest') {
  return manifest.scenery[kind]?.collider ?? null;
}
