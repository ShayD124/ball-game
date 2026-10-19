let gHoverTimeout;
let gAutoPlayInterval;
let gCycleCount;

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

function onBgClick() {
  document.body.style.backgroundColor = getRandomColor();
}

function onResetClick() {
  const elBalls = document.querySelectorAll(".ball1, .ball2");
  elBalls.forEach((elBall) => {
    elBall.removeAttribute("style");
    elBall.innerText = 100;
  });
  document.body.removeAttribute("style");
}

function onResetEnter() {
  gHoverTimeout = setTimeout(startAutoPlay, 2000);
}

function onResetLeave() {
  clearTimeout(gHoverTimeout);
  clearInterval(gAutoPlayInterval);
}

function startAutoPlay() {
  gCycleCount = 0;
  gAutoPlayInterval = setInterval(playBalls, 2000);
}

function playBalls() {
  gCycleCount++;
  if (gCycleCount === 10) clearInterval(gAutoPlayInterval);

  onBallClick(document.querySelector(".ball1"), 400);
  onBallClick(document.querySelector(".ball2"), 250);
  onSwapClick();
  onShrinkClick();
}
