<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { $active, $windows, $workFilter, focusWindow, type WindowState } from '../../lib/desktop';
import { $theme, toggleTheme } from '../../lib/theme';
import type { DesktopWindow } from '../../data/windows';
import { disciplines } from '../../data/windows';
import Icon from '../ui/Icon.vue';
import LogoMark from '../ui/LogoMark.vue';

const props = defineProps<{
  windows: DesktopWindow[];
  studio: string;
  name: string;
  email: string;
  github: string;
  linkedin: string;
}>();

const states = useStore($windows);
const active = useStore($active);
const theme = useStore($theme);

// Le rendu serveur ne connaît ni le thème enregistré ni l'heure : on attend le montage.
const mounted = ref(false);
const isBlueprint = computed(() => mounted.value && theme.value === 'blueprint');
const themeLabel = computed(() =>
  isBlueprint.value ? 'Passer au rendu Calque (clair)' : 'Passer au rendu Blueprint (sombre)',
);

const stateOf = (id: string): WindowState => states.value[id] ?? 'open';
const visible = computed(() => props.windows.filter((w) => stateOf(w.id) !== 'closed'));

/* Horloge — heure de Paris, là où Youcef travaille */
const clock = ref('');
const clockIso = ref('');
let clockTimer: number | undefined;
const fmt = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });
function tick() {
  const now = new Date();
  clock.value = fmt.format(now);
  clockIso.value = now.toISOString();
}

/* Menu Démarrer */
const menuOpen = ref(false);
const root = ref<HTMLElement | null>(null);
const startBtn = ref<HTMLButtonElement | null>(null);
const menu = ref<HTMLElement | null>(null);

async function openMenu() {
  menuOpen.value = true;
  await nextTick();
  menu.value?.querySelector<HTMLElement>('a, button')?.focus();
}
function closeMenu(returnFocus = false) {
  menuOpen.value = false;
  if (returnFocus) startBtn.value?.focus();
}
function toggleMenu() {
  if (menuOpen.value) closeMenu();
  else openMenu();
}
function onPointerDown(e: PointerEvent) {
  if (menuOpen.value && root.value && !root.value.contains(e.target as Node)) closeMenu();
}
function onFocusOut(e: FocusEvent) {
  const next = e.relatedTarget as Node | null;
  if (menuOpen.value && next && root.value && !root.value.contains(next)) closeMenu();
}

function openWindow(id: string) {
  closeMenu();
  focusWindow(id);
}
function openDiscipline(id: string) {
  $workFilter.set(id);
  openWindow('realisations');
}

onMounted(() => {
  mounted.value = true;
  tick();
  clockTimer = window.setInterval(tick, 15_000);
  document.addEventListener('pointerdown', onPointerDown);
});
onBeforeUnmount(() => {
  window.clearInterval(clockTimer);
  document.removeEventListener('pointerdown', onPointerDown);
});
</script>

<template>
  <nav ref="root" class="taskbar" aria-label="Barre des tâches" @focusout="onFocusOut" @keydown.esc="closeMenu(true)">
    <button
      id="taskbar-start"
      ref="startBtn"
      type="button"
      class="tb-start"
      :aria-expanded="menuOpen"
      aria-controls="start-menu"
      @click="toggleMenu"
    >
      <LogoMark :size="24" />
      <span class="sr-only">Menu Démarrer</span>
    </button>

    <span class="tb-sep" aria-hidden="true" />

    <ul class="tb-items">
      <li v-for="w in visible" :key="w.id">
        <button
          type="button"
          class="tb-item"
          :data-state="stateOf(w.id)"
          :data-active="mounted && active === w.id ? 'true' : undefined"
          :aria-current="mounted && active === w.id ? 'location' : undefined"
          :title="w.label"
          @click="focusWindow(w.id)"
        >
          <Icon :name="w.icon" :size="20" />
          <span class="tb-label">{{ w.label }}</span>
          <span v-if="stateOf(w.id) === 'minimized'" class="sr-only">(réduite)</span>
          <span class="tb-pip" aria-hidden="true" />
        </button>
      </li>
    </ul>

    <span class="tb-sep" aria-hidden="true" />

    <div class="tb-tray">
      <button type="button" class="tb-tray-btn" :aria-label="themeLabel" :title="themeLabel" @click="toggleTheme">
        <Icon :name="isBlueprint ? 'sun' : 'moon'" :size="18" />
      </button>
      <time class="tb-clock" :datetime="clockIso || undefined">
        <span>{{ clock || '--:--' }}</span>
        <span class="tb-clock-city">Paris</span>
      </time>
    </div>

    <Transition name="start">
      <div v-if="menuOpen" id="start-menu" ref="menu" class="start-menu" role="dialog" aria-label="Menu Démarrer">
        <div class="sm-head">
          <LogoMark :size="30" />
          <div>
            <p class="sm-studio">{{ studio }}</p>
            <p class="sm-sub">Portfolio de {{ name }}</p>
          </div>
        </div>

        <p class="sm-label" id="sm-windows">Fenêtres</p>
        <ul class="sm-grid" aria-labelledby="sm-windows">
          <li v-for="w in windows" :key="w.id">
            <button type="button" class="sm-tile" :data-accent="w.accent" @click="openWindow(w.id)">
              <Icon :name="w.icon" :size="22" />
              <span>{{ w.label }}</span>
              <span v-if="stateOf(w.id) === 'closed'" class="sm-tile-note">fermée</span>
            </button>
          </li>
        </ul>

        <p class="sm-label" id="sm-disciplines">Disciplines</p>
        <ul class="sm-list" aria-labelledby="sm-disciplines">
          <li v-for="d in disciplines" :key="d.id">
            <button type="button" class="sm-row" @click="openDiscipline(d.id)">
              <span :class="['half', `half-${d.accent}`]" aria-hidden="true" />
              {{ d.label }}
            </button>
          </li>
        </ul>

        <div class="sm-foot">
          <div class="sm-social">
            <a class="icon-btn" :href="github" target="_blank" rel="noopener"><Icon name="github" label="GitHub" /></a>
            <a class="icon-btn" :href="linkedin" target="_blank" rel="noopener"><Icon name="linkedin" label="LinkedIn" /></a>
          </div>
          <a class="btn btn-dev" :href="`mailto:${email}`"><Icon name="mail" :size="16" />M'écrire</a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.taskbar {
  position: fixed;
  left: 50%;
  bottom: 12px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 2px;
  height: var(--taskbar-h);
  max-width: calc(100vw - 24px);
  padding: 0 6px;
  border: 1px solid var(--line);
  border-radius: 9999px;
  background: var(--surface-raised);
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  box-shadow: var(--shadow-3);
  transform: translateX(-50%);
}
.tb-start,
.tb-tray-btn {
  display: grid;
  flex: none;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  color: var(--ink-muted);
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}
.tb-start:hover,
.tb-start[aria-expanded='true'],
.tb-tray-btn:hover {
  background: var(--hover-strong);
  color: var(--ink);
}
.tb-sep {
  flex: none;
  width: 1px;
  height: 24px;
  margin: 0 4px;
  background: var(--line);
}
.tb-items {
  display: flex;
  gap: 2px;
  min-width: 0;
}
.tb-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px;
  border-radius: 9999px;
  color: var(--ink-muted);
  font-size: 13.5px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}
