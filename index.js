let grid = document.querySelector(".grid"); 
let popup = document.querySelector(".popup"); 
let playAgain = document.querySelector(".playAgain"); 
let scoreDisplay = document.querySelector(".scoreDisplay"); 
let left = document.querySelector(".left"); 
let bottom = document.querySelector(".bottom"); 
let right = document.querySelector(".right"); 
let up = document.querySelector(".top"); 
// the width of the grid 
let width = 10; 
let currentIndex = 0; 
let appleIndex = 0; 
// currentSnake is our game snake - yes it's an array
let currentSnake = [2,1,0]; 
let direction = 1; 
let score = 0; 
let speed = 0.8; 
let intervalTime = 0; 
let interval = 0;

// Event listener DOMContentLoaded is fired once the HTML loads on our screen
document.addEventListener("DOMContentLoaded",function(){ 
    document.addEventListener("keydown",control); 
    createBoard(); 
    startGame(); 
    playAgain.addEventListener("click", replay); 
    });

// Our grid is 10 x 10 so we need 100 divs, hence loop to 100 
function createBoard(){ 
    popup.style.display = "none"; 
    for (let i=0 ; i<100 ; i++) {
    let div =document.createElement("div"); 
    grid.appendChild(div); 
    };
}; 

// Start game function 
// Divs created at runtime 
function startGame() { 
    let squares = document.querySelectorAll(".grid div"); 
    randomApple(squares); 
    // random apple, select spot for apple because a snake has gotta eat
    direction = 1; // refers to where snake is headed plus or minus 1 for right and left
    scoreDisplay.innerHTML = score; 
    intervalTime = 1000; // sets time for snake to move in milliseconds
    currentSnake = [2,1,0]; 
    currentIndex = 0; 
    currentSnake.forEach(index => squares[index].classList.add("snake")); 
    interval = setInterval(moveOutcome, intervalTime); 
    }; 

function moveOutcome() { 
    let squares = document.querySelectorAll(".grid div"); 
    if (checkForHits(squares)) {
        alert("you hit something"); 
        popup.style.display = "flex"; 
        return clearInterval(interval); 
    } else { 
        moveSnake(squares); 
        }
    }; 

function moveSnake(squares) {
    // remove the last element of the current snake array
    let tail = currentSnake.pop();  
    squares[tail].classList.remove("snake"); 
    currentSnake.unshift(currentSnake[0]+direction);  
    // movement ends here  
    eatApple(squares, tail);  
    squares[currentSnake[0]].classList.add("snake");  
}; 

function checkForHits(squares){  
    if (  
    (currentSnake[0] + width >= (width*width) && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||   
    (currentSnake[0] % width === 0 && direction === -1) ||   
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")   
    ) { 
    return true;  
    } else {  
    return false; 
    }
};

function eatApple(squares, tail) { 
    if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple"); 
    // Snake eats an apple and we add the tail we popped back to the array
    squares[tail].classList.add("snake"); 
    currentSnake.push(tail);
    randomApple(squares); 
    score++; 
    scoreDisplay.textContent = score; 
    clearInterval(interval); 
    intervalTime = intervalTime * speed; 
    interval = setInterval(moveOutcome, intervalTime); 
    }
}; 

function randomApple(squares) { 
    do { 
    appleIndex = Math.floor(Math.random() * squares.length); 
    } while (squares[appleIndex].classList.contains("snake")) 
    squares[appleIndex].classList.add("apple"); 
};

// Controls 

function control(e){ 
    if (e.code === 'ArrowRight') {
    direction = 1; // right 
    } else if (e.code === 'ArrowUp') { 
    direction = -width; // if we press the up arrow, the snake will go ten divs up
    } else if (e.code === 'ArrowLeft') { 
    direction = -1; // left, the snake will go left one div
    } else if (e.code === 'ArrowDown') {
    direction = +width; // down, the snake head will instantly appear 10 divs below from the current div 
    } 
};  

// Mobile Device
up.addEventListener("click", () => direction = -width ); 
bottom.addEventListener("click",() => direction = +width ); 
left.addEventListener("click", () => direction = -1 ); 
right.addEventListener("click", () => direction = 1 ); 

// Clear the grid 
function replay() { 
    grid.innerHTML = ""; 
    createBoard();   
    startGame();  
    popup.style.display = "none"; 
};  