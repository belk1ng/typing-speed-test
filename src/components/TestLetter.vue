<script setup lang="ts">
export interface TestLetterProps {
  value: string;
  valid: boolean;
  correctValue: string;
}

defineProps<TestLetterProps>();
</script>

<template>
  <span v-if="value === ' ' && correctValue === ' '">&nbsp;</span>
  <span class="test-letter" v-else-if="value === ' '">
    {{ correctValue }}
  </span>
  <span v-else class="test-letter" :class="{ 'test-letter--valid': valid }">
    {{ value }}
  </span>
</template>

<style scoped lang="scss">
.test-letter {
  color: lightcoral;

  &--valid {
    color: lightseagreen;
  }
}
</style>
