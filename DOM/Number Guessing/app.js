let min = 1,
  max = 10,
  winningNum = 2,
  guessesLeft = 3;

const game = document.getElementById("game"),
  minNum = document.querySelector("span.min-num"),
  maxNum = document.querySelector("span.max-num"),
  guessBtn = document.getElementById("guess-value"),
  guessInput = document.getElementById("guess-input"),
  message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Enter a Number Between ${min} and ${max}`, "red");
  } else {
    if (guess === winningNum) {
      gameOver(true, `${winningNum} is correct. You Win.`);
    } else {
      guessesLeft--;
      if (guessesLeft === 0) {
        gameOver(
          false,
          `Game Over. You Lost. The correct number was ${winningNum}`
        );
      } else {
        guessInput.style.borderColor = "red";
        setMessage(
          `${guess} is Not Correct. ${guessesLeft} guesses left`,
          "red"
        );
        guessInput.value = "";
      }
    }
  }
});

gameOver = (win, msg) => {
  let color = win === true ? "green" : "red";
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);
};

setMessage = (msg, color) => {
  message.textContent = msg;
  message.style.color = color;
};
