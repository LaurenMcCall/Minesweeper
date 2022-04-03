import React, { useState } from 'react'

export function App() {
  const [game, setGame] = useState({
    id: undefined,
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
    state: undefined,
    mines: undefined,
  })

  async function handleNewEasyGame() {
    const gameDifficultyOptions = { difficulty: 0 }

    const url = 'https://minesweeper-api.herokuapp.com/games'

    const fetchOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(gameDifficultyOptions),
    }

    const response = await fetch(url, fetchOptions)
    console.log(response)
    if (response.ok) {
      const newGameStateJson = await response.json()

      setGame(newGameStateJson)
    }
  }

  async function handleClickCell(row: number, col: number) {
    console.log(`Clicked a cell ${row} ${col}`)

    const checkOptions = {
      id: game.id,
      row,
      col,
    }
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/check`

    const fetchOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(checkOptions),
    }

    const response = await fetch(url, fetchOptions)
    if (response.ok) {
      const newGameStateJson = await response.json()

      setGame(newGameStateJson)
    }
  }

  return (
    <main>
      <h1>Minesweeper</h1>
      <h2>
        <button onClick={handleNewEasyGame}>New Easy Game</button>
      </h2>
      <h3>Game #: {game.id}</h3>
      <h3>Mines: {game.mines}</h3>

      <section>
        {game.board.map(function (gameRow, row) {
          return gameRow.map(function (square, col) {
            return (
              <button
                onClick={function () {
                  handleClickCell(row, col)
                }}
                key={col}
              >
                {square}
              </button>
            )
          })
        })}
      </section>
    </main>
  )
}
