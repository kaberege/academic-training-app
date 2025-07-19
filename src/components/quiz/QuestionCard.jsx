import { useEffect, useState } from "react";
import { FaRedo } from "react-icons/fa";
import { useLessonStore } from "../../store/lessonStore";
import { QuizQuestion } from "../../interfaces/types";

export default function QuestionCard() {
  const { lesson } = useLessonStore((state) => state.lesson);
  const setQuizState = useQuizStore((state) => state.setQuizState);
  const quizLoader = useQuizStore((state) => state.quizLoader);
  const [myQuiz, setMyQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answerOptions, setAnswerOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [choiceDetails, setChoiceDetails] = useState([]);
  const [countTime, setCountTime] = useState(0);
  const [leftTime, setLeftTime] = useState(60);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [progress, setProgress] = useState(0);

  // Fetch quiz questions if the loader is true
  useEffect(() => {
    if (quizLoader && lesson) {
      setMyQuiz(lesson.quiz);
    }
  }, [quizLoader]);

  // Timer for the quiz duration
  useEffect(() => {
    if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
      const timer = setTimeout(() => {
        setCountTime((prevCount) => prevCount + 1); // Calling handleTime with the updated value
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [myQuiz, countTime]); // Run effect when quiz or countTime changes

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
    if (Object.keys(currentQuestion).length > 0) {
      const randomAnswer = currentQuestion.correct_answer;
      const currentChoices = [...currentQuestion.incorrect_answers];
      const randomPosition = Math.floor(
        Math.random() * (currentChoices.length + 1)
      );
      currentChoices.splice(randomPosition, 0, randomAnswer);
      setAnswerOptions(currentChoices);
    }
  }, [currentQuestion]);

  //Keeping track of user selected answer
  const handleAnswer = (answer) => {
    setCurrentAnswer(answer);
  };

  //Setting history details on each quiz
  const myHistory = () => {
    const { category, difficulty } = currentQuestion;
    const topicId = Date.now();
    const d = new Date(topicId);
    const options = {
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
      topic: category,
      level:
        difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase(),
      correct: score,
      questions: myQuiz.length,
      scored: topicScore,
      spent: handleTime(countTime),
      date: formattedDate,
      details: choiceDetails,
    };
    const localArr = JSON.parse(localStorage.getItem("history")) || [];
    localArr.push(topicResults);
    localStorage.setItem("history", JSON.stringify(localArr)); // Storing quiz results to the local storage
  };

  //Function for tracking total used time
  const handleTime = (currentTime) => {
    let s = currentTime % 60;
    let m = Math.floor(currentTime / 60) % 60;
    let h = Math.floor(currentTime / 3600);
    const hours = h.toString().padStart(2, "0");
    const minutes = m.toString().padStart(2, "0");
    const seconds = s.toString().padStart(2, "0");
    const timeValue = `${hours}:${minutes}:${seconds}`;
    return timeValue;
  };

  //Function for navigating to the next question
  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Prevent default if the event is provided
    if (currentQuestionIndex < myQuiz.length) {
      const correctAnswer = currentQuestion.correct_answer;
      const optionDetails = {
        // Details of each question
        question: currentQuestion.question,
        options: answerOptions,
        choosed: currentAnswer,
        correct: correctAnswer,
      };
      if (currentAnswer === correctAnswer) {
        setScore(score + 1);
      }
      setChoiceDetails((prev) => [...prev, optionDetails]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Convert seconds to time format to display time left
  const formatTime = (seconds) => {
    const s = seconds % 60;
    const m = Math.floor(seconds / 60);
    return {
      minutes: m.toString().padStart(2, "0"),
      seconds: s.toString().padStart(2, "0"),
    };
  };

  return (
    <div className="max-sm:p-0 p-5">
      {loading && (
        <p className="text-lg text-center dark:text-slate-300">
          Loading questions<span className="animate-ping">...</span>
        </p>
      )}
      {loadError && !Object.keys(currentQuestion).length > 0 && (
        <div className="text-center">
          <p className="text-red-500">{loadError}</p>
          <button
            onClick={handleFetch}
            className="flex items-center mx-auto cursor-pointer underline mt-3 text-blue-500 transition hover:text-blue-300"
          >
            <FaRedo className="text-sm mr-1" />
            Retry
          </button>
        </div>
      )}
      {Object.keys(currentQuestion).length > 0 && (
        <div className="shadow rounded max-sm:p-1 p-5 dark:bg-stone-700 transition duration-300">
          <div className="text-right">
            <p className="dark:text-slate-300">
              Time Remaining:{" "}
              <span className="font-semibold text-red-500">{`${
                formatTime(leftTime).minutes
              }:${formatTime(leftTime).seconds}`}</span>
            </p>
          </div>
          <div
            className="w-full bg-gray-300 rounded-full h-4 shadow-sm cursor-pointer mt-6"
            title="Progress bar"
          >
            <div
              style={{ width: `${progress}%` }}
              className="text-white font-semibold text-sm flex items-center justify-center bg-blue-500 h-4 rounded-full transition-all duration-300 animate-pulse"
            >
              {parseInt(progress)}%
            </div>
          </div>
          <h2 className="text-xl text-center font-semibold dark:text-slate-50 mt-6">
            Question: {currentQuestionIndex + 1}/{myQuiz.length}
          </h2>
          <h3 className="mt-2 text-lg dark:text-slate-300">
            {currentQuestion.question}
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
                <label
                  htmlFor={answer}
                  className="border rounded p-1 bg-slate-500 text-white cursor-pointer"
                >
                  {answer}
                </label>
              </div>
            ))}
            <button className="mt-4 w-28 cursor-pointer bg-blue-500 text-white p-1 mx-auto rounded transition hover:bg-blue-600">
              Next
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
