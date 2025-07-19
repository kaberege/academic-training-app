import React from "react";
import useQuizStore from "../stateStore/QuizStore";
import { Link } from "react-router-dom";
import DownloadShare from "./DownloadShare";
import he from "he";

// Displays the score summary after the quiz
export default function ScoreSummary() {
    const quizScore = useQuizStore(state => state.quizScore);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizLoader = useQuizStore(state => state.setQuizLoader);

    //Function for retaking the quiz
    const retakeQuiz = () => {
        setQuizLoader(false);
        setQuizState("quiz");
    };

    return (
        <div className="flex flex-col text-center mx-auto w-full max-w-96 max-sm:p-2 p-5 bg-slate-50 dark:bg-stone-700 rounded shadow cursor-pointer transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white sm:text-xl">Quiz Results</h2>
            <button className=" w-24 mx-auto">
                <Link
                    to="/history"
                    className="text-sm text-cyan-600 hover:underline hover:text-cyan-400 transition"
                >
                    Go to history
                </Link>
            </button>
            <div className="mt-4 dark:text-slate-300 text-center">
                <p className="mb-2">Topic: <span className="font-bold">{he.decode(quizScore.topic)}</span></p>
                <p className="mb-2">Number of Questions: <span className="font-bold">{quizScore.questions}</span></p>
                <p className="mb-2">Correct Answers: <span className="font-bold">{quizScore.correct}</span></p>
                <p className="mb-2">Incorrect Answers: <span className="font-bold">{quizScore.questions - quizScore.correct}</span></p>
                <p className="mb-2">Your Score: <span className="font-bold">{quizScore.scored}%</span></p>
                <p>Time Used: <span className="font-semibold">{quizScore.spent}</span></p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 sm:gap-4 max-sm:flex-col max-sm:justify-center">
                <div className="flex flex-row gap-1 justify-center items-center">
                    <button onClick={retakeQuiz} className="bg-blue-500 text-sm text-white p-1 rounded transition duration-300 hover:bg-blue-700">Retake Quiz</button>
                    <button onClick={() => setQuizState("start")} className="bg-gray-300 text-sm p-1 rounded transition duration-300 hover:bg-gray-400">New Quiz</button>
                </div>
                <DownloadShare shareable={quizScore} />
            </div>
        </div>


    );
}
