const INITIAL_STATE = {
  balls: [
    { diameter: 100, color: "tomato" },
    { diameter: 100, color: "royalblue" },
  ],
  bgColor: "black",
};

let gState = structuredClone(INITIAL_STATE);
let gHoverTimeout;
let gAutoPlayInterval;
let gCycleCount;

function render() {
  const elBalls = [
    document.querySelector(".ball1"),
    document.querySelector(".ball2"),
  ];
  gState.balls.forEach((ball, idx) => {
    const elBall = elBalls[idx];
    elBall.style.width = ball.diameter + "px";
    elBall.style.height = ball.diameter + "px";
    elBall.innerText = ball.diameter;
    elBall.style.backgroundColor = ball.color;
  });
  document.body.style.backgroundColor = gState.bgColor;
}

function onBallClick(ballIdx, maxDiameter) {
  const ball = gState.balls[ballIdx];
  ball.diameter += getRandomInt(20, 60);
  if (ball.diameter > maxDiameter) ball.diameter = 100;
  ball.color = getRandomColor();
  render();
}

function onSwapClick() {
  gState.balls.reverse();
  render();
}

function onShrinkClick() {
  gState.balls.forEach((ball) => {
    ball.diameter -= getRandomInt(20, 60);
    if (ball.diameter < 100) ball.diameter = 100;
  });
  render();
}

function onBgClick() {
  gState.bgColor = getRandomColor();
  render();
}

function onResetClick() {
  gState = structuredClone(INITIAL_STATE);
  render();
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

  onBallClick(0, 400);
  onBallClick(1, 250);
  onSwapClick();
  onShrinkClick();
}
