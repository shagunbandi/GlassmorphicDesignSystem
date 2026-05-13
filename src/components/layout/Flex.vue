<template>
  <div class="gd-flex" :style="flexStyle">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const JUSTIFY_MAP = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const ALIGN_MAP = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch',
}

const DIRECTION_MAP = {
  row: 'row',
  'row-reverse': 'row-reverse',
  col: 'column',
  'col-reverse': 'column-reverse',
}

const props = defineProps({
  direction: {
    type: String,
    default: 'row',
    validator: (v) => ['row', 'row-reverse', 'col', 'col-reverse'].includes(v),
  },
  justify: {
    type: String,
    default: 'start',
    validator: (v) =>
      ['start', 'end', 'center', 'between', 'around', 'evenly'].includes(v),
  },
  align: {
    type: String,
    default: 'stretch',
    validator: (v) =>
      ['start', 'end', 'center', 'baseline', 'stretch'].includes(v),
  },
  wrap: {
    type: String,
    default: 'wrap',
    validator: (v) => ['nowrap', 'wrap', 'wrap-reverse'].includes(v),
  },
  /** Spacing units × 4px (e.g. gap="4" → 16px). Empty string = no gap. */
  gap: { type: [String, Number], default: '' },
})

const flexStyle = computed(() => ({
  flexDirection: DIRECTION_MAP[props.direction] ?? 'row',
  justifyContent: JUSTIFY_MAP[props.justify] ?? 'flex-start',
  alignItems: ALIGN_MAP[props.align] ?? 'stretch',
  flexWrap: props.wrap,
  gap:
    props.gap !== '' && props.gap != null
      ? `${parseInt(props.gap, 10) * 4}px`
      : undefined,
}))
</script>

<style scoped>
.gd-flex {
  display: flex;
}
</style>
