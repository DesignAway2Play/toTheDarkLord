const lookupStage = ["forest", "druid", "dungeon"]
const battles = {
  forest: 'assets/finished/backgrounds/nightforest1080p.png',
  druid: 'assets/finished/backgrounds/druids1080p.png',
  dungeon: 'assets/finished/backgrounds/dungeon.png',
};

const symbols = ['assets/finished/symbols/error.png' ,'assets/finished/symbols/crossStatic.png',
'assets/finished/symbols/shieldStatic.png', 'assets/finished/symbols/crossStatic.png',
'assets/finished/symbols/shieldStatic.png', 'assets/finished/symbols/bloodKnifeStatic.png',
'assets/finished/symbols/chalice.gif', 'assets/finished/symbols/demonCodexStatic.png',
'assets/finished/symbols/blackHeartThorn.gif'];

const buttons = {
  oneX: 'assets/finished/buttons/bet1X.gif',
  threeX: 'assets/finished/buttons/bet3X.gif',
  tenX: 'assets/finished/buttons/bet10X.gif',
}

const hero1 = {
  stand: 'assets/finished/hero/smallstance.png',
  swordSwing: 'assets/finished/hero/swordattack.gif',
  victory: 'assets/finished/hero/victory.gif'
}

const stage = document.querySelector('.battleBoard');
const start = document.querySelector('.start')
const playIt = document.querySelector('.intro')
const displayPScore = document.querySelector('.pScore');
const displayCScore = document.querySelector('.cScore');
const minBet = document.querySelector('.oneX');
const medBet = document.querySelector('.threeX');
const maxBet = document.querySelector('.tenX');
const pStam = document.querySelector('.pStam');
const cStam = document.querySelector('.cStam');
const hero = document.querySelector('.hero');
const activeComp = document.querySelector('.activeComp');
const turnStatus = document.querySelector('.attack');
const sym1 = document.querySelector('.sym1');
const sym2 = document.querySelector('.sym2');
const sym3 = document.querySelector('.sym3');
const sym4 = document.querySelector('.sym4');
const playArea = document.querySelector('.playArea');
const playArea2 = document.querySelector('.playArea2');
const attackArea = document.querySelector('.attackArea');
const attackP = document.querySelector('.attackP');
const heroActive = document.querySelector('.hero');

let pScore, bonus, results, cScore, turnPlayer, activeC

document.querySelector('.startB').addEventListener('click', initialize);
document.querySelector('.oneX').addEventListener('click', betChoice1);
document.querySelector('.threeX').addEventListener('click', betChoice2);
document.querySelector('.tenX').addEventListener('click', betChoice3);
document.querySelector('.playArea').addEventListener('click', hideArea);
document.querySelector('.attack').addEventListener('click', hideArea);
document.querySelector('.playArea2').addEventListener('click', hideArea);
document.querySelector('.attackArea').addEventListener('click', hideArea);

