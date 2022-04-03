import React, { useState } from 'react'

export function App() {
  const [game, setGame] = useState({
    id: 1,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    state: 'new',
    mines: 10,
  })
  return (
    <main>
      <h1>Minesweeper</h1>
      <h2>
        <button>New Easy Game</button>
      </h2>

      <ul>
        {game.board.map(function (gameRow) {
          return gameRow.map(function (square, squareIndex) {
            return <li key={squareIndex}>{square}</li>
          })
        })}
      </ul>
    </main>
  )
}
