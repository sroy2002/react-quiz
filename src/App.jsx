import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import QuestionCard from "./Components/QuestionCard";
import "./App.css";

function App() {
  const [showQuestion, setShowQuestion] = useState(false);

  const handleStart = () => {
    setShowQuestion(true);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col overflow-hidden">
      <AnimatePresence>
        {
          <motion.div
            key="title"
            initial={{ y: 0, opacity: 1 }}
            animate={
              showQuestion ? { y: -100, opacity: 1 } : { y: 0, opacity: 1 }
            }
            transition={{ duration: 0.8, easing: "ease-in-out" }}
            className="flex flex-col justify-center items-center text-center"
          >
            <p className="text-5xl font-bold">Quiz App</p>
            <p>Lorem ipsum dolor sit amet.</p>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ y: 0, opacity: 1 }}
              animate={showQuestion ? { opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.8, easing: "ease-in-out" }}
              className="w-[6rem] h-[3rem] mt-6 px-4 py-2 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer shadow-lg"
              onClick={handleStart}
            >
              Start
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
      <div className="w-full flex justify-center items-center">
        <AnimatePresence>
          {showQuestion && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, easing: "ease-in-out" }}
              className="w-full"
            >
              <QuestionCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
