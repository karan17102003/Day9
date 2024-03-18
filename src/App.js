import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {

  const [questions, setQuestions] = useState([]);
  const [qutIndex, setqutIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    fetchQuestions();
  }, []);

  function fetchQuestions() {
    fetch('https://opentdb.com/api.php?amount=7&type=multiple')
      .then(response => response.json())
      .then(data => setQuestions(data.results))
     
  }

  
  function handleAnswer(selectedOption) {
    const correctAnswer = questions[qutIndex].correct_answer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    setqutIndex(qutIndex + 1);
    setTimeLeft(60); 
  }

  function showScore() {
    return (
      <div>
        <h2>Your Score: {score} / {questions.length}</h2>
      </div>
    );
  }

  function renderQuestion() {
    const curQution = questions[qutIndex];
    const options = [...curQution.incorrect_answers, curQution.correct_answer];
    options.sort(() => Math.random() - 0.5);

    return (
      <div >
        <h2>{curQution.question}</h2>
        <div style={{
          
        width:'100vw',
        textAlign:'center'}}>
          {options.map(option => (
            <button style={{display:'flex',
            textAlign:'center',
            justifyContent:'center',
            
           
            
            
            }}  key={option} onClick={() => handleAnswer(option)}>{option}</button>
          ))}
        </div>
        <p>Time Left: {timeLeft} seconds</p>
        <button onClick={() => handleAnswer(null)}>Skip</button>
      </div>
    );
  }

  return (
    <div>
      {qutIndex < questions.length ? renderQuestion() : showScore()}
    </div>
  );
}





export default App;
