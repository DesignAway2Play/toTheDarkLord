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
    addTrue: function(){
        d20.pop();
        d20.unshift(true);
      },
    bIcon1: {
        imgURL = 'assets/img/blank.png',
      },
    b1Icon: {
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
    };

  results = {
    board: [0, 0, 0, 0],
    symLength: 4,
    pull:
      results.board.forEach(function (col, i) {
      this.board.splice(i, 1, randomizer(this.symLength));
      }),
    jackpotVisibility: function () {
      // 1 out of 3 chance for half jackpot
        var halfJack = randomizer(3);
        var halfJack2 = randomizer(3);
      // 1 out of 5 chance for jackpot
        var fullJack = randomizer(5);
        var fullJack2 = randomizer(5);
        var jackpotLength = 0;
          if (halfJack === halfJack2) jackpotLength += 1;
          if (fullJack === fullJack2) jackpotLength += 1;
        this.symLength += jackpotLength;
      },


    }


    // bonus section
    bonus_d20: [true, false, false, false, false, false, false,
        false, false, false, false, false, false, false,
      false, false, false, false, false, false],
    bonus_addTrue: function() {
        d20.pop();
        d20.unshift(true);
      },
  };

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

 function playRoll() {

 };

function payOut() {

};

 function reset() {

 };

 function credit() {

 };

 function randomizer(length) {
   // six should be dynamic based upon the modifier for the half jackpot and jackpot
   return Math.floor(Math.random() * length);
 };
