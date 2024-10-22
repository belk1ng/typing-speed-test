<script setup lang="ts"></script>

<template>
  <div class="test-tooltip">Start typing</div>
</template>
<style scoped lang="scss">
@keyframes pulse {
  0% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, -1rem);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

.test-tooltip {
  position: relative;
  z-index: 1;

  font-size: 1rem;
  padding: 0.25em 0.75em 0.125em;
  border-radius: 0.25em;

  background-color: #ffd000;
  color: #1b1b20;
  animation: pulse 1.2s infinite ease-out;

  &::after {
    position: absolute;
    z-index: -1;
    content: "";
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    aspect-ratio: 1;
    background-color: #ffd000;
  }
}
</style>
