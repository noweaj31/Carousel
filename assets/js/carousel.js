"use strict";

const carouselWrap = document.querySelector(".carousel-wrap");
const carouselItem = document.querySelector(".carousel-item");
const prevButton = document.querySelector(".carousel-arrow.prev");
const nextButton = document.querySelector(".carousel-arrow.next");
const totalCarousels = document.querySelectorAll(".carousel-item").length;
const carouselWidth = carouselItem.clientWidth;
let currentCarousel = 0;
let autocarouselInterval;

const initializeCarousel = () => {
  prevButton.disabled = true; //프리브버튼작동안함
  nextButton.disabled = false; //넥스트버튼작동함
};

const rotateCarousel = (direction) => {
  currentCarousel += direction; //현재카로셀인덱스에 디렉션추가
  const scrollX = currentCarousel * carouselWidth; //넘겨질때 현재카로셀인덱스 * 카로셀가로값

  if (currentCarousel === 0) {
    //현재카로셀인덱스가 0일때
    prevButton.disabled = true; //프레브버튼꺼짐
  } else {
    prevButton.disabled = false; // 현재카로셀인덱스가 0이 아니면 프레브버튼꺼지지않음
  }

  if (currentCarousel === totalCarousels - 1) {
    //현재카로셀인덱스가 총카로셀개수-1일때
    nextButton.disabled = true; //넥스트버튼꺼짐
    stopAutoCarousel(); //자동카로셀멈춤
  } else {
    nextButton.disabled = false; //현재카로셀인덱스가 총카로셀개수-1과 같지않을때 넥스트버튼꺼지지않음
  }

  carouselWrap.scrollTo({
    left: scrollX, //x축 왼쪽으로 넘어가는 스크롤
    behavior: "smooth",
  });
};

const startAutoCarousel = () => {
  autocarouselInterval = setInterval(() => {
    //자동카로셀을 3초마다 반복시작
    rotateCarousel(1); //+1씩 넘겨짐
  }, 3000);
};

const stopAutoCarousel = () => {
  clearInterval(autocarouselInterval); //자동카로셀을 반복중단
};

nextButton.addEventListener("click", () => {
  //넥스트버튼을 클릭 시
  rotateCarousel(1); //+1씩 넘겨짐
  stopAutoCarousel(); //자동카로셀중단
});

prevButton.addEventListener("click", () => {
  //프레브버튼 클릭 시
  rotateCarousel(-1); //-1씩 넘겨짐
  stopAutoCarousel(); //자동카로셀중단
});

initializeCarousel(); //버튼 초기값 셋팅
startAutoCarousel(); //자동시작실행
