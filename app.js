const slideBodyElm = document.querySelector("#slide_body");
const prevBtnElm = document.querySelector("#prev_btn");
const nextBtnElm = document.querySelector("#next_btn");
const indicatorListElm = document.querySelector("#indicator-list");
const indicatorItemElmArray = document.querySelectorAll(".indicator-item");
const totalSlides = indicatorItemElmArray.length;
let count = 0; // 表示するスライドの位置
let timerId; // 自動再生で使用するタイマーのIDが入る

// 現在表示しているインジケータに色をつける関数
const updateIndicatorItemBackground = () => {
  for (let i = 0; i < indicatorItemElmArray.length; i++) {
    indicatorItemElmArray[i].style.backgroundColor = i === count % totalSlides ? "#000" : "#fff";
  }
}

// 「次へ」ボタンのハンドラ
const nextSlide = () => {
  slideBodyElm.classList.remove(`slide${count % totalSlides + 1}`);
  count++;
  slideBodyElm.classList.add(`slide${count % totalSlides + 1}`);
  updateIndicatorItemBackground();
}

// 「戻る」ボタンのハンドラ
const prevSlide = () => {
  slideBodyElm.classList.remove(`slide${count % totalSlides + 1}`);
  count--;
  if (count < 0) count = totalSlides - 1;
  slideBodyElm.classList.add(`slide${count % totalSlides + 1}`);
  updateIndicatorItemBackground();
}

// 自動再生を始める関数。使用するタイマーのIDは timerId に格納
const startAutoPlay = () => {
  timerId = setInterval(nextSlide, 3000);
}

// 自動再生を一度リセットして再び再生する関数。
const restartAutoPlay = () => {
  clearInterval(timerId);
  startAutoPlay();
}

// 各ボタンのクリックイベントに各ハンドラーを登録
nextBtnElm.addEventListener("click", () => {
  nextSlide();
  restartAutoPlay();
});
prevBtnElm.addEventListener("click", () => {
  prevSlide();
  restartAutoPlay();
});

// インジケーターがクリックされたら、クリックされた要素を表示する
indicatorListElm.addEventListener("click", (event) => {
  if (event.target.classList.contains("indicator-item")) {
    const index = Array.from(indicatorItemElmArray).indexOf(event.target);
    slideBodyElm.classList.remove(`slide${count % totalSlides + 1}`);
    count = index;
    slideBodyElm.classList.add(`slide${count % totalSlides + 1}`);
    updateIndicatorItemBackground();
    restartAutoPlay()
  }
});

// 自動再生開始
startAutoPlay();