// Product bootstrap only. Original auth, tick, lease and persistence remain intact.
import './env';
import { testWorld } from '../src/mit_test/world';
import { setActiveWorldContent } from '../src/sim/data';
import type { SimConfig } from '../src/sim/types';

export function usesProductWorld(): boolean {
  return process.env.RPG_WORLD === 'placeholder';
}
export function productRealmOverrides(): Partial<SimConfig> {
  if (!usesProductWorld()) return {};
  const world = testWorld();
  setActiveWorldContent(world);
  return {
    world,
    compulsoryTutorial: false,
    worldBossAtBoot: false,
    mirefenMuster: false,
    riftPortals: false,
  };
}
export function productCharacterSpawn() {
  if (!usesProductWorld()) return null;
  const { playerStart } = testWorld();
  return { x: playerStart!.x, z: playerStart!.z, facing: 0 };
}
