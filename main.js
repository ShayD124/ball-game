let diameter = parseInt(elBall.innerText) + getRandomInt(20, 60);

function onBallClick(elBall) {
  let diameter = parseInt(elBall.innerText) + 50;
  if (diameter > 400) diameter = 100;
  elBall.style.width = diameter + "px";
  elBall.style.height = diameter + "px";
  elBall.innerText = diameter;
  elBall.style.backgroundColor = getRandomColor();
}