.tb-item:hover {
  background: var(--hover);
  color: var(--ink);
}
.tb-item[data-active] {
  background: var(--hover-strong);
  color: var(--ink);
}
.tb-item[data-state='minimized'] {
  color: var(--ink-faint);
}
/* Indicateur Windows 11 : point = ouverte, trait long = active, rien = réduite */
.tb-pip {
  position: absolute;
  left: 50%;
  bottom: 3px;
  width: 5px;
  height: 3px;
  border-radius: 3px;
  background: var(--ink-faint);
  transform: translateX(-50%);
  transition: width 0.25s var(--ease-out), background-color 0.25s;
}
.tb-item[data-active] .tb-pip {
  width: 16px;
  background: var(--dev-strong);
}
.tb-item[data-state='minimized'] .tb-pip {
  width: 0;
}
.tb-label {
  display: none;
}
@media (min-width: 1100px) {
  .tb-label {
    display: inline;
  }
}
.tb-tray {
  display: flex;
  flex: none;
  align-items: center;
  gap: 4px;
  padding-right: 8px;
}
.tb-clock {
  display: grid;
  justify-items: end;
  min-width: 44px;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.25;
  color: var(--ink);
}
.tb-clock-city {
  color: var(--ink-faint);
  font-size: 10.5px;
}
@media (max-width: 639px) {
  .taskbar {
    left: 12px;
    right: 12px;
    justify-content: space-between;
    transform: none;
  }
  .tb-clock {
    display: none;
  }
  .tb-tray {
    padding-right: 0;
  }
  .tb-item {
    padding: 0 10px;
  }
  .tb-sep {
    margin: 0 1px;
  }
}
@media (max-width: 400px) {
  .tb-item {
    padding: 0 8px;
  }
  .tb-start,
  .tb-tray-btn {
    width: 40px;
  }
}

/* Menu Démarrer */
.start-menu {
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  width: min(400px, calc(100vw - 24px));
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  /* Le menu est imbriqué dans la barre, qui a déjà un backdrop-filter : un second flou ne verrait rien. Fond plein. */
  background: var(--surface-solid);
  box-shadow: var(--shadow-3);
}
.start-enter-active,
.start-leave-active {
  transition: opacity 0.18s, transform 0.22s var(--ease-out);
}
.start-enter-from,
.start-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
.sm-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}
.sm-studio {
  font-weight: 600;
  letter-spacing: -0.01em;
}
.sm-sub {
  font-size: 13px;
  color: var(--ink-muted);
}
.sm-label {
  margin: 14px 0 6px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--ink-muted);
}
.sm-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}
.sm-tile {
  display: grid;
  justify-items: center;
  gap: 6px;
  width: 100%;
  padding: 12px 4px 10px;
  border-radius: 8px;
  font-size: 12.5px;
  color: var(--ink);
  cursor: pointer;
  transition: background-color 0.15s;
}
.sm-tile svg {
  color: var(--dev-strong);
}
.sm-tile[data-accent='archi'] svg {
  color: var(--archi-strong);
}
.sm-tile[data-accent='neutral'] svg {
  color: var(--ink-muted);
}
.sm-tile:hover {
  background: var(--hover-strong);
}
.sm-tile-note {
  margin-top: -4px;
  font-size: 11px;
  color: var(--ink-faint);
}
.sm-list {
  display: grid;
}
.sm-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}
.sm-row:hover {
  background: var(--hover-strong);
}
.sm-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}
.sm-social {
  display: flex;
  gap: 2px;
}
</style>
