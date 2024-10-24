<script setup lang="ts">
export interface TrainerLetterProps {
  value: string;
  correctValue: string;
}

defineProps<TrainerLetterProps>();
</script>

<template>
  <span v-if="value === ' ' && correctValue === ' '">&nbsp;</span>
  <span class="letter" v-else-if="value === ' '">
    {{ correctValue }}
  </span>
  <span
    v-else
    class="letter"
    :class="{ 'letter--valid': value === correctValue }"
  >
    {{ value }}
  </span>
</template>

<style scoped lang="scss">
.letter {
  color: lightcoral;

  &--valid {
    color: lightseagreen;
  }
}
</style>
