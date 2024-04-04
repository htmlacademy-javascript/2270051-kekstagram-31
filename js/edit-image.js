const MAX_SCALE = 100; // максимальный масштаб
const MIN_SCALE = 25; // минимальный масштаб
const STEP_SCALE = 25; // шаг изменения масштаба

const photoEffects = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  ORIGINAL: 'none'
};

const scaleValue = document.querySelector('.scale__control--value'); // масштаб картинки в процентах
const btnScaleMinus = document.querySelector('.scale__control--smaller'); // кнопка "-"
const btnScalePlus = document.querySelector('.scale__control--bigger'); // кнопка "+"
const imgPreview = document.querySelector('.img-upload__preview img'); // превью загружаемой картинки
const imgEffectLevel = document.querySelector('.img-upload__effect-level'); // контейнер слайдера
const effectValue = imgEffectLevel.querySelector('.effect-level__value'); // поле для записи интенсивности эффекта на картинке
const effectSlider = imgEffectLevel.querySelector('.effect-level__slider'); // ползунок слайдера
const effectsList = document.querySelector('.effects__list'); // иконки с эффектами

const defaultScale = 100; // начальное значение масштаба
const defaultEffect = photoEffects.ORIGINAL; // начальный эффект "Оригинал"

let currentScale; // текущее значение масштаба
let currentEffect; // текущий эффект

// функция для установки масштаба изображения
const setScale = (scale) => {
  currentScale = scale;
  scaleValue.value = `${currentScale}%`;
  imgPreview.style.transform = `scale(${currentScale / MAX_SCALE})`;
};

// функция для изменения масштаба изображения
const changeScale = (deltaScale) => {
  let tempScale = currentScale;
  tempScale += deltaScale;
  if (tempScale > MAX_SCALE) {
    tempScale = MAX_SCALE;
  } else if (tempScale < MIN_SCALE) {
    tempScale = MIN_SCALE;
  }
  setScale(tempScale);
};

// обработчики событий на кнопки "+" и "-"
btnScalePlus.addEventListener('click', () => changeScale(STEP_SCALE));
btnScaleMinus.addEventListener('click', () => changeScale(-STEP_SCALE));

// инициализация слайдера
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

// функция для установки эффекта и степени насыщенности к картинке
const setEffect = (effect, value) => {
  currentEffect = effect;
  effectValue.value = value;
  switch (effect) {
    case photoEffects.CHROME:
      imgPreview.style.filter = `grayscale(${value / 100})`;
      break;
    case photoEffects.SEPIA:
      imgPreview.style.filter = `sepia(${value / 100})`;
      break;
    case photoEffects.MARVIN:
      imgPreview.style.filter = `invert(${value}%)`;
      break;
    case photoEffects.PHOBOS:
      imgPreview.style.filter = `blur(${value / 100 * 3}px)`;
      break;
    case photoEffects.HEAT:
      imgPreview.style.filter = `brightness(${value / 100 * 2 + 1})`;
      break;
    case photoEffects.ORIGINAL:
      imgEffectLevel.classList.add('hidden');
      imgPreview.style.filter = '';
      break;
  }
  if (effect !== photoEffects.ORIGINAL) {
    imgEffectLevel.classList.remove('hidden');
  }
};

// обработчик события для переключения эффектов
effectsList.addEventListener('change', (evt) => {
  const effect = evt.target.value;
  effectSlider.noUiSlider.set(100);
  setEffect(effect, 100);
});

// обработчик события для изменения уровня эффекта
effectSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  setEffect(currentEffect, value);
});

export { setScale, defaultScale, setEffect, defaultEffect };
