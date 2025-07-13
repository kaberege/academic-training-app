/* export interface LessonContentItem {
  id?: string;
  type: "heading" | "paragraph" | "list";
  level?: 1 | 2 | 3 | 4;
  text?: string;
  items?: string[];
  ordered?: boolean;
} */

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
  correctIndex: number;
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
