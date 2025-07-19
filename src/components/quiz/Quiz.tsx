import { useLessonStore } from "../../store/lessonStore";
import { type QuizQuestion } from "../../interfaces/types";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const navigate = useNavigate();
  const { lesson } = useLessonStore();

  if (!lesson || !lesson.content)
    return <p className="p-4 text-center text-sm text-zinc-800">No content</p>;

  return (
    <div className="mt-1 pb-20">
      <h2 className="text-xl font-bold mb-4">Quiz</h2>
      {questions.map((q, i) => (
        <div key={q.questionId} className="mb-6">
          <p className="font-medium mb-2">
            {i + 1}. {q.question}
          </p>
          <ul className="space-y-1">
            {q.options.map((opt, j) => (
              <li key={j}>
                <label className="inline-flex items-center">
                  <input type="radio" name={`q-${i}`} className="mr-2" />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        onClick={() => navigate(`/lesson/${lesson.content.length - 1}`)}
        className="flex items-center justify-between space-x-1 border border-blue-600 bg-blue-100 text-zinc-900 hover:text-white text-base px-3 py-1.5 rounded hover:bg-blue-500 cursor-pointer"
      >
        <MdKeyboardDoubleArrowLeft size={23} />
        Back
      </button>
    </div>
  );
}
