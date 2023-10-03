import create from "zustand";
import produce from "immer";

const useStore = create((set) => ({
  isEnglish: true,
  setEnglish: (payload) =>
    set(
      produce((state) => {
        state.isEnglish = payload;
      })
    ),
}));

export default useStore;
