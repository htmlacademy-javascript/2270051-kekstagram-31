// const log = console.log;

// пока что сделала попап всегда видимым
// const uploadOverlay = document.querySelector('.img-upload__overlay');
// uploadOverlay.classList.remove('hidden');

const scaleValue = document.querySelector('.scale__control--value'); // масштаб картинки в процентах
const btnScaleMinus = document.querySelector('.scale__control--smaller'); // кнопка "-"
const btnScalePlus = document.querySelector('.scale__control--bigger'); // кнопка "+"
const imgPreview = document.querySelector('.img-upload__preview'); // превью загружаемой картинки
const imgEffectLevel = document.querySelector('.img-upload__effect-level'); // контейнер слайдера
const effectValue = imgEffectLevel.querySelector('.effect-level__value'); // поле для записи интенсивности эффекта на картинке
const effectSlider = imgEffectLevel.querySelector('.effect-level__slider'); // ползунок слайдера
const effectsList = document.querySelector('.effects__list'); // иконки с эффектами

const maxScale = 100; // максимальный масштаб
const minScale = 25; // минимальный масштаб
const defaultScale = 100; // начальное значение масштаба
const stepScale = 25; // шаг изменения масштаба
let currentScale; // текущее значение масштаба

// const defaultEffect = 'none'; // начальный эффект "Оригинал"
let currentEffect = 'none'; // текущий эффект

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

// инициализация слайдера
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
});

// функция для применения эффекта к картинке
const applyEffect = (effect, value) => {
  if (effect === 'chrome') {
    imgPreview.style.filter = `grayscale(${value / 100})`;
  } else if (effect === 'sepia') {
    imgPreview.style.filter = `sepia(${value / 100})`;
  } else if (effect === 'marvin') {
    imgPreview.style.filter = `invert(${value}%)`;
  } else if (effect === 'phobos') {
    imgPreview.style.filter = `blur(${value / 100 * 3}px)`;
  } else if (effect === 'heat') {
    imgPreview.style.filter = `brightness(${value / 100 * 2 + 1})`;
  } else {
    imgPreview.style.filter = '';
  }
};

// функция для обновления уровня эффекта
const updateEffectLevel = (effect, value) => {
  effectValue.value = value;
  applyEffect(effect, value);
};

// функция для сброса уровня эффекта
const resetEffectLevel = () => {
  effectValue.value = 100;
  applyEffect(currentEffect, 100);
};

// функция для обновления эффекта
const updateEffect = (effect) => {
  currentEffect = effect;
  if (effect === 'none') {
    imgEffectLevel.classList.add('hidden');
    resetEffectLevel();
  } else {
    imgEffectLevel.classList.remove('hidden');
    resetEffectLevel();
  }
};

// обработчик события для переключения эффектов
effectsList.addEventListener('change', (evt) => {
  const effect = evt.target.value;
  updateEffect(effect);
});

// обработчик события для изменения уровня эффекта
effectSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  updateEffectLevel(currentEffect, value);
});

updateEffect(currentEffect);

export { setScale, defaultScale };


