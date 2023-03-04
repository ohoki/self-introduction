'use strict';

// Navbar
// 1. 스크롤 시 Navbar 고정
const nav = document.querySelector('#navbar');
const navHeight = nav.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY >= navHeight) {
    nav.classList.add('navbar__scroll');
  } else {
    nav.classList.remove('navbar__scroll');
  }
});
// 2.토글 버튼 클릭 시 메뉴 활성화
const navToggleBtn = document.querySelector('.navbar__Toggle');
const navMenu = document.querySelector('.navbar__menu');
navToggleBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});
// 3.navbar__menu__item 클릭 시 해당 섹션 이동
navMenu.addEventListener('click', (e) => {
  const targetLink = e.target.dataset.link;
  navMenu.classList.remove('open');
  scrollTo(targetLink);
});

//Home
const contactBtn = document.querySelector('.home__right__btn');
contactBtn.addEventListener('click', () => {
  scrollTo('#contact');
});

//Arrow button
// 1.home섹션 중간 넘어가면 arrow button 활성화
const arrowBtn = document.querySelector('.arrowBtn');
const home = document.querySelector('#home');
const homeHeigt = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
if (window.scrollY >= homeHeigt/2) {
  arrowBtn.classList.add('visible');
} else {
  arrowBtn.classList.remove('visible');
};
});
// 2.arrow button 누르면 home 섹션 이동
arrowBtn.addEventListener('click', () => {
scrollTo('#home');
});

//Works
// 1.workBtn selected 그 외 버튼 selected 제거 
const workBtnContainer = document.querySelector('.work__categories');
workBtnContainer.addEventListener('click', (e) => {
const selectedBtn = document.querySelector('.category__btn.selected');
const selected = 
      e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
console.log(selectedBtn);
if (!selectedBtn) {
  selected.classList.add('selected');
} else {
  selectedBtn.classList.remove('selected');
  selected.classList.add('selected');
};
});


//Function
function scrollTo(targetLink) {
  const selectTargetLink = document.querySelector(targetLink);
  selectTargetLink.scrollIntoView({behavior: 'smooth'});
};

