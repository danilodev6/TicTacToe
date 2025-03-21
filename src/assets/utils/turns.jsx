import { players } from "./players";
import { Square } from "../../Components/Square";

export const Turns = ({ currentPlayer }) => {
  return (
    <section className="turns">
      <Square
        className="player1"
        isSelected={currentPlayer === players.player1}
      >
        {players.player1}
      </Square>
      <Square
        className="player2"
        isSelected={currentPlayer === players.player2}
      >
        {players.player2}
      </Square>
    </section>
  );
};
