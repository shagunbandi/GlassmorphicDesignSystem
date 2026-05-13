<template>
  <div class="gd-grid" :style="gridVars">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: { type: [String, Number], default: '1' },
  columnsXs: { type: [String, Number], default: null },
  columnsSm: { type: [String, Number], default: null },
  columnsMd: { type: [String, Number], default: null },
  columnsLg: { type: [String, Number], default: null },
  /** Spacing units × 4px (e.g. gap="4" → 16px). */
  gap: { type: [String, Number], default: '4' },
})

const gridVars = computed(() => {
  const vars = {
    '--gd-cols': String(props.columns),
    '--gd-gap': `${parseInt(props.gap, 10) * 4}px`,
  }
  if (props.columnsXs) vars['--gd-cols-xs'] = String(props.columnsXs)
  if (props.columnsSm) vars['--gd-cols-sm'] = String(props.columnsSm)
  if (props.columnsMd) vars['--gd-cols-md'] = String(props.columnsMd)
  if (props.columnsLg) vars['--gd-cols-lg'] = String(props.columnsLg)
  return vars
})
</script>

<style scoped>
.gd-grid {
  display: grid;
  grid-template-columns: repeat(var(--gd-cols, 1), minmax(0, 1fr));
  gap: var(--gd-gap, 16px);
}

@media (min-width: 480px) {
  .gd-grid {
    grid-template-columns: repeat(
      var(--gd-cols-xs, var(--gd-cols, 1)),
      minmax(0, 1fr)
    );
  }
}
@media (min-width: 640px) {
  .gd-grid {
    grid-template-columns: repeat(
      var(--gd-cols-sm, var(--gd-cols-xs, var(--gd-cols, 1))),
      minmax(0, 1fr)
    );
  }
}
@media (min-width: 768px) {
  .gd-grid {
    grid-template-columns: repeat(
      var(
        --gd-cols-md,
        var(--gd-cols-sm, var(--gd-cols-xs, var(--gd-cols, 1)))
      ),
      minmax(0, 1fr)
    );
  }
}
@media (min-width: 1024px) {
  .gd-grid {
    grid-template-columns: repeat(
      var(
        --gd-cols-lg,
        var(
          --gd-cols-md,
          var(--gd-cols-sm, var(--gd-cols-xs, var(--gd-cols, 1)))
        )
      ),
      minmax(0, 1fr)
    );
  }
}
</style>
