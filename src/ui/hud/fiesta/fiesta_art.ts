import type { AugmentCategory } from '../../../sim/content/augments';

export const FIESTA_AUGMENT_IMAGE_IDS: ReadonlySet<string> = new Set([
  'aug_brutality',
  'aug_spellfire',
  'aug_toughness',
  'aug_keen_eye',
  'aug_fleetfoot',
  'aug_ironhide',
  'aug_mending',
  'aug_warlords_might',
  'aug_arcane_surge',
  'aug_vampirism',
  'aug_juggernaut',
  'aug_bloodhunter',
  'aug_lightwell',
  'aug_bounty_hunter',
  'aug_apex_predator',
  'aug_archmage',
  'aug_unkillable',
  'aug_overdrive',
  'aug_avatar',
  'aug_ascendant',
]);

export const FIESTA_POWERUP_IMAGE_IDS: ReadonlySet<string> = new Set([
  'pow_speed_demon',
  'pow_colossus',
  'pow_moon_boots',
  'pow_berserker',
]);

export function fiestaAugmentImageUrl(id: string): string | null {
  return FIESTA_AUGMENT_IMAGE_IDS.has(id) ? `/ui/fiesta/augments/${id}.webp` : null;
}

export function fiestaPowerupImageUrl(id: string): string | null {
  return FIESTA_POWERUP_IMAGE_IDS.has(id) ? `/ui/fiesta/powerups/${id}.webp` : null;
}

const FIESTA_AUGMENT_FALLBACK_PATHS: Readonly<Record<AugmentCategory, string>> = {
  offense: '<path d="M5 5H19V19H5Z"/>',
  defense: '<path d="M5 5H19V19H5Z"/>',
  sustain:
    '<path d="M5 5H19V19H5Z"/>',
  mobility: '<path d="M5 5H19V19H5Z"/>',
  utility:
    '<path d="M5 5H19V19H5Z"/>',
};

/**
 * Small category identity used only while exact Fiesta art is unavailable or
 * fails to decode. The painted WebP remains the primary surface.
 */
export function fiestaAugmentFallbackSvg(category: AugmentCategory): string {
  return (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">' +
    `${FIESTA_AUGMENT_FALLBACK_PATHS[category]}</svg>`
  );
}
