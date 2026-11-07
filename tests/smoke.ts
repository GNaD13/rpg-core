import assert from 'node:assert/strict';
import * as THREE from 'three';
import { testBody, testPrepared } from '../src/mit_test/assets';
import { buildTestScenery } from '../src/mit_test/scenery';
import { TEST_SCENERY } from '../src/mit_test/scenery_layout';
import { testWorld } from '../src/mit_test/world';
import { setActiveWorldContent } from '../src/sim/data';
import { Sim } from '../src/sim/sim';
import { groundHeight } from '../src/sim/world';

const world = testWorld();
setActiveWorldContent(world);
const sim = new Sim({ seed: 42, playerClass: 'warrior', world });
const initial = { ...sim.player.pos };
for (let i = 0; i < 20; i++) sim.tick();
assert.equal(sim.player.pos.x, initial.x);
assert.equal(sim.player.pos.z, initial.z);
assert.equal(groundHeight(initial.x, initial.z, 42), 15);
sim.moveInput.forward = true;
for (let i = 0; i < 20; i++) sim.tick();
sim.moveInput.forward = false;
const distance = Math.hypot(sim.player.pos.x - initial.x, sim.player.pos.z - initial.z);
assert(distance > 1);
sim.moveInput.jump = true;
sim.tick();
sim.moveInput.jump = false;
let peak = sim.player.pos.y;
for (let i = 0; i < 50; i++) {
  sim.tick();
  peak = Math.max(peak, sim.player.pos.y);
}
assert(peak > 15.1);
assert(sim.player.onGround);
assert(Math.abs(sim.player.pos.y - 15) < 0.01);
const body = testBody();
const bounds = new THREE.Box3().setFromObject(body);
assert(Math.abs(bounds.min.y) < 0.02);
assert(bounds.max.y > 1.9 && bounds.max.y < 2.1);
const prep = testPrepared('mit_test');
const walk = prep.clips.get('Walk');
assert(walk);
const mixer = new THREE.AnimationMixer(body);
mixer.clipAction(walk).play();
mixer.update(0.175);
const leftLeg = body.getObjectByName('leg_l');
const rightLeg = body.getObjectByName('leg_r');
assert(leftLeg && rightLeg);
assert(Math.abs(leftLeg.rotation.x) > 0.1);
assert(Math.abs(rightLeg.rotation.x) > 0.1);
console.log(
  JSON.stringify(
    {
      passed: true,
      idleStable: true,
      movementDistance: distance,
      jumpHeight: peak - 15,
      landed: true,
      terrainMatches: true,
      bodyFloorSeated: true,
      animationBindings: true,
    },
    null,
    2,
  ),
);

// Drive the real movement kernel into each placed solid, then alongside it.
for (const asset of TEST_SCENERY) {
  const p = sim.player;
  const start = asset.z - asset.depth / 2 - 2;
  function place(x: number) {
    p.pos = { x, y: 15, z: start };
    p.prevPos = { ...p.pos };
    p.facing = 0;
    p.vx = p.vy = p.vz = 0;
    p.onGround = true;
    p.fallStartY = 15;
  }
  place(asset.x);
  sim.moveInput.forward = true;
  for (let i = 0; i < 35; i++) sim.tick();
  sim.moveInput.forward = false;
  assert(p.pos.z < asset.z - asset.depth / 2, `${asset.id}: must block passage`);
  assert(p.pos.z > start + 0.5, `${asset.id}: approach must remain open`);
  place(asset.x + asset.width / 2 + 1.25);
  sim.moveInput.forward = true;
  for (let i = 0; i < 35; i++) sim.tick();
  sim.moveInput.forward = false;
  assert(p.pos.z > asset.z + asset.depth / 2, `${asset.id}: side route must remain open`);
}
const scenery = buildTestScenery(42);
assert.equal(scenery.group.children.length, TEST_SCENERY.length);
for (const root of scenery.group.children) {
  const bounds = new THREE.Box3().setFromObject(root);
  assert(Math.abs(bounds.min.y - 15) < 0.02, `${root.name}: must sit on terrain`);
}
const resources = new Set<THREE.BufferGeometry | THREE.Material>();
scenery.group.traverse((object) => {
  if (object instanceof THREE.Mesh) {
    resources.add(object.geometry);
    for (const material of Array.isArray(object.material) ? object.material : [object.material])
      resources.add(material);
  }
});
const disposals = new Map<object, number>();
for (const resource of resources)
  resource.addEventListener('dispose', () =>
    disposals.set(resource, (disposals.get(resource) ?? 0) + 1),
  );
scenery.dispose();
scenery.dispose();
for (const resource of resources)
  assert.equal(
    disposals.get(resource),
    1,
    'Each geometry and material must be disposed exactly once',
  );
console.log(
  'Scenery: all 5 placements block approach, allow side passage, sit on terrain; disposal is idempotent.',
);
