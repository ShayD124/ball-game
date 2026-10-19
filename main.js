function onBallClick(elBall) {
  const diameter = elBall.offsetWidth + 50;
  elBall.style.width = diameter + "px";
  elBall.style.height = diameter + "px";
  elBall.innerText = diameter;
}
