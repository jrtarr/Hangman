class Hangman{
    constructor(word,guessCount){
        word = word.toLowerCase().split("") //converting puzzle word to lowercase
        this.word = word
        this.totalGuessCount = guessCount
        this.guessCount = guessCount
        this.guesses = []
        this._status = 'playing'
    }
    get puzzle(){
        let puzzle = ''
        this.word.forEach((letter)=>{
            this.guesses.includes(letter) || letter === ' ' ? puzzle += letter : puzzle += '*'
        })
        return puzzle
    }
    get status(){
        let word = this.word.join('')
        if (this._status === 'playing'){
            return `You have ${this.guessCount} out of ${this.totalGuessCount} guesses remaining.` 
        } else if (this._status === 'failed'){
            return `Nice Try! The word was '${word}'.`
        }else{
            return `Great work! You guessed the word.`
        }
    }
    makeGuess(guess){
        guess = guess.toLowerCase()
        const isCorrect = this.word.includes(guess)
        const isUnique = !this.guesses.includes(guess)
    
        if (this._status !== 'playing'){
            return
        }
        if (isUnique){
            this.guesses = [...this.guesses,guess]
            //this.guesses.push(guess)
        }
        if (isUnique && !isCorrect){
            --this.guessCount
        }
        this.checkStatus()
    }
    checkStatus(){
        const wordComplete = !this.puzzle.split("").includes('*') //Checks if the result of returnPuzzle includes any * left. If not, the puzzle has been successfully solved
        if(this.guessCount === 0){
            this._status = 'failed'
        } else if(wordComplete){
            this._status = 'complete'
        }
    }
}

export {Hangman as default}