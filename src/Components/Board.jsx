import { useState } from "react";
import { Square } from "./Square";
import { players } from "../assets/utils/players.js";
import { Turns } from "../assets/utils/turns";
import { WINNER_COMBO } from "../assets/utils/winnerLogic.js";
import { WinnerModal } from "./WinnerModal.jsx";
import { MouseFollower } from "./M-follower.jsx";

export const Board = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const currentPlayerFromStorage = window.localStorage.getItem("player");
    return currentPlayerFromStorage
      ? currentPlayerFromStorage
      : players.player1;
  });

  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBO) {
      const [a, b, c] = combo;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    if (boardToCheck.every((e) => e !== null)) {
      return "tie";
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(players.player1);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("player");
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }

    const newPlayer =
      currentPlayer === players.player1 ? players.player2 : players.player1;
    setCurrentPlayer(newPlayer);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("player", newPlayer);
  };

  return (
    <div className="game">
      <section className="board">
        {board.map((_, index) => {
          return (
            <Square key={index} updateBoard={updateBoard} index={index}>
              {board[index]}
            </Square>
          );
        })}
        <MouseFollower />
      </section>
      <Turns currentPlayer={currentPlayer} />
      <button className="resetButton" onClick={resetGame} type="">
        Reset Game
      </button>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </div>
  );
};
