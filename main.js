const INITIAL_STATE = {
  balls: [
    { diameter: 100, color: "tomato" },
    { diameter: 100, color: "royalblue" },
  ],
  bgColor: "black",
};

let gState = structuredClone(INITIAL_STATE);
let gHistory = [structuredClone(gState)];
let gHistoryIdx = 0;
let gHoverTimeout;
let gAutoPlayInterval;
let gCycleCount;
let gMoveCount = 0;
let gTimerInterval;

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
  document.querySelector(".undo-btn").disabled = gHistoryIdx === 0;
  document.querySelector(".redo-btn").disabled =
    gHistoryIdx === gHistory.length - 1;
}

function startTimer() {
  const startTime = Date.now();
  gTimerInterval = setInterval(() => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    document.querySelector(".timer").innerText = formatTime(seconds);
  }, 1000);
}

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function saveMove() {
  if (!gTimerInterval) startTimer();
  gHistory = gHistory.slice(0, gHistoryIdx + 1);
  gHistory.push(structuredClone(gState));
  gHistoryIdx++;
  gMoveCount++;
  render();
  document.title = `The Ball Game (${gMoveCount} moves)`;
}

function onUndo() {
  if (gHistoryIdx === 0) return;
  gHistoryIdx--;
  gState = structuredClone(gHistory[gHistoryIdx]);
  render();
}

function onRedo() {
  if (gHistoryIdx === gHistory.length - 1) return;
  gHistoryIdx++;
  gState = structuredClone(gHistory[gHistoryIdx]);
  render();
}

function onBallClick(ballIdx, maxDiameter) {
  const ball = gState.balls[ballIdx];
  ball.diameter += getRandomInt(20, 60);
  if (ball.diameter > maxDiameter) ball.diameter = 100;
  ball.color = getRandomColor();
  saveMove();
}

function onSwapClick() {
  gState.balls.reverse();
  saveMove();
}

function onShrinkClick() {
  gState.balls.forEach((ball) => {
    ball.diameter -= getRandomInt(20, 60);
    if (ball.diameter < 100) ball.diameter = 100;
  });
  saveMove();
}

function onBgClick() {
  gState.bgColor = getRandomColor();
  saveMove();
}

function onResetClick() {
  gState = structuredClone(INITIAL_STATE);
  saveMove();
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

render();
