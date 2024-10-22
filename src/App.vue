<script setup lang="ts">
import { computed, onUpdated, ref } from "vue";
import TestLetter, { type TestLetterProps } from "./components/TestLetter.vue";
import { WORDS } from "./constants/words.ts";
import RestartTest from "./components/RestartTest.vue";
import TestTooltip from "./components/TestTooltip.vue";

const initialValue = WORDS.join(" ");

const inputValue = ref(initialValue);
const letters = ref<TestLetterProps[]>([]);

const possibleToType = computed(() => !!inputValue.value.length);
const showTooltip = computed(() => letters.value.length === 0);

const inputRef = ref();

const onInput = (event: Event) => {
  if (!possibleToType.value) {
    event.preventDefault();
  }

  const pressedLetter = (event as InputEvent).data;
  const validLetter = inputValue.value[0];

  letters.value.push({
    value: pressedLetter ?? "",
    valid: validLetter === pressedLetter,
    correctValue: validLetter,
  });
  inputValue.value = inputValue.value.substring(1, inputValue.value.length);
};

const onKeyDown = (event: KeyboardEvent) => {
  if (
    !possibleToType.value ||
    event.key === "Backspace" ||
    event.key === "Tab" ||
    event.key === "Delete"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    const char = letters.value.pop();
    inputValue.value = char!.correctValue + inputValue.value;
  }
};

const onRestartTest = () => {
  letters.value = [];
  inputValue.value = initialValue;
};

onUpdated(() => {
  inputRef.value?.setSelectionRange(0, 0);
});
</script>

<template>
  <main class="test">
    <section class="test__container">
      <h1 class="test__title">Typing speed test</h1>
      <h2 class="test__subtitle">Test your typing skills</h2>

      <div class="test__trainer">
        <div class="test__letters">
          <TestLetter
            v-for="(letter, index) of letters"
            :key="letter.value + index"
            :value="letter.value"
            :correct-value="letter.correctValue"
            :valid="letter.valid"
          />
        </div>

        <input
          ref="inputRef"
          autocomplete="off"
          :value="inputValue"
          @input="onInput"
          @keydown="onKeyDown"
          @paste.prevent=""
          @drop.prevent=""
          type="text"
          class="test__field"
        />

        <TestTooltip v-if="showTooltip" class="test__tooltip" />
        <RestartTest
          class="test__restart"
          :visible="!possibleToType"
          @restart="onRestartTest"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.test {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #f6f6f7;
  background-image: url(https://res.cloudinary.com/dn1j6dpd7/image/upload/f_auto,q_auto/v1600423784/typing-speed-test/test-bg-left.png),
    url(https://res.cloudinary.com/dn1j6dpd7/image/upload/f_auto,q_auto/v1600423784/typing-speed-test/test-bg-right.png);
  background-size: 393px auto;
  background-position:
    calc(50% - 650px) 0,
    calc(50% + 650px) 0;
  background-repeat: repeat-y;

  &__container {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }

  &__title {
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    font-weight: 400;
    color: #4a4a56;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-size: 45px;
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.03em;
  }

  &__trainer {
    font-size: 2.5rem;

    position: relative;
    display: flex;
    align-items: center;
    height: 140px;
    margin-block: 5rem;
    border-radius: 0.5rem;

    background-color: #fff;
    box-shadow:
      0 9px 24px rgba(0, 0, 0, 0.12),
      0 9px 24px rgba(0, 0, 0, 0.12);
  }

  &__letters,
  &__field {
    max-width: 50%;
    width: 100%;
    font-weight: 600;
  }

  &__field {
    border: 0;
  }

  &__letters {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
  }

  &__tooltip {
    position: absolute;
    top: -0.5rem;
    left: 50%;
  }

  &__restart {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>
