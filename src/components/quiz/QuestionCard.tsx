import React, { useEffect, useState } from "react";
import { useLessonStore } from "../../store/lessonStore";
import type { QuizQuestion, OptionDetails } from "../../interfaces/types";

export default function QuestionCard() {
  const lesson = useLessonStore((state) => state.lesson);
  const setQuizState = useLessonStore((state) => state.setQuizState);
  const [myQuiz, setMyQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    null
  );
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [choiceDetails, setChoiceDetails] = useState<OptionDetails[]>([]);
  const [countTime, setCountTime] = useState<number>(0);
  const [leftTime, setLeftTime] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Fetch quiz questions
  useEffect(() => {
    if (lesson) {
      setMyQuiz(lesson.quiz);
    }
  }, [lesson]);

  // Timer for the quiz duration
  useEffect(() => {
    if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
      const timer = setTimeout(() => {
        setCountTime((prevCount) => prevCount + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [myQuiz, countTime]);

  // Timer for each question
  useEffect(() => {
    if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
      setLeftTime(60); // Reset timer to 60 seconds for each question
      const timer = setInterval(() => {
        setLeftTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit(); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [myQuiz, currentQuestionIndex]);

  // Update current question and history after the last question
  useEffect(() => {
    if (myQuiz.length > 0 && currentQuestionIndex === myQuiz.length) {
      myHistory();
      setQuizState("score");
    }
  }, [currentQuestionIndex]);

  // Set the current question based on the current index
  useEffect(() => {
    if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
      const myProgress = ((currentQuestionIndex + 1) / myQuiz.length) * 100;
      setProgress(myProgress);
      setCurrentQuestion(myQuiz[currentQuestionIndex]);
    }
  }, [myQuiz, currentQuestionIndex]);

  // Prepare answer options randomly
  useEffect(() => {
    if (!currentQuestion) return;
    if (Object.keys(currentQuestion).length > 0) {
      const randomAnswer = currentQuestion.correctAnswer;
      const currentChoices = currentQuestion.options.filter(
        (option) => option !== randomAnswer
      );
      const randomPosition = Math.floor(
        Math.random() * (currentChoices.length + 1)
      );
      currentChoices.splice(randomPosition, 0, randomAnswer);
      setAnswerOptions(currentChoices);
    }
  }, [currentQuestion]);

  //Keeping track of user selected answer
  const handleAnswer = (answer: string) => {
    setCurrentAnswer(answer);
  };

  //Setting history details on each quiz
  const myHistory = () => {
    const topicId = Date.now();
    const d = new Date(topicId);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short", // Full name of the day
      year: "numeric", // Numeric year
      month: "short", // Full name of the month
      day: "numeric", // Numeric day
      hour: "2-digit", // 2-digit hour
      minute: "2-digit", // 2-digit minute
      second: "2-digit", //2-digit second
      hour12: true, // 12-hour format
    };
    const formattedDate = d.toLocaleString("en-US", options);
    const topicScore = Math.round((score / myQuiz.length) * 100);
    const topicResults = {
      id: topicId,
      correct: score,
      questions: myQuiz.length,
      scored: topicScore,
      spent: handleTime(countTime),
      date: formattedDate,
      details: choiceDetails,
    };
    localStorage.setItem("history", JSON.stringify(topicResults)); // Storing quiz results to the local storage
  };

  //Function for tracking total used time
  const handleTime = (currentTime: number) => {
    const s = currentTime % 60;
    const m = Math.floor(currentTime / 60) % 60;
    const h = Math.floor(currentTime / 3600);
    const hours = h.toString().padStart(2, "0");
    const minutes = m.toString().padStart(2, "0");
    const seconds = s.toString().padStart(2, "0");
    const timeValue = `${hours}:${minutes}:${seconds}`;
    return timeValue;
  };

  //Function for navigating to the next question
  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault(); // Prevent default if the event is provided
    if (currentQuestion && currentQuestionIndex < myQuiz.length) {
      const correctAnswer = currentQuestion.correctAnswer;
      const optionDetails = {
        // Details of each question
        question: currentQuestion.question,
        options: answerOptions,
        choosed: currentAnswer,
        correct: correctAnswer,
        explanation: currentQuestion.explanation,
      };
      if (currentAnswer === correctAnswer) {
        setScore(score + 1);
      }
      setChoiceDetails((prev) => [...prev, optionDetails]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Convert seconds to time format to display time left
  const formatTime = (seconds: number) => {
    const s = seconds % 60;
    const m = Math.floor(seconds / 60);
    return {
      minutes: m.toString().padStart(2, "0"),
      seconds: s.toString().padStart(2, "0"),
    };
  };

  return (
    <>
      {currentQuestion && Object.keys(currentQuestion).length > 0 && (
        <div className="shadow-md shadow-slate-400 bg-slate-100 rounded px-1 py-2 sm:px-5 sm:py-5">
          <div className="text-right">
            <p className="text-xs font-bold">
              Time left:{" "}
              <span className="font-semibold text-red-500">{`${
                formatTime(leftTime).minutes
              }:${formatTime(leftTime).seconds}`}</span>
            </p>
          </div>
          <div
            className="w-full bg-gray-300 rounded-full h-3 shadow-sm cursor-pointer mt-4"
            title="Progress bar"
          >
            <div
              style={{ width: `${progress}%` }}
              className="text-white font-semibold text-xs flex items-center justify-center bg-blue-500 h-3 rounded-full transition-all duration-300 animate-pulse"
            >
              {progress}%
            </div>
          </div>
          <h2 className="text-sm text-blue-900 text-center font-semibold mt-4">
            Question: {currentQuestionIndex + 1}/{myQuiz.length}
          </h2>
          <h3 className="mt-2 text-lg text-zinc-800 ">
            <strong> {currentQuestion.question}</strong>
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col">
            {answerOptions.map((answer) => (
              <div key={answer} className="flex items-center mt-2">
                <input
                  id={answer}
                  type="radio"
                  name="choose"
                  value={answer}
                  checked={currentAnswer === answer}
                  onChange={() => handleAnswer(answer)}
                  className="mr-2"
                />
                <label htmlFor={answer} className="text-zinc-800">
                  {answer}
                </label>
              </div>
            ))}
            <button className="mt-4 w-28 cursor-pointer bg-blue-700 text-white font-medium p-1 mx-auto rounded transition hover:bg-blue-600">
              Next
            </button>
          </form>
        </div>
      )}
    </>
  );
}
