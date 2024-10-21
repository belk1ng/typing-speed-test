<script setup lang="ts">
import { computed, onUpdated, ref } from "vue";
import TestLetter, { type TestLetterProps } from "./components/TestLetter.vue";
import { WORDS } from "./constants/words.ts";
import RestartTest from "./components/RestartTest.vue";

const initialValue = WORDS.join(" ");

const inputValue = ref(initialValue);
const letters = ref<TestLetterProps[]>([]);

const possibleToType = computed(() => !!inputValue.value.length);

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
  if (!possibleToType.value) {
    event.preventDefault();
  }

  if (event.key === "Backspace" && letters.value.length) {
    const char = letters.value.pop();
    inputValue.value = char!.correctValue + inputValue.value;
  } else if (event.key === "Tab") {
    event.preventDefault();
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
          @input="onInput"
          @keydown="onKeyDown"
          :value="inputValue"
          type="text"
          class="test__field"
        />
      </div>

      <RestartTest
        class="test__restart"
        :visible="!possibleToType"
        @restart="onRestartTest"
      />
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
    position: relative;
    width: 80%;
    margin: 0 auto;
  }

  &__trainer {
    font-size: 2.5rem;
    font-weight: 600;

    display: flex;
    align-items: center;
    height: 140px;
    overflow: hidden;
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
  }

  &__field {
    border: 0;
  }

  &__letters {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__restart {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
}
</style>
