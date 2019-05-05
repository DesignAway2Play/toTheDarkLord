// const vars
// rules as an image or dynamic? prob dynamic if I want to change the payouts
// const bosses

// cached elements

//state vars

let playArea, pScore, bonus, results, cScore

let winCheck = {

};

// event listeners



//functions
initialize();
function initialize() {
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
    };
  pScore = {
      s: 1000,
      stam: 3,
      results: ["", "", "", ""],
    };
  bonus =  {
    d20: [0,0,0];
    addTrue: function(){
        d20.pop();
        d20.unshift(true);
      },
    bIcon1: {
        imgURL = 'assets/img/blank.png',
      },
    b1Icon2: {
        imgURL = 'assets/img/blank.png',
      },
    b2Icon: {
        imgURL = 'assets/img/blank.png',
      },
    b3Icon: {
        imgURL = 'assets/img/blank.png',
      },
    b2Icon: {
        imgURL = 'assets/img/blank.png',
      },
    b3Icon:  {
        imgURL = 'assets/img/blank.png',
      }
    },
    pArea: [],
    go: function () {
      var i = 0;
      var length = 5;
      do {
        var checkBonusJackpot1 = randomizer(5);
        var checkBonusJackpot2 = randomizer(5);
        if (checkBonusJackpot1 === checkBonusJackpot2) length += 1;
        bonus.pArea.push(randomizer(length));
        i += 1;
      }
      while (i < length);

    }

  results = {
    board: [0, 0, 0, 0],
    symLength: 6,
    pull:
    // need event listener of amount of bet
      pScore = betAmountvariable here + pScore
      results.board.forEach(function (col, i) {
      results.board.splice(i, 1, randomizer(this.symLength));
      }),
    jackpotVisibility: function () {
      // 1 out of 3 chance for half jackpot
      var i = 0;
        var halfJack = randomizer(3);
        var halfJack2 = randomizer(3);
      // 1 out of 5 chance for jackpot
        var fullJack = randomizer(5);
        var fullJack2 = randomizer(5);
        var jackpotLength = 0;
          if (halfJack === halfJack2) jackpotLength += 1;
          if (fullJack === fullJack2) jackpotLength += 1;
        results.symLength += jackpotLength;
      },
      // bonus section
      bonusChance: function () {
        var answer = randomizer(4);
        var d20Index = randomizer(20, true);
          if (answer === 1) bonus_addTrue;
          if (results.bonus_d20[d20Index] === true) bonus.go;
      },
      bonus_d20: [true, false, false, false, false, false, false,
          false, false, false, false, false, false, false,
        false, false, false, false, false, false],
      bonus_addTrue: function() {
          this.d20.pop();
          this.d20.unshift(true);
        },

    }

// where all needed functions initialize
          render();
  }

function render() {
  // render scores
  pScoreEl.textContent = scores.p;
  cScoreEl.textContent = scores.c;
  tScoreEl.textContent = scores.t;
  // render images
  pResultEl.style.backgroundImage = `url(${rps[results.p].imgUrl})`;
  cResultEl.style.backgroundImage = `url(${rps[results.c].imgUrl})`;
  // color border if winner, otherwise "hide" the border
  pResultEl.parentElement.style.border = winner === 'p' ? '10px solid darkgrey' : '10px solid white';
  cResultEl.parentElement.style.border = winner === 'c' ? '10px solid darkgrey' : '10px solid white';
}



function payOut(bet) {
  // add dom manip
  if (results.board[0] && results.board[1] && results.board[2] === results.board[3]) {
    if (results.board === [1,1,1,1]) return bet * 2;
    else if (results.board === [2,2,2,2]) return bet * 2;
    else if (results.board === [3,3,3,3]) return bet * 5;
    else if (results.board === [4,4,4,4]) return bet * 10;
    else if (results.board === [5,5,5,5]) return bet * 50;
    else if (results.board === [6,6,6,6]) return bet * 100;
  };
    else if (results.board[0] && results.board[1] === results.board[2] || resuts.board[1] && resuts.board[2] === resuts.board[3] ) {
    if (results.board[0] && resuts.board[1] && results.board[2] === 1 || results.board[1] && resuts.board[2] && results.board[3] === 1) return bet * 1;
    else if (results.board[0] && resuts.board[1] && results.board[2] === 2 || results.board[1] && resuts.board[2] && results.board[3] === 2) return bet * 1;
    else if (results.board[0] && resuts.board[1] && results.board[2] === 3 || results.board[1] && resuts.board[2] && results.board[3] === 3) return bet * 3;
    else if (results.board[0] && resuts.board[1] && results.board[2] === 2 || results.board[1] && resuts.board[2] && results.board[3] === 2) return bet * 5;
    else if (results.board[0] && resuts.board[1] && results.board[2] === 2 || results.board[1] && resuts.board[2] && results.board[3] === 2) return bet * 10;
    else if (results.board[0] && resuts.board[1] && results.board[2] === 2 || results.board[1] && resuts.board[2] && results.board[3] === 2) return bet * 20;
  };
    else {
      // add dom manip
    }
};

function payOutBonus() {
  if (bonus.d20[0] && bonus.d20[1] === bonus.d20[2]) {
    if (bonus.d20 === [1,1,1]) return bet * 3;
    else if (bonus.d20 === [2,2,2]) return bet * 5
    // increase spins
    else if (bonus.d20 === [3,3,3]);
    else if (bonus.d20 === [4,4,4]) return bet * 15;
    else if (bonus.d20 === [5,5,5]) return bet * 50;

  };

};

 function reset() {

 };

 function credit() {

 };

 function randomizer(length, condition) {
   if (condition === true) return Math.floor(Math.random() * length) + 0;
   else {
   // six should be dynamic based upon the modifier for the half jackpot and jackpot
   return Math.floor(Math.random() * length);
    }
  };
