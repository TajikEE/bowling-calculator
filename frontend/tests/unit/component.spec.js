import { shallowMount } from "@vue/test-utils";
import RollButtons from "@/components/RollButtons.vue";

describe("RollButtons.vue", () => {
  const wrapper = shallowMount(RollButtons);
  test("does it exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the correct markup", () => {
    expect(wrapper.html()).toContain("Select a roll to play");
  });

  it("button click without correct sum", async () => {
    const wrapper = shallowMount(RollButtons);

    wrapper.vm.$emit("rollValue", 5);

    await wrapper.vm.$nextTick();

    // assert event has been emitted
    expect(wrapper.emitted().rollValue).toBeTruthy();

    // assert event count
    expect(wrapper.emitted().rollValue.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted().rollValue[0]).toEqual([5]);
  });
});
