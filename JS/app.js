let TicTacToe = {
  init: function() {
    TicTacToe.symbols = ["X", "O"];
    TicTacToe.squares = Array.from(document.querySelectorAll(".squares"));
    TicTacToe.turnIndicator = document.querySelector(".turnIndicator");
    TicTacToe.button = document.querySelector(".newGame");
    TicTacToe.board = document.querySelector(".board");
    TicTacToe.winningSets = [
      // Horizontal Wins
      [0,1,2], 
      [3,4,5], 
      [6,7,8], 
      // Vertical Wins
      [0,3,6], 
      [1,4,7], 
      [2, 5, 8], 
      // Diagonal Wins
      [0,4,8], 
      [2,4,6]
    ]
    TicTacToe.addEventListeners();
    TicTacToe.newGame();
  },

  addEventListeners: function() {
    let ttt = this;
    this.squares.forEach(function(x) {
      x.addEventListener("click", function() {
        ttt.play(this);
      })
    })
    this.button.addEventListener("click", function() {
      ttt.newGame();
    })

  },

  // Every time a new game is started:
  newGame: function() {
    this.activePlayer = 0;
    this.gameOver = false;
    this.squares.forEach(function(x) {
      x.classList.remove("X");
      x.classList.remove("O"); 
    })
    this.board.classList.remove("gameOver");
    this.setTurnIndicator();
  },

  setTurnIndicator: function() {
    this.turnIndicator.innerHTML = this.symbols[this.activePlayer] + "'s turn.";
  },

  play: function(el) {
    // Make sure the square is not filled
    if (!this.gameOver && el.classList.length == 1) {
      // Set the contents to active player's symbol
      el.classList.add(this.symbols[this.activePlayer]);
      // Check if you won
      if (this.checkWin()) {
        this.turnIndicator.innerHTML = this.symbols[this.activePlayer] + "'s Win!";
        this.endGame();
      }
      // Check if there is a draw
      else if (this.checkDraw()) {
        this.turnIndicator.innerHTML =  "It's a draw!";
        this.endGame();
      }
    
      // Go to next players turn
      else {
        this.activePlayer = 1 - this.activePlayer;
        this.setTurnIndicator();
      }
    }
  },

  // Win Function
  checkWin: function() {
    let ttt = this;
    return this.winningSets.some(function (x) {
      return x.every(function(indexOfSquare) {
        return Array.from(ttt.squares[indexOfSquare].classList).indexOf(ttt.symbols[ttt.activePlayer]) > -1;
      })
    })
  },

  // Check for a Draw Function
  checkDraw: function() {
    let ttt = this;
    return this.squares.every(function(x){
      return x.classList.length > 1;
    })
  },

  endGame: function() {
    this.gameOver = true;
    this.board.classList.add("gameOver");
  }
}

window.onload = TicTacToe.init;

/* IDEAS FOR FURTHER IMPROVEMENTS: 
Have a Manual and Bot Mode
For Manual Mode, add feature where you can name the players. Eg. "X's name is David", "O's name is Sam" */