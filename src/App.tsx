import React, { useState } from 'react'
import { Header } from './components/header'

//QUESTION Why not use a component here?
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
    state: 'new',
    mines: undefined,
  })
  const [difficulty, setDifficulty] = useState<0 | 1 | 2>(0)

  // const [state, setState] = useState<'won'| 'lost'>()

  async function handleNewGame(newGameDifficulty: 0 | 1 | 2) {
    const gameDifficultyOptions = { difficulty: newGameDifficulty }

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

      setDifficulty(newGameDifficulty)
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
    if (value === '@') {
      return <i className="fa fa-flag" />
    }
    return value
  }

  function transformCellClassName(value: string | number) {
    if (value === 'F' || value === '@') {
      return 'cell-flag'
    }
    if (value === '*') {
      return 'cell-bomb'
    }
    if (value === '_') {
      return 'cell-free'
    }
    if ([1, 2, 3, 4, 5, 6, 7, 8].includes(Number(value))) {
      return `cell-number cell-${value}`
    }
    return undefined
  }

  let gameStateMessage = game.state
  switch (gameStateMessage) {
    case 'new':
      gameStateMessage = 'Time For A New Game — Make A Move'
      break
    case 'won':
      gameStateMessage = 'You Won!'
      break
    case 'lost':
      gameStateMessage = 'You Lost!'
      break
    case 'playing':
      gameStateMessage = 'Keep Dodging Those Mines!'
  }
  // function transformGameStateMessage() {
  //   if (gameStateMessage === 'won') {
  //     return 'blink-me'
  //   }
  // }
  // const header = game.state
  return (
    <div>
      <main>
        {/* <h1 className="stroke-text">Minesweeper</h1> */}
        <Header />
        <h2>
          <button onClick={() => handleNewGame(0)}>New Easy Game</button>
          <button onClick={() => handleNewGame(1)}>
            New Intermediate Game
          </button>
          <button onClick={() => handleNewGame(2)}>New Difficult Game</button>
        </h2>
        <h3 className="stroke-text">Game #: {game.id}</h3>
        <h3
          className={`stroke-text ${
            gameStateMessage === 'You Won!' ? 'blink-me' : ''
          }`}
        >
          {/* <input className={`form-control round-lg ${this.state.valid ? '' : 'error'}`} /> */}
          {gameStateMessage}
        </h3>
        <h3 className="stroke-text">Mines Remaining: {game.mines}</h3>

        <section className={`difficulty-${difficulty}`}>
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
    </div>
  )
}
