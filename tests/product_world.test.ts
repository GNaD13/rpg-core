import { afterEach, describe, expect, it, vi } from 'vitest';
import { productCharacterSpawn, productRealmOverrides } from '../server/product_world';
import { testWorld } from '../src/mit_test/world';
import { getActiveWorldContent, setActiveWorldContent } from '../src/sim/data';
import { groundHeight } from '../src/sim/world';

afterEach(() => {
  vi.unstubAllEnvs();
  setActiveWorldContent(null);
});
describe('shared product world boot', () => {
  it('keeps the upstream boot config available when the product profile is absent', () => {
    vi.stubEnv('RPG_WORLD', '');
    expect(productRealmOverrides()).toEqual({});
    expect(productCharacterSpawn()).toBeNull();
  });
  it('binds identical authoritative and client world content without upstream tutorial spawns', () => {
    vi.stubEnv('RPG_WORLD', 'placeholder');
    const cfg = productRealmOverrides();
    expect(cfg.world).toEqual(testWorld());
    expect(getActiveWorldContent()).toEqual(cfg.world);
    expect([
      cfg.compulsoryTutorial,
      cfg.worldBossAtBoot,
      cfg.mirefenMuster,
      cfg.riftPortals,
    ]).toEqual([false, false, false, false]);
    expect(productCharacterSpawn()).toEqual({ x: 0, z: -1000, facing: 0 });
    expect(groundHeight(0, -1000, 42)).toBe(15);
    expect(cfg.world!.colliderVolumes).toHaveLength(5);
  });
});
