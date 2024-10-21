<script setup lang="ts">
import { onUnmounted, watchEffect } from "vue";

interface Props {
  visible: boolean;
  restartKey: "Enter" | "Tab" | "Escape";
}

interface Emits {
  (e: "restart"): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  restartKey: "Tab",
});

const onRestartPress = (event: KeyboardEvent) => {
  if (event.key === props.restartKey) {
    event.preventDefault();
    emit("restart");
  }
};

watchEffect(() => {
  if (props.visible) {
    window.addEventListener("keydown", onRestartPress);
  } else {
    window.removeEventListener("keydown", onRestartPress);
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", onRestartPress);
});
</script>

<template>
  <samp v-if="visible" class="restart"
    ><kbd class="restart__hot">{{ restartKey }}</kbd> to restart</samp
  >
</template>

<style scoped lang="scss">
.restart {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 10px;

  &__hot {
    background: darkgrey;
    padding: 2px 4px;
    border-radius: 4px;
  }
}
</style>
