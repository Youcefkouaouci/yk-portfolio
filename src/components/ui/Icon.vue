<script setup lang="ts">
import { computed } from 'vue';
import { icons, type IconName } from '../../lib/icons';

const props = withDefaults(defineProps<{ name: IconName; size?: number; label?: string }>(), {
  size: 18,
  label: undefined,
});

const def = computed(() => icons[props.name]);
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="def.fill ? 'currentColor' : 'none'"
    :stroke="def.fill ? 'none' : 'currentColor'"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    focusable="false"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <component :is="tag" v-for="([tag, attrs], i) in def.node" :key="i" v-bind="attrs" />
  </svg>
</template>
