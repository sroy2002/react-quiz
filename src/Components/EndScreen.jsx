import PropTypes from "prop-types";
import questions from "../data/questions.json";
const EndScreen = ({ score}) => {
    
  return (
    <div>
      <p>quiz is completed!</p>
      <p>Your score is</p>
      <p>
        {score}/{questions.length}
      </p>
    </div>
  );
};
EndScreen.propTypes = {
    score: PropTypes.number.isRequired,
    len: PropTypes.number.isRequired,
  };
  
export default EndScreen;
