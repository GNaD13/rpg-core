import { emptyZoneProps, type WorldContent } from '../sim/types';
import { testSceneryColliders } from './scenery_layout';
export function testWorld(): WorldContent {
  return {
    presentationMode: 'blank',
    decorationsMode: 'empty',
    zones: [
      {
        id: 'test',
        name: 'Prototype Field',
        biome: 'vale',
        xMin: -80,
        xMax: 80,
        zMin: -1080,
        zMax: -920,
        levelRange: [1, 1],
        hub: { x: 0, z: -1000, radius: 0, name: 'Test' },
        graveyard: { x: 0, z: -1000 },
        lakes: [],
        pois: [],
        welcome: '',
      },
    ],
    camps: [],
    npcs: {},
    groundObjects: [],
    roads: [],
    props: emptyZoneProps(),
    colliderVolumes: testSceneryColliders(),
    playerStart: { x: 0, z: -1000 },
    terrainEdits: [{ x: 0, z: -1000, radius: 200, delta: 15, mode: 'level', falloff: 'flat' }],
    terrainStyle: { motes: false },
  };
}
