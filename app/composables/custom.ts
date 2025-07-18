import { reactive } from "vue";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCustom = () => {
  const data = reactive({ loading: false });

  const onChange = (val: boolean) => {
    data.loading = val;
  };
  return {
    data,
    onChange,
  };
};

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
