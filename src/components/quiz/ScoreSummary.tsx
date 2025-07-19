import { useEffect, useState } from "react";
import { type QuizResultsHistory } from "../../interfaces/types";
import { useLessonStore } from "../../store/lessonStore";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";

// Displays the score summary after the quiz
export default function ScoreSummary() {
  const lesson = useLessonStore((state) => state.lesson);
  const navigate = useNavigate();

  const [details, setDetails] = useState<QuizResultsHistory | null>(null);
  const setQuizState = useLessonStore((state) => state.setQuizState);

  useEffect(() => {
    const historyDetails = localStorage.getItem("history"); // Fetching quiz history from local storage
    const data: QuizResultsHistory = historyDetails
      ? JSON.parse(historyDetails)
      : [];
    setDetails(data);
  }, []);

  //Function for retaking the quiz
  const retakeQuiz = () => {
    setQuizState("quiz");
  };

  if (!details)
    return (
      <p className="text-center text-zinc-800 text-sm">
        There is no quiz details
      </p>
    );

  if (!lesson || !lesson.content)
    return <p className="p-4 text-center text-sm text-zinc-800">No content</p>;

  return (
    <div>
      <div className="mb-4">
        <div className="text-sm text-zinc-800">
          <p>
            <strong>Correct Answers:</strong> {details.correct} out of{" "}
            {details.questions}
          </p>
          <p className={`${details.scored < 80 && "text-red-600"}`}>
            <strong>Score:</strong> {details.scored}%
          </p>
          <p>
            <strong>Time Spent:</strong> {details.spent}
          </p>
          <p>
            <strong>Date:</strong> {details.date}
          </p>
        </div>

        <h3 className="mt-5 text-xl font-semibold">Questions:</h3>
        <div className="mt-2">
          {details.details.map((item, index) => (
            <div
              key={index}
              className="mb-4 max-sm:p-2 p-3 border border-gray-200 shadow-md rounded bg-gray-100"
            >
              <p className="font-medium">
                {index + 1}. {item.question && item.question}
              </p>
              <p className="mt-1 text-sm">
                <strong>Your Answer:</strong>{" "}
                <em className="tex-xs">{item.choosed && item.choosed}</em>
                {item.choosed === item.correct ? (
                  <span className="text-green-700"> (Correct)</span>
                ) : (
                  <span className="text-red-600"> (Incorrect)</span>
                )}
              </p>
              <p className="mt-2 text-zinc-800">
                <strong>Options:</strong>
              </p>
              <ul className="list-disc list-inside">
                {item.options.map((option, idx) => (
                  <li
                    key={idx}
                    className={` ${
                      option === item.correct
                        ? "text-green-600"
                        : "text-gray-600"
                    } p-1`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <h3 className="text-sm text-amber-600">Explanation:</h3>
                <p className="text-xs text-zinc-500">
                  <strong>{item.explanation}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
        {details.scored < 80 && (
          <div className="flex justify-end">
            <button
              onClick={retakeQuiz}
              className="bg-blue-700 text-sm text-white font-medium py-1 px-2 rounded transition duration-300 hover:bg-blue-600 cursor-pointer"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
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
