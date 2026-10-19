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

function onSwapClick() {
  const elBall1 = document.querySelector(".ball1");
  const elBall2 = document.querySelector(".ball2");
  const diameter1 = elBall1.innerText;
  const color1 = getComputedStyle(elBall1).backgroundColor;
  setBall(
    elBall1,
    elBall2.innerText,
    getComputedStyle(elBall2).backgroundColor,
  );
  setBall(elBall2, diameter1, color1);
}

function onShrinkClick() {
  shrinkBall(document.querySelector(".ball1"));
  shrinkBall(document.querySelector(".ball2"));
}

function shrinkBall(elBall) {
  let diameter = parseInt(elBall.innerText) - getRandomInt(20, 60);
  if (diameter < 100) diameter = 100;
  setBall(elBall, diameter, getComputedStyle(elBall).backgroundColor);
}

function onResetClick() {
  const elBalls = document.querySelectorAll(".ball1, .ball2");
  elBalls.forEach((elBall) => {
    elBall.removeAttribute("style");
    elBall.innerText = 100;
  });
  document.body.removeAttribute("style");
}
