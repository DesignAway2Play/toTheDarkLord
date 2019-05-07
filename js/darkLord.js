// const vars


// cached elements

//state vars

let playArea, pScore, bonus, results, cScore, turnPlayer, activeC

let winCheck = {

};

// event listeners



//functions

initialize();
function initialize() {
  turnPlayer = 0;
  /*
  sym = {
      x1Icon_1: {
        imgURL = 'assets/img/blank.png',
      },
      x1Icon_2: {
        imgURL = 'assets/img/blank.png',
      },
      x2Icon_1: {
        imgURL = 'assets/img/blank.png',
      },
      x2Icon_2: {
        imgURL = 'assets/img/blank.png',
      },
      x3Icon:  {
        imgURL = 'assets/img/blank.png',
      },
      x2Icon: {
        imgURL = 'assets/img/blank.png',
      },
      x3Icon:  {
        imgURL = 'assets/img/blank.png',
      },
      x4Icon:  {
        imgURL = 'assets/img/blank.png',
    },
    */
    cScore = {
        kali: {
          s: 300,
          stam: 2,
          results: ["", "", "", ""],
        },
        thor: {
          s: 400,
          stam: 4,
          results: ["", "", "", ""],
        },
      },
  pScore = {
      s: 150,
      stam: randomizer(6, false),
      results: ["", "", "", ""],
    },
  bonus =  {
    d20: [0,0,0],
      /*
    bIcon1: {
        imgURL = 'assets/img/blank.png'
      },
    b1Icon2: {
        imgURL = 'assets/img/blank.png'
      },
    b2Icon: {
        imgURL = 'assets/img/blank.png'
      },
    b3Icon: {
        imgURL = 'assets/img/blank.png'
      },
    b2Icon: {
        imgURL = 'assets/img/blank.png'
      },
    b3Icon:  {
        imgURL = 'assets/img/blank.png'
      }
    },
    */
    freq: 5,
    go: function () {
      var i = 0;
      var length = 5;
      do {
        var checkBonusJackpot1 = randomizer(5, false);
        var checkBonusJackpot2 = randomizer(5, false);
        if (checkBonusJackpot1 === checkBonusJackpot2) length += 1;
          bonus.d20.forEach(function (col, i) {
            bonus.d20.splice(i, 1, randomizer(length, false));
        });
        i += 1;
        payOutBonus();
        newC();
        }
      while (i < bonus.freq);

      }
},

  results = {
    board: [0, 0, 0, 0],
    symLength: 6,
    // betAmount should be parseInt
    betAmount: 2,

    pull: function () {
    // need event listener of amount of bet
      if (pScore.stam > 0) {
        if (turnPlayer === 0) {
          pScore.s = pScore.s - results.betAmount
          results.board.forEach(function (col, i) {
              results.board.splice(i, 1, randomizer(results.symLength, false));
            });
            activeC.s = activeC.s - payOut(results.betAmount);
            newC();
            results.jackpotVisibility();
            pScore.stam = pScore.stam - 1
            turnChange();
              }
        }
      else if (activeC.stam > 0) {
          if (turnPlayer === 1) {
            activeC.s = activeC.s - results.betAmount
            results.board.forEach(function (col, i) {
              results.board.splice(i, 1, randomizer(results.symLength, false));
            });
            pScore.s = pScore.s - payOutC(results.betAmount);
            newC();
            results.jackpotVisibility();
            activeC.stam = activeC.stam - 1;
            turnChange();
          };
        }
      },
    jackpotVisibility: function () {
      // 1 out of 3 chance for half jackpot
      results.symLength = 6;
      var i = 0;
        var halfJack = randomizer(3, false);
        var halfJack2 = randomizer(3, false);
      // 1 out of 5 chance for jackpot
        var fullJack = randomizer(5, false);
        var fullJack2 = randomizer(5, false);
        var jackpotLength = 0;
          if (halfJack === halfJack2) jackpotLength += 1;
          if (fullJack === fullJack2) jackpotLength += 1;
        results.symLength += jackpotLength;
      },
      // bonus section
      bonusChance: function () {
        var answer = randomizer(4, false);
        console.log(answer);
        var d20Index = randomizer(20, true);
        console.log(d20Index);
          if (answer == 1) results.bonus_addTrue();
          if (results.bonus_d20[d20Index] === true) bonus.go();
      },
      bonus_d20: [true, false, false, false, false, false, false,
          false, false, false, false, false, false, false,
        false, false, false, false, false, false],
      bonus_addTrue: function() {
          results.bonus_d20.pop();
          results.bonus_d20.unshift(true);
        },
    };

/*
order of ops:
console.log(results.jackpotVisibility(1))
  this affects results.symLength
console.log(results.pull(1))
  this affects pScore.s, results.board
console.log(results.bonusChance(1))
  this affects results.bonus_d20
*/
// where all needed functions initialize
  activeC = chooseC();
  results.jackpotVisibility();
  }


/*
you need a function for GameOver!!!!
*/

