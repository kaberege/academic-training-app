export interface LessonContentItem {
  type: "heading" | "paragraph" | "list";
  level?: 1 | 2 | 3;
  text?: string;
  items?: string[];
  ordered?: boolean;
}

export interface QuizQuestion {
  questionId: string;
  type: "multiple-choice";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonData {
  lessonId: string;
  title: string;
  audience: string;
  description: string;
  objectives: string[];
  content: LessonContentItem[];
  quiz: QuizQuestion[];
}
