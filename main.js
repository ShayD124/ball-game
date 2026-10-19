function onBallClick(elBall, maxDiameter) {
  let diameter = parseInt(elBall.innerText) + getRandomInt(20, 60);
  if (diameter > maxDiameter) diameter = 100;
  setBall(elBall, diameter, getRandomColor());
}

function setBall(elBall, diameter, color) {
  elBall.style.width = diameter + "px";
  elBall.style.height = diameter + "px";
  elBall.innerText = diameter;
  elBall.style.backgroundColor = color;
}
