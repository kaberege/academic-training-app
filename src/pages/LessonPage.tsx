import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import SidebarNav from "../components/SidebarNav";
import Quiz from "../components/Quiz";
import { useLessonStore } from "../store/lessonStore";
import ProgressBar from "../components/ProgressBar";

export default function LessonPage() {
  const { lesson, setLesson, markComplete, completedIds } = useLessonStore();
  const { sectionIndex } = useParams();
  const navigate = useNavigate();
  const currentIndex = parseInt(sectionIndex || "0", 10);

  useEffect(() => {
    fetch("/child_psychology_tutoring_lesson.json")
      .then((res) => res.json())
      .then((data) => setLesson(data));
  }, [setLesson]);

  if (!lesson || !lesson.sections) return <p className="p-4">Loading...</p>;

  const sectionCount = lesson.sections.length + 1;
  const isQuiz = currentIndex === lesson.sections.length;

  const validSection =
    !isNaN(currentIndex) &&
    currentIndex >= 0 &&
    currentIndex <= lesson.sections.length;
  if (!validSection)
    return <p className="p-4 text-red-600">Invalid lesson section.</p>;

  return (
    <div className="flex">
      <SidebarNav />
      <main className="flex-1 p-6 max-w-3xl mx-auto">
        <ProgressBar value={completedIds.size} max={sectionCount} />
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <p className="mb-6 text-gray-600">{lesson.description}</p>

        {!isQuiz ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {lesson.sections[currentIndex].title}
            </h2>
            {lesson.sections[currentIndex].blocks.map((block, i) => {
              if (block.type === "paragraph")
                return (
                  <p key={i} className="mb-4 text-gray-700">
                    {block.text}
                  </p>
                );
              if (block.type === "list")
                return block.ordered ? (
                  <ol key={i} className="list-decimal ml-6 space-y-1">
                    {block.items?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul key={i} className="list-disc ml-6 space-y-1">
                    {block.items?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                );
            })}
            <button
              onClick={() => {
                markComplete(currentIndex);
                navigate(`/lesson/${currentIndex + 1}`);
              }}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <Quiz questions={lesson.quiz} />
          </div>
        )}
      </main>
    </div>
  );
}
