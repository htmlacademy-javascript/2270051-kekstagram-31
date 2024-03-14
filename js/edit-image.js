// const log = console.log;

// пока что сделала попап всегда видимым
// const uploadOverlay = document.querySelector('.img-upload__overlay');
// uploadOverlay.classList.remove('hidden');

const scaleValue = document.querySelector('.scale__control--value'); // масштаб картинки в процентах
const btnScaleMinus = document.querySelector('.scale__control--smaller'); // кнопка "-"
const btnScalePlus = document.querySelector('.scale__control--bigger'); // кнопка "+"
const imgPreview = document.querySelector('.img-upload__preview'); // превью загружаемой картинки

// const imgEffectLevel = document.querySelector('.img-upload__effect-level'); // контейнер слайдера
const effectValue = document.querySelector('.effect-level__value'); // поле для записи интенсивности эффекта на картинке
const effectSlider = document.querySelector('.effect-level__slider'); // ползунок слайдера

const maxScale = 100; // максимальный масштаб
const minScale = 25; // минимальный масштаб
const defaultScale = 100; // начальное значение масштаба
const stepScale = 25; // шаг изменения масштаба
let currentScale; // текущее значение масштаба

// функция для установки масштаба изображения
const setScale = (scale) => {
  currentScale = scale;
  scaleValue.value = `${currentScale}%`;
  imgPreview.style.transform = `scale(${currentScale / maxScale})`;
};

// функция для изменения масштаба изображения
const changeScale = (deltaScale) => {
  let tempScale = currentScale;
  tempScale += deltaScale;
  if (tempScale > maxScale) {
    tempScale = maxScale;
  } else if (tempScale < minScale) {
    tempScale = minScale;
  }
  setScale(tempScale);
};

// обработчики событий на кнопки "+" и "-"
btnScalePlus.addEventListener('click', () => changeScale(stepScale));
btnScaleMinus.addEventListener('click', () => changeScale(-stepScale));

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
});

export { setScale, defaultScale };


