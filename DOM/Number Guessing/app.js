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
  }
  if (guess === winningNum) {
    guessInput.disabled = true;
    guessInput.style.borderColor = "green";
    setMessage(`${winningNum} is correct. You Win.`, "green");
  } else {
  }
});

setMessage = (msg, color) => {
  message.textContent = msg;
  message.style.color = color;
};
