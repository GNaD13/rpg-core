// Independent placeholder trunk metadata. MIT (c) 2026 gnad.
export interface TrunkSocket {
  /** Socket position in trunk-local yards (Y up). */
  p: readonly [number, number, number];
  /** Unit direction the limb was travelling when it ended. */
  d: readonly [number, number, number];
  /** Limb radius at the tip. */
  r: number;
  /** Conifer whorls only: 0 at the lowest whorl, 1 at the top. */
  tier?: number;
  /** The single crown socket of a palm: hang the whole canopy here. */
  crown?: boolean;
}

export interface TrunkDef {
  key: string;
  label: string;
  kind: string;
  /** Model height in source yards (tallest vertex). */
  height: number;
  /** Trunk girth at the foot: the collision footprint radius. */
  baseRadius: number;
  /** How much of the height is solid trunk worth colliding with. */
  collideHeight: number;
  /** Suggested canopy centre height and spread when a tree is first placed. */
  crownY: number;
  crownRadius: number;
  verts: number;
  sockets: readonly TrunkSocket[];
}

// Original minimal placeholder; old Blender-derived sockets removed.
export const TRUNKS: readonly TrunkDef[] = [{
  key:'oak',label:'Placeholder trunk',kind:'broadleaf',height:4,baseRadius:.35,
  collideHeight:3.4,crownY:4,crownRadius:2,verts:0,
  sockets:[{p:[0,4,0],d:[0,1,0],r:.15}],
}];

export const DEFAULT_TRUNK = 'oak';

export function trunkPath(key: string): string {
  return `models/foliage/trunks/${key}.glb`;
}

export function trunkDef(key: string): TrunkDef | null {
  return TRUNKS.find((t) => t.key === key) ?? null;
}
