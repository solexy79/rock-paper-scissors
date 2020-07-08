//MODAL
const btnOpenModal = document.querySelector('#openModal');
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modalContent');
const btnCloseModal = document.querySelector('#closeModal');
const scoreboard = {
  scores : 0,
  name : "lonewolf"
};

btnOpenModal.addEventListener('click', () =>{
  modal.style.display = 'block';
  modalContent.style.display = 'block';
});

btnCloseModal.addEventListener('click', () =>{
  modal.style.display = 'none';
  modalContent.style.display = 'none';
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
})

//game
const step1 = document.querySelector('#step1')
const choices = step1.querySelectorAll('div');
const scoreBoard = document.querySelector('.score-board');
const score = document.querySelector('#score');
const step2 = document.querySelector('#step2');
const userIcon = document.querySelector('#userIcon');
const houseIcon = document.querySelector('#houseIcon');
const winner = document.querySelector('#winner');
const btnPlayAgain = document.querySelector('#playAgain');

//SOUNDS
const bgSound = document.querySelector("[data-sound=bg-sound]");
const audioUserChoice = document.querySelector("[data-sound=user-choice]");
const audioYouWin = document.querySelector("[data-sound=you-win]");
const audioYouLose = document.querySelector("[data-sound=you-lose]");
const audioDraw = document.querySelector("[data-sound=draw]");



//play Game

function play(e){
  audioUserChoice.play();
  btnPlayAgain.style.display = 'block';
  step2.style.display = 'block';
  const playerChoice = (e.target.classList[1]);
  const computerChoice = getComputerChoice();
  const whoWon = getWinner(playerChoice, computerChoice);
  showWinner(whoWon);
  changeColor(score, scoreBoard);
  step1.style.display = 'none';
  step1.parentElement.style.backgroundImage = 'none' ;

  userIcon.classList.add(playerChoice) ;
  houseIcon.classList.add(computerChoice) ;
  console.log(playerChoice, computerChoice, whoWon);
  
  btnPlayAgain.addEventListener('click', () =>{
    step2.style.display = 'none';
    playAgain.style.display = 'none';
    userIcon.classList.remove(playerChoice) ;
    houseIcon.classList.remove(computerChoice) ;
    step1.style.display = 'block';
    step1.parentElement.style.backgroundImage = 'url(../images/bg-pentagon.svg)' ;
  })
    
}

//computer choice
function getComputerChoice(){
  const rand = Math.floor(Math.random()*5);
  if (rand=== 0){
    return  'scissors' ;
  }else if(rand=== 1){
    return  'spock' ;
  }else if(rand=== 2){
    return 'paper';
  }else if(rand=== 3){
    return 'lizard'; 
  }else{
    return 'rock';
  }
}

// Get Game Winner 
function getWinner(p, c){
  if (p === c){
    return ' its a draw';
  }else if(p === 'scissors'){
      if(c === 'paper' || c=== 'lizard'){
        return 'player';
      }else{
        return 'computer';
      }
  } else if (p === 'spock'){
      if(c === 'rock' || c === 'scissors'){
        return 'player';
      }else{
        return 'computer';
      }
  } else if (p === 'paper'){
      if(c === 'rock' || c === 'spock'){
        return 'player';
      }else{
        return 'computer';
      }
  } else if (p === 'lizard'){
      if(c === 'spock' || c === 'paper'){
        return 'player';
      }else{
        return 'computer';
      }
  }  else if (p === 'rock'){
      if(c === 'lizard' || c === 'scissors'){
        return 'player';
      }else{
        return 'computer';
      }
  }
}


//Show Winner
function showWinner(whoWon ){ 
  if(whoWon == 'player'){
    //increase player score
    scoreboard.scores++;
    //Show on the UI
    winner.innerHTML = `
    <h1 class= 'text-win'>You win &#129299</h1>`;
    setTimeout(() => { audioYouWin.play() }, 1000);
  }else if(whoWon == 'computer'){
    //decrease player score
    scoreboard.scores-- ;
    //Show on the UI
    winner.innerHTML = `
    <h1 class= 'text-lose'>You lose &#128542;</h1>`;
    setTimeout(() => { audioYouLose.play() }, 1000);
  }else{
    winner.innerHTML = `
    <h1 >It's a draw &#128561;</h1>`;
    setTimeout(() => { audioDraw.play() }, 1000);
  }
  score.innerHTML = `${scoreboard.scores}`
  console.log( score.innerHTML);
  
}
function changeColor(score,scoreBoard) {
  if(score.innerHTML >= 1){
    scoreBoard.style.background = '#00ff00';
  }else if(score.innerHTML < 0){
    scoreBoard.style.background = '#ff2200';
    scoreBoard.style.color = '#fff';
  }else{
    scoreBoard.style.background = '#fff' ;
    scoreBoard.style.color = 'hsl(229, 25%, 31%)';
  }
};

//Event Listeners
choices.forEach(choice => choice.addEventListener('click', play));
document.querySelector("#switch").addEventListener("click", (e) => {
  e.target.classList.toggle('playBgSound');
  e.target.classList.contains("playBgSound") ? bgSound.play() : bgSound.pause();
})