function initialize() {
  playIt.play();
  hero.src = hero1.stand;
  maxBet.style.display = "block";
  medBet.style.display = "block";
  minBet.style.display = "block";
  activeComp.src = 'assets/finished/effects/fire1.gif';
  minBet.src = buttons.oneX;
  medBet.src = buttons.threeX;
  maxBet.src = buttons.tenX;
  stage.src = battles[lookupStage[randomizer(3, true)]];
  turnPlayer = 0;
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
    board: [1, 1, 1, 1],
    symLength: 6,
    betAmount: 2,
    pull: function () {
      let symShow = function showSym(i) {
        playArea.style.visibility = "visible"
        if (i == 4) {
          playArea.style.visibility = "hidden"
        }
        else if (i == 0) {
          sym1.src = symbols[results.board[i]];
        }
        else if (i == 1) {
          sym2.src = symbols[results.board[i]];
        }
        else if (i == 2) {
          sym3.src = symbols[results.board[i]];
        }
        else if (i == 3) {
          sym4.src = symbols[results.board[i]];
        }
      };
      if (pScore.stam > 0) {
        if (turnPlayer === 0) {
          maxBet.style.visibility = "hidden";
          medBet.style.visibility = "hidden";
          minBet.style.visibility = "hidden";
          heroActive.src = hero1.victory;
          pScore.s = pScore.s - results.betAmount;
          results.board.forEach(function (col, i) {
            results.board.splice(i, 1, randomizer(results.symLength, false));
            setTimeout(function() {
              symShow(i) }, 1000);
            });
          let attackReport = payOut(results.betAmount)
          if (attackReport > 0) {
            attackArea.style.visibility = "visible";
          }
          turnStatus.style.visibility = "visible";
          turnStatus.textContent = `You did ${attackReport} damage to the enemy!`
          activeC.s = activeC.s - attackReport;
          setTimeout(symShow, 5000, 4);
          setTimeout(function() {
            displayPScore.textContent = pScore.s;
            displayCScore.textContent = activeC.s;
            attackArea.style.visibility = "hidden";
            turnStatus.style.visibility = "hidden";
          }, 5000);
          sCheck();
          newC();
          results.jackpotVisibility();
          pScore.stam = pScore.stam - 1;
          pStam.textContent = pScore.stam;
          cStam.textContent = activeC.stam;
          setTimeout(function(){
            turnChange();
          }, 5000);
        }
      }
      else if (activeC.stam > 0) {
        if (turnPlayer === 1) {
          activeC.s = activeC.s - results.betAmount
          results.board.forEach(function (col, i) {
            results.board.splice(i, 1, randomizer(results.symLength, false));
            setTimeout(function() {
                symShow(i)}, 1000);
              });
            setTimeout(symShow, 6000, 4);
            let attackReport = payOutC(results.betAmount);
            attackArea.style.visibility = "visible;"
            turnStatus.style.visibility = "visible";
            turnStatus.textContent = `Boss did ${attackReport} damage to you!`
            setTimeout(function() {
              pScore.s = pScore.s - attackReport;
              displayPScore.textContent = pScore.s;
              displayCScore.textContent = activeC.s;
              turnStatus.style.visibility = "hidden";
              attackArea.style.visibility = "hidden";
            }, 5000);
            newC();
            sCheck();
            activeC.stam = activeC.stam - 1;
            results.jackpotVisibility();
            displayPScore.textContent = pScore.s;
            displayCScore.textContent = activeC.s;
            pStam.textContent = pScore.stam;
            cStam.textContent = activeC.stam;
            setTimeout(function(){
              turnChange();
            }, 8000);
          };
        }
      },
    jackpotVisibility: function () {
      results.symLength = 6;
      var i = 0;
        var halfJack = randomizer(3, false);
        var halfJack2 = randomizer(3, false);
        var fullJack = randomizer(5, false);
        var fullJack2 = randomizer(5, false);
        var jackpotLength = 0;
          if (halfJack === halfJack2) jackpotLength += 1;
          if (fullJack === fullJack2) jackpotLength += 1;
        results.symLength += jackpotLength;
      },
      bonusChance: function () {
        var answer = randomizer(4, false);
        var d20Index = randomizer(20, true);
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
  activeC = chooseC();
  results.jackpotVisibility();
  start.style.visibility = "hidden";
  displayPScore.textContent = pScore.s;
  displayCScore.textContent = activeC.s;
  pStam.textContent = pScore.stam;
  cStam.textContent = activeC.stam;
  }

function betChoice1(amount) {
  results.betAmount = 1;
  results.pull();
  displayPScore.textContent = pScore.s;
  displayCScore.textContent = activeC.s;
};

function betChoice2(amount) {
  results.betAmount = 3;
  results.pull();
  displayPScore.textContent = pScore.s;
  displayCScore.textContent = activeC.s;
};

function betChoice3(amount) {
  results.betAmount = 10;
  results.pull();
  displayPScore.textContent = pScore.s;
  displayCScore.textContent = activeC.s;
};

function showSym(i) {
  if (i == 4) {
    playArea.style.visibility = "hidden"
    return 0;
  }
  else if (i = 0) {
      sym1.src = symbols[results.board[i]];
      i += 1;
      showSym(i);
  }
  else if (i = 1) {
      sym2.src = symbols[results.board[i]];
      i += 1;
      showSym(i);
  }
  else if (i = 2) {
      sym3 = symbols[results.board[i]];
      i += 1;
      showSym(i);
  }
  else if (i = 3) {
      sym4 = symbols[results.board[i]];
      i += 1;
      showSym(i);
  }
}

function sCheck() {
  if (pScore.s < 10 && pScore.s < 3) {
    maxBet.style.display = "none";
    medBet.style.display = "none";
  }
  else if (pScore.s < 10) {
    maxBet.style.display = "none";
  }
  else {
    maxBet.style.display = "inline";
    medBet.style.display = "inline";
  }
  if (pScore.s < 0 || pScore.s == 0) {
    pScore.s = 0;
    maxBet.style.display = "none";
    medBet.style.display = "none";
    minBet.style.display = "none";
    turnStatus.textContent = "You lost weary traveler!"
    turnStatus.style.visibility = "visible";
    setTimeout(function(){
      turnStatus.style.visibility = "hidden";
    }, 7000);
        setTimeout(function(){
    start.style.visibility = "visible";
  }, 9500);
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
  if (activeC.s === 0) {
    turnStatus.textContent = "You slayed! A new God approaches!"
    maxBet.style.visibility = "hidden";
    medBet.style.visibility = "hidden";
    minBet.style.visibility = "hidden";
    turnStatus.style.visibility = "visible";
    setTimeout(function(){
      turnStatus.style.visibility = "hidden";
      pScore.s = 200;
      pScore.stam = 5;
    }, 7000);
    maxBet.style.visibility = "visible";
    medBet.style.visibility = "visible";
    minBet.style.visibility = "visible";
    chooseC();
  };
};

function payOut(bet) {
    if (results.board[0] === results.board[1] && results.board[1] === results.board[2] && results.board[2] === results.board[3]) {
      // damage
      if (results.board.join('') == 1111) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 2
      }
      else if (results.board.join('') == 2222) {
        pScore.s = pScore.s + (bet * 4);
        return 0
      }
      else if (results.board.join('') == 3333) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        turnStatus.style.visibility = "visible";
        return bet * 5
      }
      else if (results.board.join('') == 4444) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 10
      }
      else if (results.board.join('') == 5555) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        pScore.stam += 1
        return bet * 20
      }
      else if (results.board.join('') == 6666) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 30
      }
      else if (results.board.join('') == 7777) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 50
      }
      else if (results.board.join('') == 8888) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        activeC.s = 0
        return 0
      }
    }
    else if (results.board[0] === results.board[1] && results.board[0] === results.board[2] || results.board[1] === results.board[2] && results.board[1] === results.board[3] ) {
      if (results.board[0] === 1 && results.board[1] === 1 && results.board[2] === 1 || results.board[1] === 1 && results.board[2] === 1 && results.board[3] === 1) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 1;
      }
      else if (results.board[0] === 2 && results.board[1] === 2 && results.board[2] === 2 || results.board[1] === 2 && results.board[2] === 2 && results.board[3] === 2) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 1;
      }
    // health regen
      else if (results.board[0] === 3 && results.board[1] === 3 && results.board[2] === 3 || results.board[1] === 3 && results.board[2] === 3 && results.board[3] === 3) {
        pScore.s = pScore.s + (bet * 4);
        return 0;
        }
      else if (results.board[0] === 4 && results.board[1] === 4 && results.board[2] === 4 || results.board[1] === 4 && results.board[2] === 4 && results.board[3] === 4) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 5;
      }
      else if (results.board[0] === 5 && results.board[1] === 5 && results.board[2] === 5 || results.board[1] === 5 && results.board[2] === 5 && results.board[3] === 5) {
        return bet * 10;
      }
      else if (results.board[0] === 6 && results.board[1] === 6 && results.board[2] === 6 || results.board[1] === 6 && results.board[2] === 6 && results.board[3] === 6) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 20;
      }
      else if (results.board[0] === 7 && results.board[1] === 7 && results.board[2] === 7 || results.board[1] === 7 && results.board[2] === 7 && results.board[3] === 7) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 35
      }
      else if (results.board[0] === 8 && results.board[1] === 8 && results.board[2] === 8 || results.board[1] === 8 && results.board[2] === 8 && results.board[3] === 8) {
        attackP.src = hero1.swordSwing;
        attackArea.style.visibility = "visible";
        return bet * 50;
      }
    }
    else if (results.board[0] === results.board[1] || results.board[2] === results.board[3] || results.board[1] === results.board[2]) {
        if (results.board[0] === 4 && results.board[1] === 4 || results.board[2] === 4 && results.board[3] === 4) {
            pScore.s = pScore.s + (bet * 2);

            return 0;
          }
        else if (results.board[0] === 5 && results.board[1] === 5 || results.board[2] === 5 && results.board[3] === 5 || results.board[1] === 5 && results.board[2] === 5) {
          attackP.src = hero1.swordSwing;
          attackArea.style.visibility = "visible";
          return bet * 1;
        }
        else if (results.board[0] === 6 && results.board[1] === 6 || results.board[2] === 6 && results.board[3] === 6 || results.board[1] === 6 && results.board[2] === 6) {
          attackP.src = hero1.swordSwing;
          attackArea.style.visibility = "visible";
          return bet * 2;
        }
        else if (results.board[0] === 7 && results.board[1] === 7 || results.board[2] === 7 && results.board[3] === 7 || results.board[1] === 7 && results.board[2] === 7) {
          attackP.src = hero1.swordSwing;
          attackArea.style.visibility = "visible";
          return bet * 5;
        }
        else if (results.board[0] === 8 && results.board[1] === 8 || results.board[2] === 8 && results.board[3] === 8 || results.board[1] === 8 && results.board[2] === 8) {
          attackP.src = hero1.swordSwing;
          attackArea.style.visibility = "visible";
          return bet * 6;
        }
        else {
          return 0;
        }
    }
  else {
      // add dom manip
      return 0;
    }
};

