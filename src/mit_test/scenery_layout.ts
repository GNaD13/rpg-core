// Shared visual/collision dimensions. Original MIT testing assets, (c) 2026 gnad.
import { declaredSceneryCollider as ownedSceneryCollider } from '../product/asset_manifest';
import type { ColliderVolume } from '../sim/types';
export type TestAssetKind = 'tree' | 'rock' | 'house' | 'chest';
export interface TestAssetPlacement {
  readonly id: string;
  readonly kind: TestAssetKind;
  readonly x: number;
  readonly z: number;
  readonly width: number;
  readonly depth: number;
  readonly solidHeight: number;
}
export const TEST_SCENERY: readonly TestAssetPlacement[] = [
  { id: 'chest', kind: 'chest', x: 0, z: -992, width: 1.8, depth: 1.1, solidHeight: 1.45 },
  { id: 'rock', kind: 'rock', x: -4, z: -989, width: 2.4, depth: 2, solidHeight: 1.5 },
  { id: 'house', kind: 'house', x: 7, z: -981, width: 6, depth: 5, solidHeight: 3.6 },
  { id: 'tree-left', kind: 'tree', x: -7, z: -985, width: 0.7, depth: 0.7, solidHeight: 3.4 },
  { id: 'tree-right', kind: 'tree', x: 9, z: -991, width: 0.7, depth: 0.7, solidHeight: 3.4 },
];
export function testSceneryColliders(): ColliderVolume[] {
  return TEST_SCENERY.map((p) => ({
    kind: 'box',
    x: p.x,
    z: p.z,
    rotY: 0,
    sizeX: ownedSceneryCollider(p.kind)?.width ?? p.width,
    sizeY: ownedSceneryCollider(p.kind)?.height ?? p.solidHeight,
    sizeZ: ownedSceneryCollider(p.kind)?.depth ?? p.depth,
  }));
}
