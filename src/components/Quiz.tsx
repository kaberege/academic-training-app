import { useState } from "react";
import { type QuizQuestion } from "../types";

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  );

  const handleSelect = (qIndex: number, optionIndex: number) => {
    const copy = [...answers];
    copy[qIndex] = optionIndex;
    setAnswers(copy);
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    setScore(correct);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "abc123",
        lessonId: "child-psychology-tutoring-01",
        completedAt: new Date().toISOString(),
        quizScore: correct,
        quizTotal: questions.length,
      }),
    }).then((res) => console.log("✅ Mock POST sent.", res));
  };

  return (
    <div className="mt-10">
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
                  <input
                    type="radio"
                    name={`q-${i}`}
                    checked={answers[i] === j}
                    onChange={() => handleSelect(i, j)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
          {score !== null && (
            <p
              className={`mt-2 ${
                answers[i] === q.correctIndex
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {answers[i] === q.correctIndex
                ? "✅ Correct"
                : `❌ Incorrect. ${q.explanation}`}
            </p>
          )}
        </div>
      ))}
      {score === null ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Quiz
        </button>
      ) : (
        <p className="mt-4 font-semibold">
          You scored {score}/{questions.length}
        </p>
      )}
    </div>
  );
}
