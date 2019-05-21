import Hangman from './hangman'
import getPuzzle from './requests'

let puzzleEl = document.querySelector('#puzzle')
let guessesEl = document.querySelector('#guesses-left')
let letterEl = document.querySelector('#guesses')
let game

const startNewGame = async ()=>{
    const puzzle = await getPuzzle(2)
    game = new Hangman(puzzle,5)
    render()
}
const render = ()=>{
    puzzleEl.innerHTML=''
    //puzzleEl.textContent = game.puzzle
    guessesEl.textContent = game.status
    letterEl.textContent = `You've guessed the following so far: ${game.guesses}`
    game.puzzle.split("").forEach((letter)=>{
        puzzleEl.innerHTML += `<span>${letter}</span>`
    })
}

startNewGame()

window.addEventListener('keypress',(e)=>{
    game.makeGuess(e.key)
    render()
})

document.querySelector('#reset-button').addEventListener('click',(e)=>{startNewGame()})