//Navigation

document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const curPos = window.scrollY;
    const divs = document.querySelectorAll('section > a');
    const links = document.querySelectorAll('#navigationHeader a');

    divs.forEach((el) => {

        if (el.offsetTop <= curPos && (el.offsetTop + el.parentElement.offsetHeight) > curPos) {
            links.forEach((a) => {
                a.classList.remove('navigation__link_active');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('navigation__link_active');
                }
                if (curPos >= document.body.scrollHeight - window.innerHeight) {
                    a.classList.remove('navigation__link_active');
                    document.querySelector('.navigation__contact').classList.add('navigation__link_active');
                }
            });
        }
    });
}

//Slider

const items = document.querySelectorAll('.slider__slides');
const slider = document.querySelector(".slider");
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
        console.log(currentItem);
        if (currentItem == 1) {
            slider.classList.remove('red');
            slider.classList.add('blue');
        } else {
            slider.classList.remove('blue');
            slider.classList.add('red');
        }
    })
}

function previousItem(n) {
    hideItem('to-left');
    changeCurrentItem(n - 1);
    showItem('from-right');
}

function nextItem(n) {
    hideItem('to-right');
    changeCurrentItem(n + 1);
    showItem('from-left');
}

document.querySelector('.slider__left-arrow').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.slider__right-arrow').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
});

/*
const left_arrow = document.querySelector(".slider__left-arrow");
const right_arrow = document.querySelector(".slider__right-arrow");
const slides = document.getElementsByClassName("slider__slides");
const slider = document.querySelector(".slider");
let slideIndex = 1;
showSlides(slideIndex);
left_arrow.addEventListener('click', (e) => {
  plusSlides(-1);
});
right_arrow.addEventListener('click', (e) => {
  plusSlides(1);
});
function plusSlides(n) {
  showSlides(slideIndex += n);
  blackScreenHorizontal.classList.remove('screen-on');
  blackScreenVertical.classList.remove('screen-on');
}
function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "";
    if (slideIndex - 1 == 1){
      slider.classList.add('blue');
    }
    else {
      slider.classList.remove('blue');
    }
}
*/

//Iphone's screen

let verticalIphoneButton = document.querySelector('.iphone-vertical__button');
let blackScreenVertical = document.querySelector('.slider__black-screen-vertical');

verticalIphoneButton.addEventListener('click', (event) => {
    blackScreenVertical.classList.toggle('screen-on');
});

let horizontalIphoneButton = document.querySelector('.iphone-horizontal__button');
let blackScreenHorizontal = document.querySelector('.slider__black-screen-horizontal');

horizontalIphoneButton.addEventListener('click', (event) => {
    blackScreenHorizontal.classList.toggle('screen-on');
})

//Portfolio. Switching tabs

let portfolioImages = document.querySelectorAll('.layout-4-column__img');
const tags = document.querySelector('.portfolio__tags');

tags.addEventListener('click', (event) => {
    if (event.target.tagName === "SPAN") {
        tags.querySelectorAll('.tags__tag').forEach(item => item.classList.remove('tag_active'));
        event.target.classList.add('tag_active');
        changeImg();
    }
    return;
});

function changeImg() {
    let images = [...document.querySelectorAll('.layout-4-column__img')];
    let imagesContainer = document.querySelector('.layout-4-column');
    let fragment = document.createDocumentFragment();

    while (images.length) {
        let img = images.splice(Math.floor(Math.random() * images.length), 1)[0];
        fragment.append(img);
    }
    imagesContainer.append(fragment);
}

//Portfolio. Image selection

document.querySelector('.layout-4-column').addEventListener('click', (event) => {
    if (event.target.className === "layout-4-column__img") {
        document.querySelectorAll('.layout-4-column__img').forEach(item => item.classList.remove('layout-4-column__img_active'));
        event.target.classList.add('layout-4-column__img_active');
    }
    return;
});

// Form submitting

document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();
    let subject = document.querySelector('.subject').value;
    subject = subject === '' ? "Без темы" : "Тема: " + subject;
    if (document.querySelector('.name').checkValidity() && document.querySelector('.email').checkValidity()) {
        document.querySelector('.modal__subject').innerHTML = '';
        document.querySelector('.modal__subject').innerHTML = subject;
        let description = document.querySelector('.form__textarea').value;
        description = description === '' ? "Без описания" : "Описание: " + description;
        document.querySelector('.modal__description').innerHTML = '';
        document.querySelector('.modal__description').innerHTML = description;
        document.querySelector('.quote__modal').style.display = "";
    }
})

document.querySelector('.modal__footer button').addEventListener('click', (event) => {
    subject = '';
    description = '';
    document.querySelector('.subject').value = '';
    document.querySelector('.form__textarea').value = '';
    document.querySelector('.name').value = '';
    document.querySelector('.email').value = '';
    document.querySelector('.quote__modal').style.display = "none";
})