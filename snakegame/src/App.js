import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Highscore from './Highscoreknapp';
import StartButton from './Startknapp';
import ExitButton from './Exitknapp';

function App() {
  return (      
    <main className= "main">
  <Homepage/>
    <div className="Menu">
      <div id="buttons">
      <StartButton></StartButton>
      <Highscore/>
      <ExitButton></ExitButton>
      </div>
    </div>
    </main>
  );
}

export default App;
