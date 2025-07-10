import { create } from "zustand";
import { type LessonData } from "../types";

interface LessonState {
  lesson: LessonData | null;
  setLesson: (lesson: LessonData) => void;
}

export const useLessonStore = create<LessonState>((set) => ({
  lesson: null,
  setLesson: (lesson) => set({ lesson }),
}));
