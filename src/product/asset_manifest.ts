export interface ModelSpec {
  url: string;
  height: number;
}
export interface AssetManifest {
  version: 1;
  character:
    | (ModelSpec & {
        clips: { idle: string; walk: string; run?: string; attack?: string; death?: string };
      })
    | null;
  scenery: Partial<
    Record<
      'tree' | 'rock' | 'house' | 'chest',
      ModelSpec & { collider: { width: number; depth: number; height: number } }
    >
  >;
}

import value from '../../public/assets/manifest.json';
export const ASSET_MANIFEST = value as AssetManifest;
export function declaredSceneryCollider(kind: 'tree' | 'rock' | 'house' | 'chest') {
  return ASSET_MANIFEST.scenery[kind]?.collider ?? null;
}
