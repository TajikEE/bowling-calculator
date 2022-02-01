<template>
  <div>
    <h1>Bowling Calculator</h1>

    <div v-if="error">There was an error, please try again.</div>

    <RollButtons
      @rollValue="makeRoll($event)"
      :currentFrame="framesData.frames[framesData.currentFrameIndex]"
      :currentFrameIndex="framesData.currentFrameIndex"
      :gameover="framesData.gameover"
    />
    <div class="scorecard">
      <div v-for="frame in 10" :key="frame">
        <SingleFrame
          :frameNumber="frame"
          :frameData="framesData.frames[frame - 1]"
          :rollClicked="rollClicked"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SingleFrame from "../components/SingleFrame.vue";
import RollButtons from "../components/RollButtons.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: {
    SingleFrame,
    RollButtons,
  },
  data: ()=> ({
    rollClicked: 0
  }),
  computed: {
    ...mapState(["framesData", "error"]),
  },
  methods: {
    ...mapActions(["getFrameData", "addRollsInput"]),

    async makeRoll(roll) {
      this.rollClicked = roll
      this.addRollsInput(roll);
      await this.getFrameData();
    },
  },
};
</script>

<style scoped>
.scorecard {
  display: flex;
  border: 1px solid black;
  max-width: 66.1rem;
}
</style>
