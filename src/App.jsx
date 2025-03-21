import "./App.css";
import "./index.css";
import { Board } from "./Components/Board";

function App() {
  return (
    <main>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        <Board />
      </section>
    </main>
  );
}
export default App;