function payOutC(bet) {
  if (results.board[0] === results.board[1] && results.board[1] === results.board[2] && results.board[2] === results.board[3]) {
    // damage
      if (results.board.join('') == 1111) {
        return bet * 3
      }
      else if (results.board.join('') == 2222) {
        activeC.s = activeC.s + (bet * 2);
        return 0;
          }
      else if (rresults.board.join('') == 3333) {
        return bet * 5;
      }
      else if (results.board.join('') == 4444) {
        return bet * 10;
      }
      else if (results.board.join('') == 5555) {
        turnChange(true);
        return 0;
        }
      else if (results.board.join('') == 6666) {
        return bet * 25;
      }
      else if (results.board.join('') == 7777) {
        return bet * 50;
      }
      else if (results.board.join('') == 8888) {
        return bet * 100;
      }
          }
  else if (results.board[0] === results.board[1] && results.board[0] === results.board[2] || results.board[1] === results.board[2] && results.board[1] === results.board[3] ) {
      if (results.board[0] === 1 && results.board[1] === 1 && results.board[2] === 1 || results.board[1] === 1 && results.board[2] === 1 && results.board[3] === 1) {
        return bet * 1;
      }
      else if (results.board[0] === 2 && results.board[1] === 2 && results.board[2] === 2 || results.board[1] === 2 && results.board[2] === 2 && results.board[3] === 2) {
        return bet * 1.5;
      }
      else if (results.board[0] === 3 && results.board[1] === 3 && results.board[2] === 3 || results.board[1] === 3 && results.board[2] === 3 && results.board[3] === 3) {
          activeC.s = activeC.s + (bet * 2);
          return 0;
        }
      else if (results.board[0] === 4 && results.board[1] === 4 && results.board[2] === 4 || results.board[1] === 4 && results.board[2] === 4 && results.board[3] === 4) {
        return bet * 5;
      }
      else if (results.board[0] === 5 && results.board[1] === 5 && results.board[2] === 5 || results.board[1] === 5 && results.board[2] === 5 && results.board[3] === 5) {
        return bet * 10;
      }
      else if (results.board[0] === 6 && results.board[1] === 6 && results.board[2] === 6 || results.board[1] === 6 && results.board[2] === 6 && results.board[3] === 6) {
        return bet * 15;
      }
      else if (results.board[0] === 7 && results.board[1] === 7 && results.board[2] === 7 || results.board[1] === 7 && results.board[2] === 7 && results.board[3] === 7) {
        return bet * 20;
      }
      else if (results.board[0] === 8 && results.board[1] === 8 && results.board[2] === 8 || results.board[1] === 8 && results.board[2] === 8 && results.board[3] === 8) {
        return bet * 30;
      }
  }
  else if (results.board[0] === results.board[1] || results.board[2] === results.board[3] || results.board[1] === results.board[2]) {
      if (results.board[0] === 4 && results.board[1] === 4 || results.board[2] === 4 && results.board[3] === 4) {
          activeC.s = activeC.s + (bet * 2)
          return 0;
        }
      else if (results.board[0] === 5 && results.board[1] === 5 || results.board[2] === 5 && results.board[3] === 5 || results.board[1] === 5 && results.board[2] === 5) {
          return bet * 1;
        }
      else if (results.board[0] === 6 && results.board[1] === 6 || results.board[2] === 6 && results.board[3] === 6 || results.board[1] === 6 && results.board[2] === 6) {
          return bet * 1;
        }
      else if (results.board[0] === 7 && results.board[1] === 7 || results.board[2] === 7 && results.board[3] === 7 || results.board[1] === 7 && results.board[2] === 7) {
          return bet * 3;
        }
      else if (results.board[0] === 8 && results.board[1] === 8 || results.board[2] === 8 && results.board[3] === 8 || results.board[1] === 8 && results.board[2] === 8) {
          return bet * 10;
        }
          else {
            return 0;
          };
        }
  else {
      return 0
      }
  };

