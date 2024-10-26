<script setup lang="ts">
interface Props {
  name: string;
  value: number;
}

defineProps<Props>();
</script>

<template>
  <div class="metric">
    <h3>{{ name }}</h3>

    <div class="metric__container">
      {{ value.toFixed(0).toString() }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.metric {
  display: inline-flex;
  align-items: center;
  flex-direction: column-reverse;
  gap: 0.5rem;

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6rem;
    aspect-ratio: 1;
    background-color: #fff;
    border-radius: 1.5rem;

    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.03em;
  }
}
</style>