function sCheck() {
  if (pScore.s < 0) {
    pScore.s = 0;
    console.log(`Game Over!`);
  }
}

function chooseC() {
  var c = randomizer(2, false);
  if (c === 1) {
    return cScore.kali;
    }
  else if (c === 2) {
      return cScore.thor;
    }
  };

function newC() {
  if (activeC.s === 0) chooseC();
};

function payOut(bet) {
  // add dom manip
  if (results.board[0] === results.board[1] && results.board[1] === results.board[2] && results.board[2] === results.board[3]) {
    // damage
      if (results.board === [1,1,1,1]) return bet * 2;
    // health regen
      else if (results.board === [2,2,2,2]) {
        pScore.s = pScore.s + (bet * 4);
        return 0;
          }
    // charged attack
      else if (results.board === [3,3,3,3]) return bet * 5;
    //critical hit
      else if (results.board === [4,4,4,4]) return bet * 10;
    // super
      else if (results.board === [5,5,5,5]) {
        pScore.stam += 1;
        return bet * 20;
      }

      else if (results.board === [6,6,6,6]) return bet * 30;
      else if (results.board === [7,7,7,7]) return bet * 50;
    // instant kill
      else if (results.board === [8,8,8,8]) {
        activeC.s = 0;
        return 0;
          }
          else {
            console.log("wtf all 4")
          };
        }
  else if (results.board[0] === results.board[1] && results.board[0] === results.board[2] || results.board[1] === results.board[2] && results.board[1] === results.board[3] ) {
      if (results.board[0] === 1 && results.board[1] === 1 && results.board[2] === 1 || results.board[1] === 1 && results.board[2] === 1 && results.board[3] === 1) return bet * 1;
      else if (results.board[0] === 2 && results.board[1] === 2 && results.board[2] === 2 || results.board[1] === 2 && results.board[2] === 2 && results.board[3] === 2) return bet * 1;
    // health regen
      else if (results.board[0] === 3 && results.board[1] === 3 && results.board[2] === 3 || results.board[1] === 3 && results.board[2] === 3 && results.board[3] === 3) {
        pScore.s = pScore.s + (bet * 4);
        return 0;
        }
      else if (results.board[0] === 4 && results.board[1] === 4 && results.board[2] === 4 || results.board[1] === 4 && results.board[2] === 4 && results.board[3] === 4) return bet * 5;
      else if (results.board[0] === 5 && results.board[1] === 5 && results.board[2] === 5 || results.board[1] === 5 && results.board[2] === 5 && results.board[3] === 5) return bet * 10;
      else if (results.board[0] === 6 && results.board[1] === 6 && results.board[2] === 6 || results.board[1] === 6 && results.board[2] === 6 && results.board[3] === 6) return bet * 20;
      else if (results.board[0] === 7 && results.board[1] === 7 && results.board[2] === 7 || results.board[1] === 7 && results.board[2] === 7 && results.board[3] === 7) return bet * 35;
      else if (results.board[0] === 8 && results.board[1] === 8 && results.board[2] === 8 || results.board[1] === 8 && results.board[2] === 8 && results.board[3] === 8) return bet * 50;
      else {
            console.log("wtf all 3")
          };
    }
    else if (results.board[0] === results.board[1] || results.board[2] === results.board[3] || results.board[1] === results.board[2]) {
        if ((results.board[0] === 4 && results.board[1] === 4) || (results.board[2] === 4) && (results.board[3] === 4)) {
            pScore.s = pScore.s + (bet * 2)
          }
        else if ((results.board[0] === 5 && results.board[1] === 5) || (results.board[2] === 5 && results.board[3] === 5) || (results.board[1] === 5 && results[2] === 5)) return bet * 1;
        else if ((results.board[0] === 6 && results.board[1] === 6) || (results.board[2] === 6 && results.board[3] === 6) || (results.board[1] === 6 && results[2] === 6)) return bet * 2;
        else if ((results.board[0] === 7 && results.board[1] === 7) || (results.board[2] === 7 && results.board[3] === 7) || (results.board[1] === 7 && results[2] === 7)) return bet * 5;
        else if ((results.board[0] === 8 && results.board[1] === 8) || (results.board[2] === 8 && results.board[3] === 8) || (results.board[1] === 8 && results[2] === 8)) return bet * 6;
        else {
              console.log("wtf pairs");
              return 0;
            };
          }
  else {
      // add dom manip
      return 0
    }
};

