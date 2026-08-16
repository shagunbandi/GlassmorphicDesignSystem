<template>
  <svg
    class="gd-spinner"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
      style="opacity: 0.25"
    />
    <path
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      style="opacity: 0.75"
    />
  </svg>
</template>

<script setup>
// Internal only — sized in em so it inherits the host control's font-size.
</script>

<style scoped>
.gd-spinner {
  width: 1em;
  height: 1em;
  animation: gd-spin 0.75s linear infinite;
}

@keyframes gd-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gd-spinner {
    animation-duration: 2s;
  }
}
</style>
