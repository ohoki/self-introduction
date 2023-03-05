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
  selectNavItem(e.target);
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
  if (!selectedBtn) {
    selected.classList.add('selected');
  } else {
    selectedBtn.classList.remove('selected');
    selected.classList.add('selected');
  };
});
// 2.workBtn 선택 시 해당 Project 나타나기
const projectsContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = 
  e.target.dataset.filter || e.target.parentNode.dataset.filter;
  projectsContainer.classList.add('anm-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter == '*' || project.dataset.type === filter) {
        project.classList.remove('project__invisible');
      } else {
        project.classList.add('project__invisible');
      }
      projectsContainer.classList.remove('anm-out');
    });
  }, 300);
});

//추가기능 - 스크롤 시 Navbar 메뉴 아이템 활성화
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));

let selectedNavItem = navItems[0];
let selectedNavIndex = 0;

function selectNavItem(selected) {
  selectedNavItem.classList.remove('selected');
  selectedNavItem = selected;
  selectedNavItem.classList.add('selected');
};

const observerOptions = {root: null, rootMargin: '0px', threshold: 0.3,};
const observerCallback = (entries,observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index +1;
      } else {
        selectedNavIndex = index -1;
      };
    };
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
  if(window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if(window.scrollY + window.innerHeight === document.body.clientHeight) {
    selectedNavIndex = navItems.length -1;
  };
  selectNavItem(navItems[selectedNavIndex]);
});

//Function
function scrollTo(targetLink) {
  const selectTargetLink = document.querySelector(targetLink);
  selectTargetLink.scrollIntoView({behavior: 'smooth'});
  selectNavItem(navItems[sectionIds.indexOf(targetLink)]);
};
