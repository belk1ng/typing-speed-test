<script setup lang="ts">
import { ref, onUnmounted } from "vue";

interface Props {
  seconds?: number;
}

interface Expose {
  onStartTimer: () => void;
  onResetTimer: () => void;
  getCurrentTime: () => number;
}

interface Emits {
  (e: "timeout"): void;
}

const props = withDefaults(defineProps<Props>(), {
  seconds: 60,
});

const emit = defineEmits<Emits>();

const size = 106;
const radius = size / 2 - 10;
const circumference = 2 * Math.PI * radius;

const animationDuration = `${props.seconds}s`;

const time = ref(props.seconds);
const interval = ref<number | undefined>();

const onStartTimer = () => {
  interval.value = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      emit("timeout");
      clearInterval(interval.value);
    }
  }, 1000);
};

const onStopTimer = () => {
  clearInterval(interval.value);
};

const getCurrentTime = () => {
  return props.seconds - time.value;
};

const onResetTimer = () => {
  onStopTimer();
  interval.value = undefined;
  time.value = props.seconds;
};

onUnmounted(() => {
  onStopTimer();
});

defineExpose<Expose>({
  onStartTimer,
  onResetTimer,
  getCurrentTime,
});
</script>

<template>
  <div class="timer">
    <svg class="timer__svg" :width="size" :height="size">
      <circle
        class="timer__circle"
        :class="{ 'timer__circle--active': !!interval }"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="#fff"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        stroke-width="3"
      />
    </svg>

    <div class="timer__indicator">
      <span class="timer__seconds">{{ time }}</span>
      <span>seconds</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes animate-stroke {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: v-bind(circumference);
  }
}

.timer {
  position: relative;
  color: #fff;

  &__indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;

    font-size: 12px;
    color: #000000;

    * {
      line-height: 1;
    }
  }

  &__seconds {
    font-size: 30px;
    line-height: 1;
    font-weight: 600;
  }

  &__circle {
    stroke: #ffd000;

    &--active {
      animation: animate-stroke v-bind(animationDuration) linear forwards;
    }
  }
}
</style>
