import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import SidebarNav from "./SidebarNav";
import Quiz from "./Quiz";
import { useLessonStore } from "../store/lessonStore";
import ProgressBar from "./ProgressBar";
import OutlineBars from "./OutlineBars";
//import doc from "./assets/images/doc.png";
import hp from "../assets/images/hp.png";

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
    <section className="container mx-auto">
      <OutlineBars />
      <div className="container mx-auto">
        <div className="flex items-center justify-center space-x-2">
          <img src={hp} alt="Lesson title" className="h-7 sm:h-9 w-6 sm:w-8" />
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            <span>Lesson 1A: </span>
            {lesson.title}
          </h1>
        </div>
        <ProgressBar value={completedIds.size} max={sectionCount} />
      </div>
      <div className="flex">
        <SidebarNav />
        <div className="flex-1 sm:px-6 pb-6 max-w-3xl mx-auto">
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
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Next
              </button>
            </div>
          ) : (
            <div>
              <Quiz questions={lesson.quiz} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
