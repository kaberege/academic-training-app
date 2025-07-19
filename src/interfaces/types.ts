interface ListItem {
  type: "list";
  ordered: boolean;
  items: string[];
}
interface ParagraphItem {
  type: "paragraph";
  text: string;
}
type ContentItem = ParagraphItem | ListItem;

interface ContentBlock {
  level?: number;
  title: string;
  items: ContentItem[];
}

export interface QuizQuestion {
  questionId: string;
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface LessonData {
  lessonId: string;
  title: string;
  audience: string;
  description: string;
  objectives: string[];
  content: ContentBlock[];
  quiz: QuizQuestion[];
}

export interface OptionDetails {
  question: string;
  options: string[];
  choosed: string;
  correct: string;
  explanation: string;
}

export interface QuizResultsHistory {
  id: number;
  correct: number;
  questions: number;
  scored: number;
  spent: string;
  date: string;
  details: OptionDetails[];
}
