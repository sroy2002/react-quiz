import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import * as motion from "motion/react-client"

const EndScreen = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
 
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-3xl font-bold my-8">🎉 Quiz is completed!</p>
      <p className="text-2xl">Your score is</p>
      <p className="text-5xl font-bold my-4">
        {score}/{total}
      </p>

      {/* Circular Progress Bar with Percentage Display */}
      <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
        >
      <Box position="relative" display="inline-flex" className="my-8">
      <CircularProgress
          variant="determinate"
          value={100} 
          size={180} 
          thickness={5} 
          sx={{
            color: "#B7B7B7", 
            position: "absolute", 
          }}
        />
        <CircularProgress
          variant="determinate" 
          
          value={percentage}
          size={180} 
          thickness={5} 
          sx={{
            color: percentage >= 50 ? "green" : "red", 
          }}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h5" component="div" fontWeight="bold">
            {percentage}%
          </Typography>
        </Box>
      </Box>
      </motion.div>
  
        <motion.button  whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 0, opacity: 1 }}
          
          className="mt-6 px-4 py-2 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer shadow-lg" onClick={onRestart}>Start Again</motion.button>
   
    </div>
  );
};

EndScreen.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default EndScreen;
