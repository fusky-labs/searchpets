import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", () => {
  const years = ref([]);
  const characters = ref([]);

  return { years, characters };
});