function payOutBonus() {
  pays = 0;
  if (bonus.d20[0] && bonus.d20[1] === bonus.d20[2]) {
    if (bonus.d20.join('') == 111) {
      pays = results.betAmount * 3
        activeC.s = activeC.s - pays;
      }
    else if (bonus.d20.join('') == 222) {
        pays = results.betAmount * 5
        pScore.s = pScore.s + pays;
      }
    else if (bonus.d20.join('') == 333) return bonus.freq += 3;
    else if (bonus.d20.join('') == 444) {
      pays = results.betAmount * 15
        activeC.s = activeC.s - pays;
      }
    else if (bonus.d20.join('') == 555) {
      pays = results.betAmount * 50
        activeC.s = activeC.s - pays;
      };

  };

};

 function randomizer(length, condition) {
   if (condition === true) return Math.floor(Math.random() * length);
   else {
    return Math.floor(Math.random() * length) + 1;
    };
  };

  function turnChange(condition){
    if (turnPlayer === 1) {
      if (activeC.stam > 0) {
        maxBet.style.visibility = "hidden";
        medBet.style.visibility = "hidden";
        minBet.style.visibility = "hidden";
        results.betAmount = randomizer(10, false);
        results.pull();
      }
      else if (activeC.stam === 0)  {
        turnPlayer -= 1;
        pScore.stam = randomizer(6, false);
        displayPScore.textContent = pScore.s;
        displayCScore.textContent = activeC.s;
        pStam.textContent = pScore.stam;
        cStam.textContent = activeC.stam;
        maxBet.style.visibility = "visible";
        medBet.style.visibility = "visible";
        minBet.style.visibility = "visible";
          };
        }
    else if (turnPlayer === 0) {
      maxBet.style.visibility = "visible";
      medBet.style.visibility = "visible";
      minBet.style.visibility = "visible";
      if (pScore.stam === 0) {
        turnPlayer += 1;
        activeC.stam = randomizer(8, false)
        results.betAmount = randomizer(10, false);
        displayPScore.textContent = pScore.s;
        displayCScore.textContent = activeC.s;
        displayPScore.textContent = pScore.s;
        pStam.textContent = pScore.stam;
        cStam.textContent = activeC.stam;
        heroActive.src = hero1.stand;
        turnChange();
        }
      }
    else if (condition === true) {
      turnPlayer = 1;
    };
};

function hideArea() {
  playArea.style.visibility = "hidden";
  playArea2.style.visibility = "hidden";
  attackArea.style.visibility = "hidden";
  turnStatus.style.visibility = "hidden";

}
