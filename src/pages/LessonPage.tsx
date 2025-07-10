import { useEffect } from "react";
import SidebarNav from "../components/SidebarNav";
import Quiz from "../components/Quiz";
import { useLessonStore } from "../store/lessonStore";
import { renderLessonBlock } from "../utils/renderUtils";

export default function LessonPage() {
  const { lesson, setLesson } = useLessonStore();

  useEffect(() => {
    fetch("/child_psychology_tutoring_lesson.json")
      .then((res) => res.json())
      .then((data) => setLesson(data));
  }, [setLesson]);

  if (!lesson) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex">
      <SidebarNav />
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <p className="mb-4 text-gray-600">{lesson.description}</p>

        {lesson.content.map((block, index) => renderLessonBlock(block, index))}

        <Quiz questions={lesson.quiz} />
      </main>
    </div>
  );
}
