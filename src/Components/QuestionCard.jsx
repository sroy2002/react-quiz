import { useState, useEffect, useCallback } from "react";
import questions from "../data/questions.json";
import EndScreen from "./EndScreen";
import PropTypes from "prop-types";

const QuestionCard = ({onRestart,setScore}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [localscore, setLocalScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(30);
  const len = questions.length;


  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswer("");
    setLocalScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimer(30);
  };

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < len - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setUserAnswer("");
      setSelectedAnswer(null);
      setIsCorrect(null);
      setTimer(30);
    } else  {
      setQuizCompleted(true);
    }
  },[currentQuestion,len]);

  useEffect(() => {
    const countdown = setTimeout(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    if (timer === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(countdown);
  }, [timer,handleNextQuestion]);


  const handleAnswer = (answer) => () => {
    setSelectedAnswer(answer);
    const correctAnswer = questions[currentQuestion].answer;
    let updatedScore = localscore;
    if (questions[currentQuestion].type === "mcq") {
      if (answer === correctAnswer) {
        updatedScore += 1;
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    } else {
      if (parseInt(userAnswer) === questions[currentQuestion].answer) {
        updatedScore += 1;
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }
    setLocalScore(updatedScore);
    setTimeout(() => {
      handleNextQuestion();
    }, 1300);
  };

  
  useEffect(() => {
    if (quizCompleted) {
      onRestart(localscore); 
      setScore(localscore);
      
    }
  }, [quizCompleted, onRestart,localscore,setScore]);
 
  return (
    <div className="flex justify-center items-center h-full">
      {quizCompleted ? (
        <div className="w-full h-full flex justify-center items-center">

          <EndScreen score={localscore} total={len} onRestart={resetQuiz}/>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-[2rem] bg-white rounded-xl shadow-md">
           {/* Timer Display */}
           <div className="text-xl font-semibold text-red-500 mb-4">
            ⏳ {timer}s remaining
          </div>
          <div className="mb-8">
            <p className="text-xl font-bold">
              {currentQuestion + 1}. {questions[currentQuestion].question}
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center mb-8">
            {questions[currentQuestion].type === "mcq" ? (
              questions[currentQuestion].options.map((option, index) =>{ 
                let bgColor = "bg-blue-400";
                if (selectedAnswer) {
                  if (option === selectedAnswer) {
                    bgColor = isCorrect ? "bg-green-500" : "bg-red-500"; 
                  }
                  if (option === questions[currentQuestion].answer && !isCorrect) {
                    bgColor = "bg-green-500"; 
                  }
                }
                
               return( <div
                  key={index}
                  className={`${bgColor} mb-4 flex justify-center items-center w-full py-2 rounded-lg  text-white font-semibold ${bgColor==="bg-blue-400" && "hover:bg-blue-500"} cursor-pointer`}
                >
                  <button onClick={handleAnswer(option)}>{option}</button>
                </div>)
              })
            ) : (
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="border-2 p-2 rounded-lg w-full"
              />
            )}
          </div>
          <div>
            <button
              className="border px-6 py-2 text-lg rounded-lg hover:bg-gray-200 transition-all duration-300 ease-in-out"
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

QuestionCard.propTypes = {
  onRestart: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};




export default QuestionCard;
