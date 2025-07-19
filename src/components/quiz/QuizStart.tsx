import { useLessonStore } from "../../store/lessonStore";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";

export default function QuizStart() {
  const setQuizState = useLessonStore((state) => state.setQuizState);
  const lesson = useLessonStore((state) => state.lesson);
  const navigate = useNavigate();

  if (!lesson || !lesson.content)
    return <p className="p-4 text-center text-sm text-zinc-800">No content</p>;

  return (
    <div className="grow">
      <button
        onClick={() => navigate(`/lesson/${lesson.content.length - 1}`)}
        className="flex items-center justify-between space-x-1 border border-blue-600 bg-blue-100 text-zinc-900 hover:text-white text-base px-3 py-1.5 rounded hover:bg-blue-500 cursor-pointer"
      >
        <MdKeyboardDoubleArrowLeft size={23} />
        Back
      </button>
      <div className="text-center ">
        <h2 className="max-md:text-xl text-2xl font-semibold mb-4">
          Start Your Quiz
        </h2>
        <p className="text-gray-700 text-sm mb-4">
          This quiz is designed to assess your understanding after completing
          the course. A score of <strong>80% </strong> or higher is considered a
          pass. If you score below <strong>80% </strong>, you are encouraged to
          review the material and retake the quiz to improve your mastery.
        </p>
        <button
          type="button"
          onClick={() => setQuizState("quiz")}
          className="mt-4 bg-blue-700 cursor-pointer text-white p-1 w-28 rounded transition hover:bg-blue-600"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
