<script setup lang="ts">
import { ref, watchEffect } from "vue";
import TrainerLetter, {
  type TrainerLetterProps,
} from "./components/TrainerLetter.vue";
import TrainerRestart from "./components/TrainerRestart.vue";
import TrainerTooltip from "./components/TrainerTooltip.vue";
import TrainerTimer from "./components/TrainerTimer.vue";
import TrainerInput from "./components/TrainerInput.vue";
import TrainerMetric from "./components/TrainerMetric.vue";

const pressedLetters = ref<TrainerLetterProps[]>([]);

const timerComponent = ref();
const inputComponent = ref();

const testStarted = ref(false);
const keyDelta = ref(0);

watchEffect(() => {
  const minimalLettersInDOM = 110;
  const delta = 10;

  if (pressedLetters.value.length >= minimalLettersInDOM) {
    pressedLetters.value.splice(0, delta);
    keyDelta.value += delta;
  }
});

const onStartTest = () => {
  testStarted.value = true;
  timerComponent.value.onStartTimer();
};

const onTestTimeout = () => {
  testStarted.value = false;
};

const onRestartTest = () => {
  pressedLetters.value = [];
  inputComponent.value.onRestartTest();
  timerComponent.value.onResetTimer();
};

const onRemoveLetter = () => {
  return pressedLetters.value.pop();
};

const onPush = (pressedLetter: TrainerLetterProps) => {
  pressedLetters.value.push(pressedLetter);
};
</script>

<template>
  <main class="test">
    <section class="test__container">
      <h1 class="test__title">Typing speed test</h1>
      <h2 class="test__subtitle">Test your typing skills</h2>

      <div class="test__info">
        <TrainerTimer
          class="test__timer"
          ref="timerComponent"
          @timeout="onTestTimeout"
        />

        <div class="test__metrics">
          <TrainerMetric name="words/min" :value="0" />
          <TrainerMetric name="chars/min" :value="0" />
          <TrainerMetric name="% accuracy" :value="0" />
        </div>
      </div>

      <div class="test__trainer">
        <div class="test__letters">
          <TrainerLetter
            v-for="(letter, index) of pressedLetters"
            :key="keyDelta + index + letter.value"
            :value="letter.value"
            :correct-value="letter.correctValue"
          />
        </div>

        <TrainerInput
          ref="inputComponent"
          class="test__field"
          :test-started="testStarted"
          :dirty="!!pressedLetters.length"
          :on-remove-letter="onRemoveLetter"
          @push="onPush"
          @start-test="onStartTest"
        />

        <TrainerTooltip
          v-if="!testStarted && !pressedLetters.length"
          class="test__tooltip"
        >
          Start typing
        </TrainerTooltip>
        <TrainerRestart
          class="test__restart"
          :visible="!testStarted && !!pressedLetters.length"
          @restart="onRestartTest"
          restart-key="Tab"
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

  ::selection {
    background-color: #ffd000;
  }

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
    margin-bottom: 1.5rem;
  }

  &__info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
  }

  &__timer {
    margin-top: -1.5rem;
  }

  &__metrics {
    display: flex;
    gap: 10px;
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
