// UI icon API retained; upstream SVG artwork replaced with original placeholders.
import { chromeIconUrl } from './chrome_icon_art';

export type UiIconName =
  | 'bell'
  // game-icons.net
  | 'arena'
  | 'dfinder'
  | 'tank'
  | 'healer'
  | 'check'
  | 'sprout'
  | 'questlog'
  | 'crown'
  | 'target'
  | 'menu'
  | 'spellbook'
  | 'bags'
  | 'map'
  | 'leaderboard'
  | 'character'
  | 'social'
  | 'attack'
  | 'market'
  | 'chat'
  | 'interact'
  | 'emote'
  // brand mark
  | 'discord'
  | 'twitch'
  | 'x'
  | 'kick'
  | 'youtube'
  | 'steam'
  | 'donate'
  | 'chest'
  // hand-authored geometrics
  | 'close'
  | 'prev'
  | 'next'
  | 'more'
  | 'meters'
  | 'gear'
  | 'battleground'
  | 'whisper'
  | 'music'
  | 'talents'
  | 'skull'
  | 'jump'
  | 'autorun'
  | 'swap'
  | 'sort'
  | 'nameplates'
  | 'vibrate'
  | 'lock'
  | 'mail'
  | 'book'
  | 'cards'
  | 'trash'
  | 'mount'
  | 'crafting'
  | 'professions'
  | 'makers-mark'
  | 'enchant-rune'
  | 'bond-link'
  | 'download'
  | 'eye'
  | 'eye-off'
  | 'promote'
  | 'demote'
  | 'out-of-range'
  | 'wiki'
  | 'alert'
  | 'perfecting'
  | 'harvest-journal';

// Inner SVG markup per icon (one or more <path>). Default fill rule is nonzero
// (correct for game-icons.net art incl. overlaps); the two hand-authored cut-out
// glyphs set fill-rule="evenodd" locally.
// Original geometric placeholders (c) 2026 gnad, MIT. Replace with your own UI art.
const ICONS: Record<UiIconName, string> = {
  bell: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  battleground: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  promote: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  demote: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  'out-of-range': '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  arena: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  dfinder: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  tank: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  healer: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  check: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  sprout: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  questlog: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  crown: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  target: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  menu: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  spellbook: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  bags: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  map: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  leaderboard: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  character: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  social: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  attack: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  market: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  chat: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  interact: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  emote: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  discord: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  twitch: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  x: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  kick: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  youtube: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  steam: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  donate: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  chest: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  close: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  trash: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  prev: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  next: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  more: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  meters: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  gear: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  nameplates: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  whisper: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  music: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  talents: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  skull: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  jump: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  autorun: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  swap: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  sort: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  download: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  eye: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  'eye-off': '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  vibrate: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  lock: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  mail: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  book: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  mount: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  cards: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  crafting: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  professions: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  wiki: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  alert: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  'makers-mark': '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  'enchant-rune': '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  'bond-link': '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  perfecting: '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
  'harvest-journal': '<rect x="112" y="112" width="288" height="288" rx="40"/><circle cx="256" cy="256" r="64" fill="var(--panel-bg, #25342f)"/>',
};

export function hasUiIcon(name: string): name is UiIconName {
  return name in ICONS;
}

export interface SvgIconOpts {
  /** extra class(es) on the <svg> */
  cls?: string;
  /** accessible label; when omitted the icon is aria-hidden (decorative) */
  title?: string;
}

/** Returns inline <svg> markup for a UI-chrome icon, tinted via CSS `color`. */
export function svgIcon(name: UiIconName, opts: SvgIconOpts = {}): string {
  const cls = opts.cls ? ` ${opts.cls}` : '';
  const a11y = opts.title
    ? `role="img" aria-label="${opts.title.replace(/"/g, '&quot;')}"`
    : 'aria-hidden="true"';
  return `<svg class="ui-icon${cls}" viewBox="0 0 512 512" fill="currentColor" ${a11y} focusable="false">${ICONS[name]}</svg>`;
}

/**
 * Painted-art `<img>` markup for a primary destination (DESIGN.md section 6). Decorative
 * by construction: every host that carries art is a button or link with its own
 * `aria-label`, so a second accessible name here would double-announce it.
 * `draggable="false"` matters on a HUD control: a native image drag on a launcher starts a
 * ghost-drag instead of a click.
 */
function chromeArtIcon(url: string): string {
  return `<img class="ui-icon ui-icon-art" src="${url}" alt="" aria-hidden="true" draggable="false" decoding="async">`;
}

/**
 * Replace `[data-icon="name"]` placeholders in static markup (index.html) with their icon,
 * once. Existing children (keybind labels, mobile captions) are kept; the icon is prepended
 * and marked decorative since the host element carries the accessible name (title /
 * aria-label).
 *
 * A name with committed painted art (CHROME_ART_IDS) hydrates as that `<img>` instead of
 * the inline SVG: these placeholders ARE the primary destinations (the side rail, the
 * mobile bar, the More tray), which DESIGN.md section 6 gives painted art. A failed image
 * load swaps that one icon slot to the existing SVG glyph. The SVG stays the source
 * everywhere else, including every direct `svgIcon()` call, so the small inline uses beside
 * text keep tinting with `currentColor`.
 */
export function hydrateIcons(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-icon]').forEach((el) => {
    const name = el.dataset.icon;
    if (!name || !hasUiIcon(name) || el.querySelector(':scope > .ui-icon')) return;
    const art = chromeIconUrl(name);
    if (!art) {
      el.insertAdjacentHTML('afterbegin', svgIcon(name));
      return;
    }
    el.insertAdjacentHTML('afterbegin', chromeArtIcon(art));
    const image = el.querySelector<HTMLImageElement>(':scope > img.ui-icon-art');
    image?.addEventListener(
      'error',
      () => {
        image.outerHTML = svgIcon(name);
      },
      { once: true },
    );
  });
}
