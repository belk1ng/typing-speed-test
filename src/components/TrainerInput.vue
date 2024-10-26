<script setup lang="ts">
import { ref, onMounted, onUpdated, watchEffect } from "vue";
import type { TrainerLetterProps } from "./TrainerLetter.vue";
import { generateTypingWords } from "../utils";

interface Props {
  testStarted: boolean;
  dirty: boolean;
  onRemoveLetter: () => TrainerLetterProps | undefined;
}

interface Emits {
  (event: "startTest"): void;
  (event: "push", payload: TrainerLetterProps): void;
}

interface Expose {
  onRestartTest: () => void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const textToType = ref("");
const node = ref<HTMLInputElement>();

onMounted(() => {
  textToType.value = generateTypingWords(100);
  node.value?.setSelectionRange(0, 0);
});

onUpdated(() => {
  node.value?.setSelectionRange(0, 0);
});

watchEffect(() => {
  if (textToType.value.length <= 150) {
    textToType.value = textToType.value + generateTypingWords(100);
  }
});

const onKeyDown = (event: KeyboardEvent) => {
  const isForbidden =
    event.key === "Delete" ||
    event.key === "Escape" ||
    event.key === "CapsLock" ||
    event.key === "Tab" ||
    event.key === "Shift" ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey;

  const isTrainerInInitialState =
    !props.testStarted && !isForbidden && !props.dirty;
  const isInvalidCharacterPressed = props.testStarted && isForbidden;

  if (isTrainerInInitialState) {
    emit("startTest");
  } else if (isInvalidCharacterPressed || !props.testStarted) {
    event.preventDefault();
  }
};

const onBeforeInput = (_event: Event) => {
  const event = _event as InputEvent;

  const isBackspacePressed = event.inputType === "deleteContentBackward";

  if (!event.data && !isBackspacePressed) {
    event.preventDefault();
    return;
  } else if (isBackspacePressed) {
    const char = props.onRemoveLetter();

    if (char) {
      textToType.value = char!.correctValue + textToType.value;
    }
  }
};

const onInput = (event: Event) => {
  const validLetter = textToType.value[0];

  emit("push", {
    value: (event as InputEvent).data ?? "",
    correctValue: validLetter,
  });

  textToType.value = textToType.value.substring(1, textToType.value.length);
};

const onRestartTest = () => {
  textToType.value = generateTypingWords(100);
};

defineExpose<Expose>({
  onRestartTest,
});
</script>

<template>
  <input
    ref="node"
    class="field"
    type="text"
    autocomplete="off"
    spellcheck="false"
    :value="textToType"
    @input="onInput"
    @beforeinput="onBeforeInput"
    @keydown="onKeyDown"
    @paste.prevent=""
    @drop.prevent=""
  />
</template>

<style scoped lang="scss">
.field {
  border: 0;
}
</style>
