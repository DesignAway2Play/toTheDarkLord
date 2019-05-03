// const vars
// rules as an image or dynamic? prob dynamic if I want to change the payouts
// const bosses

// cached elements

//state vars

let playArea, pScore, bonus, results, cScore

let winCheck = {

};

let pScore = {
  s: 0,
};

// event listeners



//functions

function initialize() {
  playArea = {
      x1icon_1: {
        imgURL = 'assets/img/blank.png',
      },
      x1icon_2: {
        imgURL = 'assets/img/blank.png',
      },
      x2icon: {
        imgURL = 'assets/img/blank.png',
      },
      x3icon:  {
        imgURL = 'assets/img/blank.png',
      },
      x2icon: {
        imgURL = 'assets/img/blank.png',
      },
      x3icon:  {
        imgURL = 'assets/img/blank.png',
      }
    };
  pScore = {
      s: 1000,
      stam: 3,
      results: ["", "", "", ""],
    };
  bonus:  {
    d20: [true, false, false, false, false, false, false,
        false, false, false, false, false, false, false,
      false, false, false, false, false, false],
    addTrue: function(){
        d20.pop();
        d20.unshift(true);
      },
    };


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

function payOUt() {

}

 function reset() {

 };

 function credit() {

 };
