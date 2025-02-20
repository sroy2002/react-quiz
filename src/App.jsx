import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuestionCard from "./Components/QuestionCard";
import "./App.css";
import { db } from "./db";

function App() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [score, setScore] = useState(0);
  // const [hasSaved, setHasSaved] = useState(false);
  const total = 10;

  const handleStart = () => {
    setShowQuestion(true);
  };
  const handleRestart = async (finalScore) => {
    // if (hasSaved) return; // Prevent multiple saves
    // setHasSaved(true);

    console.log("handleRestart triggered");
    const percentage = Math.round((finalScore / total) * 100);
    await db.attempts.add({
      score: finalScore,
      total,
      percentage,
      date: new Date().toISOString(),
    });
    console.log("Attempt saved!");
    setShowQuestion(true);
    setTitleAnimated(false);
    setScore(0);
  };

  useEffect(() => {
    if (showQuestion) {
      setTimeout(() => setTitleAnimated(true), 800);
    }
  }, [showQuestion]);

  return (
    <div className="flex justify-center items-center h-screen flex-col overflow-hidden relative">
      {/* Title Container */}
      <motion.div
        key="title"
        initial={{ y: 0, opacity: 1 }}
        animate={!titleAnimated ? { y: -40, opacity: 1 } : { y: -40 }}
        transition={{ duration: 0.8, easing: "ease-in-out" }}
        className="flex flex-col justify-center items-center text-center absolute top-20"
      >
        <p className="text-5xl font-bold">Quiz App</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 0, opacity: 1 }}
          animate={showQuestion ? { opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.2, easing: "ease-in-out" }}
          className="w-[6rem] h-[3rem] mt-6 px-4 py-2 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer shadow-lg"
          onClick={handleStart}
        >
          Start
        </motion.button>
      </motion.div>

      {/* Question Card */}
      <div className="flex justify-center items-center max-w-[25rem] mt-28">
        <AnimatePresence>
          {showQuestion && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, easing: "ease-in-out" }}
            >
              <QuestionCard onRestart={handleRestart} setScore={setScore} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