function payOutC(bet) {
  // add dom manip
  if (results.board[0] === results.board[1] && results.board[1] === results.board[2] && results.board[2] === results.board[3]) {
    // damage
      if (results.board === [1,1,1,1]) return bet * 3;
    // health regen
      else if (results.board === [2,2,2,2]) {
        acitveC.s = activeC.s + (bet * 2);
        return 0;
          }
    // charged attack
      else if (results.board === [3,3,3,3]) return bet * 5;
    //critical hit
      else if (results.board === [4,4,4,4]) return bet * 10;
    // super
      else if (results.board === [5,5,5,5]) {
        turnChange(true);
        }
      else if (results.board === [6,6,6,6]) return bet * 25;
      else if (results.board === [7,7,7,7]) return bet * 50;
    // instant kill
      else if (results.board === [8,8,8,8]) return bet * 100;
      else {
        console.log("wtf all 4");
      };
          }
  else if (results.board[0] === results.board[1] && results.board[0] === results.board[2] || results.board[1] === results.board[2] && results.board[1] === results.board[3] ) {
      if (results.board[0] === 1 && results.board[1] === 1 && results.board[2] === 1 || results.board[1] === 1 && results.board[2] === 1 && results.board[3] === 1) return bet * 1;
      else if (results.board[0] === 2 && results.board[1] === 2 && results.board[2] === 2 || results.board[1] === 2 && results.board[2] === 2 && results.board[3] === 2) return bet * 1.5;
    // health regen
      else if (results.board[0] === 3 && results.board[1] === 3 && results.board[2] === 3 || results.board[1] === 3 && results.board[2] === 3 && results.board[3] === 3){
          acitveC.s = activeC.s + (bet * 2);
          return 0;
        }
      else if (results.board[0] === 4 && results.board[1] === 4 && results.board[2] === 4 || results.board[1] === 4 && results.board[2] === 4 && results.board[3] === 4) return bet * 5;
      else if (results.board[0] === 5 && results.board[1] === 5 && results.board[2] === 5 || results.board[1] === 5 && results.board[2] === 5 && results.board[3] === 5) return bet * 10;
      else if (results.board[0] === 6 && results.board[1] === 6 && results.board[2] === 6 || results.board[1] === 6 && results.board[2] === 6 && results.board[3] === 6) return bet * 15;
      else if (results.board[0] === 7 && results.board[1] === 7 && results.board[2] === 7 || results.board[1] === 7 && results.board[2] === 7 && results.board[3] === 7) return bet * 20;
      else if (results.board[0] === 8 && results.board[1] === 8 && results.board[2] === 8 || results.board[1] === 8 && results.board[2] === 8 && results.board[3] === 8) return bet * 30;
      else {
        console.log("wtf all 3")
      };
  }
  else if (results.board[0] === results.board[1] || results.board[2] === results.board[3] || results.board[1] === results.board[2]) {
      if (results.board[0] === 4 && results.board[1] === 4 || results.board[2] === 4 && results.board[3] === 4) {
          activeC.s = activeC.s + (bet * 2)
        }
        else if ((results.board[0] === 5 && results.board[1] === 5) || (results.board[2] === 5 && results.board[3] === 5) || (results.board[1] === 5 && results[2] === 5)) return bet * 1;
        else if ((results.board[0] === 6 && results.board[1] === 6) || (results.board[2] === 6 && results.board[3] === 6) || (results.board[1] === 6 && results[2] === 6)) return bet * 1;
        else if ((results.board[0] === 7 && results.board[1] === 7) || (results.board[2] === 7 && results.board[3] === 7) || (results.board[1] === 7 && results[2] === 7)) return bet * 3;
        else if ((results.board[0] === 8 && results.board[1] === 8) || (results.board[2] === 8 && results.board[3] === 8) || (results.board[1] === 8 && results[2] === 8)) return bet * 10;
          else {
            console.log("wtf pairs");
            return 0;
          };
        }
  else {
      // add dom manip
      return 0
      }
  };

function payOutBonus() {
  pays = 0;
  if (bonus.d20[0] && bonus.d20[1] === bonus.d20[2]) {
    if (bonus.d20 === [1,1,1]) {
      pays = results.betAmount * 3
        activeC.s = activeC.s - pays;
      }
    else if (bonus.d20 === [2,2,2]) {
        pays = results.betAmount * 5
        pScore.s = pScore.s + pays;
      }
    else if (bonus.d20 === [3,3,3]) return bonus.freq += 3;
    else if (bonus.d20 === [4,4,4]) {
      pays = results.betAmount * 15
        activeC.s = activeC.s - pays;
      }
    else if (bonus.d20 === [5,5,5]) {
      pays = results.betAmount * 50
        activeC.s = activeC.s - pays;
      };

  };

};

/*

 function reset() {

 };
*/

 function randomizer(length, condition) {
   if (condition === true) return Math.floor(Math.random() * length);
   else {
   // six should be dynamic based upon the modifier for the half jackpot and jackpot
    return Math.floor(Math.random() * length) + 1;
    };
  };

  function turnChange(condition){
    // this is the computer's turn
    if (turnPlayer === 1) {
      if (activeC.stam === 0)  {
        turnPlayer -= 1;
        pScore.stam = randomizer(6, false);
          };
        }
    // this is the player's turn
    else if (turnPlayer === 0) {
      if (pScore.stam === 0) {
        turnPlayer += 1;
        activeC.stam = randomizer(8, false)
        }
      }
    else if (condition === true) {
      turnPlayer = 1;
    };
};
