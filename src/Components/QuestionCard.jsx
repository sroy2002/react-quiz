import { useState } from "react";
import questions from "../data/questions.json";
import EndScreen from "./EndScreen";

const QuestionCard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const len = questions.length;
  const handleAnswer = (answer) => () => {
    if (questions[currentQuestion].type === "mcq") {
      if (answer === questions[currentQuestion].answer) setScore(score + 1);
    } else {
      if (parseInt(userAnswer) === questions[currentQuestion].answer)
        setScore(score + 1);
    }
    handleNextQuestion();
  };
  const handleNextQuestion = () => {
    if (currentQuestion < len - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setUserAnswer("");
    } else {
      setQuizCompleted(true);
    }
  };
  return (
    <div className="flex justify-center items-center">
      {quizCompleted ? (
        <EndScreen score={score} total={len} />
      ) : (
        <div className="flex flex-col justify-center items-center p-4 bg-white">
          <div>
            <p>{questions[currentQuestion].question}</p>
          </div>
          <div>
            {questions[currentQuestion].type === "mcq" ? (
              questions[currentQuestion].options.map((option, index) => (
                <div key={index}>
                  <button onClick={handleAnswer(option)}>{option}</button>
                </div>
              ))
            ) : (
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="enter your answer"
              />
            )}
          </div>
          <div>
            <button
              className="border px-4 py-2 text-lg"
              onClick={handleAnswer(userAnswer)}
            >
              {currentQuestion === len - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
