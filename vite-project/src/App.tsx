import { useState } from "react";
import "./App.css";
import Home from "./Home.tsx";
import Game from "./Game.tsx";

function App() {
  const screens = {
    HOME: 0,
    GAME: 1,
  };
  const [currentScreen, setCurrentScreen] = useState(screens.HOME);
  function navigateTo(screen: number) {
    setCurrentScreen(screen);
  }
  // this way of navigating is stupid because it cant use the browser history
  return (
    <div className="App">
      {currentScreen === screens.HOME && (
        <Home onPlay={() => navigateTo(screens.GAME)} />
      )}
      {currentScreen === screens.GAME && <Game />}
    </div>
  );
}

export default App;
