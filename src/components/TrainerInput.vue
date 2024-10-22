<script setup lang="ts">
import { ref, onMounted, onUpdated } from "vue";

interface Props {
  value: string;
}

interface Emits {
  (event: "keydown", value: KeyboardEvent): void;
  (event: "beforeinput", value: InputEvent): void;
  (event: "input", value: string | null): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

const inputNode = ref<HTMLInputElement>();

onMounted(() => {
  inputNode.value?.focus();
});

onUpdated(() => {
  inputNode.value?.setSelectionRange(0, 0);
});

const onKeyDown = (event: KeyboardEvent) => {
  emit("keydown", event);
};

const onBeforeInput = (_event: Event) => {
  const event = _event as InputEvent;
  emit("beforeinput", event);
};

const onInput = (event: Event) => {
  const pressedLetter = (event as InputEvent).data;
  emit("input", pressedLetter);
};
</script>

<template>
  <input
    ref="inputNode"
    class="field"
    autocomplete="off"
    :value="value"
    @input="onInput"
    @beforeinput="onBeforeInput"
    @keydown="onKeyDown"
    @paste.prevent=""
    @drop.prevent=""
    type="text"
  />
</template>

<style scoped lang="scss">
.field {
  border: 0;
}
</style>
