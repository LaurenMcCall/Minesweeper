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

  async function handleCheckOrFlagCell(
    row: number,
    col: number,
    action: 'check' | 'flag'
  ) {
    const checkOptions = {
      id: game.id,
      row,
      col,
    }
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/${action}`

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

  function transformCellValue(value: string) {
    if (value === 'F') {
      return <i className="fa fa-flag" />
    }

    if (value === '_') {
      return ''
    }

    if (value === '*') {
      return <i className="fa fa-bomb" />
    }
    return value
  }

  function transformCellClassName(value: string) {
    if (value === 'F') {
      return 'cell-flag'
    }
    if (value === '*') {
      return 'cell-bomb'
    }
    if (value === '_') {
      return 'cell-free'
    }
    return undefined
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
                className={transformCellClassName(square)}
                onClick={function (event) {
                  event.preventDefault()

                  handleCheckOrFlagCell(row, col, 'check')
                }}
                onContextMenu={function (event) {
                  event.preventDefault()

                  handleCheckOrFlagCell(row, col, 'flag')
                }}
                key={col}
              >
                {transformCellValue(square)}
              </button>
            )
          })
        })}
      </section>
    </main>
  )
}
