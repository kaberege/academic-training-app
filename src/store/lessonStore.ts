import { create } from "zustand";

export interface Section {
  title: string;
  blocks: {
    type: "paragraph" | "list";
    text?: string;
    items?: string[];
    ordered?: boolean;
  }[];
}

export interface LessonData {
  lessonId: string;
  title: string;
  description: string;
  sections: Section[];
  quiz: any[];
}

interface LessonState {
  lesson: LessonData | null;
  completedIds: Set<number>;
  setLesson: (lesson: LessonData) => void;
  markComplete: (id: number) => void;
}

export const useLessonStore = create<LessonState>((set) => ({
  lesson: null,
  completedIds: new Set(),
  setLesson: (lesson) => set({ lesson }),
  markComplete: (id) =>
    set((s) => {
      const updated = new Set(s.completedIds);
      updated.add(id);
      return { completedIds: updated };
    }),
}));
