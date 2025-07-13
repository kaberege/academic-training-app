import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import SidebarNav from "./SidebarNav";
import Quiz from "./Quiz";
import { useLessonStore } from "../store/lessonStore";
import ProgressBar from "./ProgressBar";
import OutlineBars from "./OutlineBars";
import doc from "../assets/images/doc.png";
import hp from "../assets/images/hp.png";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LiaArrowsAltSolid } from "react-icons/lia";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

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

  if (!lesson || !lesson.content)
    return <p className="p-4 text-center text-sm text-zinc-800">Loading...</p>;

  const sectionCount = lesson.content.length + 1;
  const isQuiz = currentIndex === lesson.content.length;

  const validSection =
    !isNaN(currentIndex) &&
    currentIndex >= 0 &&
    currentIndex <= lesson.content.length;
  if (!validSection)
    return (
      <p className="p-4 text-red-600 text-center text-sm">
        Invalid lesson section.
      </p>
    );

  function handleNavigation(key: string): void {
    if (!lesson || !lesson.content) {
      return;
    }

    let navIndex: number;
    if (key === "increment") {
      navIndex =
        currentIndex < lesson.content.length
          ? currentIndex + 1
          : lesson.content.length;
      navigate(`/lesson/${navIndex}`);
      return;
    }
    if (key === "decrement") {
      navIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      navigate(`/lesson/${navIndex}`);
      return;
    }
  }

  return (
    <section className="container mx-auto">
      <OutlineBars />
      <div className="container mx-auto">
        <div className="flex items-center justify-center space-x-2">
          <img src={hp} alt="Lesson title" className="h-7 sm:h-9 w-6 sm:w-8" />
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-zinc-800">
            <span>Lesson 1A: </span>
            {lesson.title}
          </h1>
        </div>
        <ProgressBar value={currentIndex} max={sectionCount} />
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center justify-center space-x-2">
            <img
              src={doc}
              alt="Current section"
              className="h-7 sm:h-9 w-6 sm:w-8"
            />
            <h2 className="text-lg text-zinc-800 sm:text-xl font-bold">
              {!isQuiz ? lesson.content[currentIndex].title : "Quiz"}
            </h2>
          </div>
          <div className="hidden sm:flex items-center space-x-8">
            <div className="text-base font-bold text-blue-700">
              {currentIndex + 1}
              <span className="text-zinc-700">/</span>
              {sectionCount}
            </div>
            <div className="flex items-center space-x-3 text-blue-700">
              <span
                onClick={() => handleNavigation("decrement")}
                className="p-2 bg-zinc-200 cursor-pointer hover:bg-zinc-400 transition-colors"
                title="Previous"
              >
                <IoIosArrowBack
                  size={20}
                  className={`${
                    currentIndex < lesson.content.length && "text-blue-400"
                  }`}
                />
              </span>
              <span
                onClick={() => handleNavigation("increment")}
                className="p-2 bg-zinc-200 cursor-pointer hover:bg-zinc-400 transition-colors"
                title="Next"
              >
                <IoIosArrowForward
                  size={20}
                  className={`${
                    currentIndex == lesson.content.length && "text-blue-400"
                  }`}
                />
              </span>
              <span className="p-2 bg-zinc-200 hover:bg-zinc-400 transition-colors">
                <LiaArrowsAltSolid size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <SidebarNav />
        <div className="flex-1 sm:px-6 max-w-3xl mx-auto">
          {!isQuiz ? (
            <div className="pb-8">
              {lesson.content[currentIndex].items.map((block, i) => {
                if (block.type === "paragraph")
                  return (
                    <p key={i} className="mb-2 text-zinc-700">
                      {block.text}
                    </p>
                  );

                if (block.type === "list")
                  return block.ordered ? (
                    <ol
                      key={i}
                      className="list-decimal ml-6 space-y-1 text-zinc-800"
                    >
                      {block.items?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul
                      key={i}
                      className="list-disc ml-6 space-y-1 text-zinc-800"
                    >
                      {block.items?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  );
              })}
              <div
                className={`flex items-center justify-between mt-6 ${
                  currentIndex === 0 && "justify-end"
                }`}
              >
                {currentIndex !== 0 && (
                  <button
                    onClick={() => {
                      handleNavigation("decrement");
                    }}
                    className="flex items-center justify-between space-x-1 border border-blue-600 bg-blue-100 text-zinc-900 hover:text-white text-base px-3 py-1.5 rounded hover:bg-blue-500 cursor-pointer"
                  >
                    <MdKeyboardDoubleArrowLeft size={23} />
                    Back
                  </button>
                )}
                <div>
                  {!completedIds.has(currentIndex) ? (
                    <button
                      onClick={() => {
                        markComplete(currentIndex);
                        handleNavigation("increment");
                      }}
                      className="bg-orange-600 text-white text-base px-3 py-1.5 rounded hover:bg-orange-800 cursor-pointer"
                    >
                      Mark as complete
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleNavigation("increment");
                      }}
                      className="flex items-center justify-between space-x-1 border border-blue-600 bg-blue-100 text-zinc-900 hover:text-white text-base px-3 py-1.5 rounded hover:bg-blue-500 cursor-pointer"
                    >
                      Next
                      <MdKeyboardDoubleArrowRight size={23} />
                    </button>
                  )}
                </div>
              </div>
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
