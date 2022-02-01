<template>
  <div class="root row">
    <div v-if="gameover">Game is over!</div>

    <div v-else>
      <div>Select a roll to play</div>
      <div class="row">
        <div
          class="row"
          v-for="button in calculateAvailableRolls"
          :key="button"
        >
          <button class="button" @click="$emit('rollValue', button - 1)">
            {{ button - 1 }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CONSTANTS } from "../constants";

export default Vue.extend({
  props: {
    currentFrame: {
      type: Object,
      default: () => ({}),
    },
    currentFrameIndex: {
      type: Number,
    },
    gameover: Boolean,
  },
  computed: {
    CONSTANTS: () => CONSTANTS,

    calculateAvailableRolls() {
      let remainingRoll;

      if (!this.currentFrame) return this.CONSTANTS.TOTAL_FRAME_NUMBERS;

      if (this.currentFrame) {
        const firstRoll = this.currentFrame.rolls
          ? this.currentFrame.rolls[0]
          : 0;
        const secondRoll = this.currentFrame.rolls
          ? this.currentFrame.rolls[1]
          : 0;

        if (this.currentFrameIndex === 9) {
          if (firstRoll === this.CONSTANTS.STRIKE_ROLL) {
            remainingRoll = this.CONSTANTS.TOTAL_FRAME_NUMBERS;
          } else if (firstRoll < this.CONSTANTS.STRIKE_ROLL) {
            remainingRoll = this.CONSTANTS.TOTAL_FRAME_NUMBERS - firstRoll;
          }
          if (secondRoll === this.CONSTANTS.STRIKE_ROLL) {
            remainingRoll = this.CONSTANTS.TOTAL_FRAME_NUMBERS;
          }
          if (secondRoll < this.CONSTANTS.STRIKE_ROLL) {
            remainingRoll = this.CONSTANTS.TOTAL_FRAME_NUMBERS - secondRoll;
          }
          if (firstRoll + secondRoll === this.CONSTANTS.STRIKE_ROLL) {
            remainingRoll = this.CONSTANTS.TOTAL_FRAME_NUMBERS;
          }
        } else {
          remainingRoll = this.CONSTANTS.TOTAL_FRAME_NUMBERS - firstRoll;
        }
      }
      return remainingRoll;
    },
  },
});
</script>

<style scoped lang="scss">
.root {
  padding-bottom: 1rem;
}

.row {
  display: flex;
}

.button {
  margin-right: 0.5rem;
  background: #fff;
  border: 1px solid black;
  cursor: pointer;
  padding: 0.5rem;
  width: 2rem;

  &:hover {
    background: cadetblue;
  }
}
</style>
