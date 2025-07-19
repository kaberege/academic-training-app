import useQuizStore from "../stateStore/QuizStore";

export default function QuizStart() {
  const setQuizState = useQuizStore((state) => state.setQuizState);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuizState("quiz");
  };

  return (
    <div className="text-center">
      <h2 className="max-md:text-xl text-2xl font-semibold mb-4 dark:text-white">
        Start Your Quiz
      </h2>
      <button
        type="button"
        className="mt-4 bg-blue-500 cursor-pointer text-white p-1 w-28 rounded transition hover:bg-blue-600"
      >
        Start Quiz
      </button>
    </div>
  );
}
