<template>
  <div class="root">
    <div class="header center">{{ frameNumber }}</div>

    <div class="attempt-row">
      <div class="margin-auto">
        {{ firstRoll }}
      </div>
      <div
        :class="{
          ['attempt-two']: true,
          ['narrow-box']: frameNumber === CONSTANTS.LAST_FRAME,
        }"
      >
        {{ showSpare || secondRoll }}
      </div>

      <div
        v-if="frameNumber === CONSTANTS.LAST_FRAME"
        :class="{
          ['attempt-two']: true,
          ['narrow-box']: frameNumber === CONSTANTS.LAST_FRAME,
        }"
      >
        {{
          frameData && frameData.rolls[2]
            ? frameData.rolls[2] === CONSTANTS.STRIKE_ROLL
              ? "X"
              : frameData.rolls[2]
            : 0
        }}
      </div>
    </div>

    <div class="center">
      {{ frameData && frameData.sum ? frameData.sum : 0 }}
    </div>
  </div>
</template>

<script lang="ts">
import { CONSTANTS } from "../constants";

export default {
  name: "SingleFrame",
  props: {
    frameNumber: {
      type: Number,
      default: 1,
    },
    frameData: {},
    rollClicked: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    CONSTANTS: () => CONSTANTS,

    firstRoll() {
      if (!this.frameData || !this.frameData.rolls[0]) return 0;
      return this.frameData.rolls[0] === CONSTANTS.STRIKE_ROLL
        ? "X"
        : this.frameData.rolls[0];
    },

    secondRoll() {
      if (!this.frameData || !this.frameData.rolls[1]) return 0;
      return this.frameData.rolls[1] === CONSTANTS.STRIKE_ROLL
        ? "X"
        : this.frameData.rolls[1];
    },

    showSpare() {
      if (!this.frameData || !this.frameData.rolls[1]) return false;
      const isSpare = this.frameData.rolls[0] + this.frameData.rolls[1] === 10;
      return isSpare ? "/" : false;
    },
  },
};
</script>

<style scoped lang="scss">
.root {
  width: 100%;
  max-width: 6.5rem;
  min-width: 6.5rem;
  border: 1px solid black;
}

.header {
  background-color: burlywood;
}
.attempt-row {
  display: flex;
  justify-content: space-between;
}

.attempt-two {
  padding: 1rem;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}

.narrow-box {
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}

.center {
  text-align: center;
}

.margin-auto {
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
