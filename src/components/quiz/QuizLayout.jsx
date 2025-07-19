import React from "react";
import QuizStart from "./QuizStart";
import QuestionCard from "./QuestionCard";
import ScoreSummary from "./ScoreSummary";
import useQuizStore from "../stateStore/QuizStore";

const QuizLayout = () => {
  const currentState = useQuizStore((state) => state.quizState);

  return (
    <div className="max-w-2xl m-auto flex justify-center items-center">
      {currentState === "start" && <QuizStart />}
      {currentState === "quiz" && <QuestionCard />}
      {currentState === "score" && <ScoreSummary />}
    </div>
  );
};

export default QuizLayout;
