import { useEffect } from "react";
import QuizStart from "./QuizStart";
import QuestionCard from "./QuestionCard";
import ScoreSummary from "./ScoreSummary";
import { useLessonStore } from "../../store/lessonStore";
import { type QuizResultsHistory } from "../../interfaces/types";

const QuizLayout = () => {
  const currentState = useLessonStore((state) => state.quizState);
  const setQuizState = useLessonStore((state) => state.setQuizState);

  // Logic to redirect user to ScoreSummary if already done the quiz
  useEffect(() => {
    const historyDetails = localStorage.getItem("history"); // Fetching quiz history from local storage
    const data: QuizResultsHistory = historyDetails
      ? JSON.parse(historyDetails)
      : null;
    if (data) setQuizState("score");
  }, []);

  return (
    <div className="w-full max-w-2xl m-auto flex justify-center items-center pb-10">
      {currentState === "start" && <QuizStart />}
      {currentState === "quiz" && <QuestionCard />}
      {currentState === "score" && <ScoreSummary />}
    </div>
  );
};

export default QuizLayout;
