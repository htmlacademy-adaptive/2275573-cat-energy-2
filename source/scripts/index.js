document.querySelector('.nav').classList.remove('nav--nojs');
const menuToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');

menuToggle.addEventListener ('click', () => {
  navList.classList.toggle('nav__list--opened');
  menuToggle.classList.toggle('nav__toggle--active');
});

/* КАРТА */
const getCenter = () => {
  if (window.innerWidth < 1280) {
    return [59.938592, 30.322989];
  } else {
    return [59.938875, 30.317778];
  }
};

const placemarkImageSet = (placemark) => {
  if (window.innerWidth < 768) {
    placemark.options.set({
      iconImageHref: 'images/maps/map-pin-mobile@1x.png',
      iconImageSize: [56, 52],
      iconImageOffset: [-30, -37]
    });
  } else if ((window.devicePixelRatio >= 2) & (window.innerWidth < 768)) {
    placemark.options.set({
      iconImageHref: 'images/maps/map-pin-mobile@2x.png',
      iconImageSize: [56, 52],
      iconImageOffset: [-30, -37]
    });
  } else if ((window.devicePixelRatio >= 2) & (window.innerWidth >= 768)) {
    placemark.options.set({
      iconImageHref: 'images/maps/map-pin-tablet@2x.png',
      iconImageSize: [113, 106],
      iconImageOffset: [-60, -90]
    });
  } else {
    placemark.options.set({
      iconImageHref: 'images/maps/map-pin-tablet@1x.png',
      iconImageSize: [113, 106],
      iconImageOffset: [-60, -90]
    });
  }
};

const ymaps = window.ymaps;
ymaps.ready(() => {
  const center = getCenter();

  const map = new ymaps.Map('map', {
    center: center,
    zoom: 16,
    controls: ['zoomControl']
  });

  const placemark = new ymaps.Placemark([59.938592, 30.322989], {}, {
    iconLayout: 'default#image',
  });
  placemarkImageSet(placemark);
  map.geoObjects.add(placemark);

  window.addEventListener('resize', () => {
    const newCenter = getCenter();
    map.setCenter(newCenter);

    placemark.geometry.setCoordinates([59.938592, 30.322989]);
    placemarkImageSet(placemark);
  });

  setInterval(() =>{
    document.querySelectorAll('#map ymaps')[0].style.height = 'auto';
    document.querySelectorAll('#map ymaps')[1].style.height = 'auto';
    const height = `${document.querySelector('#map').offsetHeight}px`;
    document.querySelectorAll('#map ymaps')[0].style.height = height;
    document.querySelectorAll('#map ymaps')[1].style.height = height;
    map.container.fitToViewport();
  },1000);
});


/* SLIDER */

const pauseEvents = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

const slider = (sliderElement) => {
  const sliderBlock = document.querySelector(sliderElement);
  if (!sliderBlock) {
    return;
  }
  const before = sliderBlock.querySelector('.slider__block--before');
  const after = sliderBlock.querySelector('.slider__block--after');
  const change = sliderBlock.querySelector('.slider__range');
  let isActive = false;
  const beforeAfterSlider = (x) => {
    const shift = Math.max(0, Math.min(x, sliderBlock.offsetWidth));
    before.style.clipPath = `inset(0 ${sliderBlock.offsetWidth - shift}px 0 0 )`;
    after.style.clipPath = `inset(0 0 0 ${shift}px)`;
    change.style.left = `${shift}px`;
  };
  sliderBlock.addEventListener('mouseup', () => {
    isActive = false;
  });
  sliderBlock.addEventListener('mouseleave', () => {
    isActive = false;
  });
  sliderBlock.addEventListener('mousedown', () => {
    isActive = true;
  });

  sliderBlock.addEventListener('mousemove', (e) => {
    if (!isActive) {
      return;
    }
    let cursorPosition = e.pageX;
    cursorPosition -= sliderBlock.getBoundingClientRect().left;
    beforeAfterSlider(cursorPosition);
    pauseEvents(e);
  });
  change.addEventListener('touchstart', () => {
    isActive = true;
  });
  sliderBlock.addEventListener('touchend', () => {
    isActive = false;
  });
  sliderBlock.addEventListener('touchcancel', () => {
    isActive = false;
  });
  sliderBlock.addEventListener('touchmove', (e) => {
    if (!isActive) {
      return;
    }
    for (let i = 0; i < e.changedTouches.length; i++) {
      let touchPosition = e.changedTouches[i].pageX;
      touchPosition -= sliderBlock.getBoundingClientRect().left;
      beforeAfterSlider(touchPosition);
      pauseEvents(e);
    }
  });
};

if(slider){
  slider('.slider');
}
