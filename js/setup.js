'use strict';

// Константы
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Библиотеки с вариантами имен, фамилий, цветов одежды и глаз
var availableNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var availableSurenames = [
  'Де Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var availableCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var availableEyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var availableFireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// Массив похожих персонажей
var similarWizards = [];
generateSimilarWizards();

/**
* Функция, заполняющая массив похожих персонажей сгенерированными объектами этих персонажей
* @function generateSimilarWizards
*/
function generateSimilarWizards() {
  for (var i = 0; i < 4; i++) {
    similarWizards[i] = {};
    similarWizards[i].name = getRandomName(availableNames, availableSurenames);
    similarWizards[i].coatColor = getRandomCoatColor(availableCoatColors);
    similarWizards[i].eyesColor = getRandomEyesColor(availableEyesColors);
  }
}

/**
* Функция получения рандомных имени и фамилии для персонажа (вызывает доп. функцию getRandomIndex)
* @function getRandomName
* @param {array} namesArray — входной массив с доступными именами
* @param {array} surenamesArray — входной массив с доступными фамилиями
* @return {string} — сгенерированные имя и фамилия
*/
function getRandomName(namesArray, surenamesArray) {
  var counterLimit = namesArray.length - 1;
  var characterName = namesArray[getRandomIndex(counterLimit)];
  var characterSurename = surenamesArray[getRandomIndex(counterLimit)];
  return characterName + ' ' + characterSurename;
}

/**
* Функция, генерирующая случайное целое число в диапазоне от 0 до установленного максимума
* @param {number} counterLimit — максимально возможное число
* @return {number} — искомое случайное число
*/
function getRandomIndex(counterLimit) {
  var result = Math.random() * (counterLimit + 1);
  result = Math.floor(result);
  return result;
}

/**
* Функция получения рандомного цвета одежды для персонажа (вызывает доп. функцию getRandomIndex)
* @function getRandomCoatColor
* @param {array} colorsArray — входной массив с доступными цветами
* @return {string} — сгенерированный цвет одежды
*/
function getRandomCoatColor(colorsArray) {
  var counterLimit = colorsArray.length - 1;
  var coatColor = colorsArray[getRandomIndex(counterLimit)];
  return coatColor;
}

/**
* Функция получения рандомного цвета глаз для персонажа (вызывает доп. функцию getRandomIndex)
* @function getRandomEyesColor
* @param {array} colorsArray — входной массив с доступными цветами
* @return {string} — сгенерированный цвет глаз
*/
function getRandomEyesColor(colorsArray) {
  var counterLimit = colorsArray.length - 1;
  var eyesColor = colorsArray[getRandomIndex(counterLimit)];
  return eyesColor;
}

//
//
// Управление окном настроек игрока (открытие\закрытие по событиям)
var playerSetup = document.querySelector('.setup');
var playerSetupOpenButton = document.querySelector('.setup-open');
var playerSetupCloseButton = playerSetup.querySelector('.setup-close');

// Открытие окна
playerSetupOpenButton.addEventListener('click', function () {
  openPlayerSetup();
});
playerSetupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPlayerSetup();
  }
});

// Закрытие окна
playerSetupCloseButton.addEventListener('click', function () {
  closePlayerSetup();
});
playerSetupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePlayerSetup();
  }
});
window.addEventListener('keydown', function (evt) {
  if (playerSetup.classList.contains('hidden') === false && evt.keyCode === ESC_KEYCODE) {
    closePlayerSetup();
  }
});

/**
* Функция, открывающая окно с настройками игрока
*/
function openPlayerSetup() {
  playerSetup.classList.remove('hidden');
}

/**
* Функция, закрывающая окно с настройками игрока
*/
function closePlayerSetup() {
  playerSetup.classList.add('hidden');
}

// Получение и заполнение данными шаблона похожих персонажей
// 4 заполненных шаблона с волшебниками уходят во fragment -> fragment в список wizardsList ->
// -> wizardsList в секцию wizardsSection -> wizardsSection отрисовывается на странице
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizardsList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

fillSimilarWizardsTemplate();
wizardsList.appendChild(fragment);

/**
* Функция, заполнящая Document Fragment данными похожих волшебников (оформленными шаблонами).
* @function fillSimilarWizardsTemplate
* @return {object} fragment — document fragment с 4-мя шаблонами
*/
function fillSimilarWizardsTemplate() {
  for (var i = 0; i < 4; i++) {
    var wizard = wizardTemplate.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = similarWizards[i].name;
    wizard.querySelector('.wizard-coat').style.fill = similarWizards[i].coatColor;
    wizard.querySelector('.wizard-eyes').style.fill = similarWizards[i].eyesColor;
    fragment.appendChild(wizard);
  }

  return fragment;
}

var wizardsSection = playerSetup.querySelector('.setup-similar');
wizardsSection.classList.remove('hidden');

// Проверка валидности пользовательских настроек персонажа
var userNameInput = playerSetup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя персонажа слишком короткое (менее 2-х символов).');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя персонажа слишком длинное (ограничение — 25 символов).');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Это поле обязательно к заполнению.');
  }
});

// Выбор цвета мантии для пользовательского персонажа
var userCoat = document.querySelector('.setup-player .wizard-coat');
var userCoatInput = document.querySelector('.setup-player input[name="coat-color"]');

userCoat.addEventListener('click', function () {
  var userCoatCurrentColor = userCoatInput.value;
  userCoatInput.value = changeColor(userCoatCurrentColor, availableCoatColors);
  userCoat.style.fill = userCoatInput.value;
});

// Выбор цвета глаз для пользовательского персонажа
var userEyes = document.querySelector('.setup-player .wizard-eyes');
var userEyesInput = document.querySelector('.setup-player input[name="eyes-color"]');

userEyes.addEventListener('click', function () {
  var userEyesCurrentColor = userEyesInput.value;
  userEyesInput.value = changeColor(userEyesCurrentColor, availableEyesColors);
  userEyes.style.fill = userEyesInput.value;
});

// Выбор цвета файерболов для пользовательского персонажа
// Главное значение цвета содержится в value у input,
// затем оно дублируется в стили обёртки и визуализируется.
var userFireball = document.querySelector('.setup-player .setup-fireball-wrap');
var userFireballInput = userFireball.querySelector('input[name="fireball-color"]');

userFireball.addEventListener('click', function () {
  var userFireballCurrentColor = userFireballInput.value;
  userFireballInput.value = changeColor(userFireballCurrentColor, availableFireballColors);
  userFireball.style.backgroundColor = userFireballInput.value;
});

/**
* Функция, менящая цвета по порядку их следования во входных массивах (loop)
* @param {object} currentColor — объект, чей цвет подлежит изменению (получение текущего цвета и замена на следующий)
* @param {array} availableColors — входной массив с доступными цветами
* @return {string} availableColors[currentIndex] — следующий цвет
*/
function changeColor(currentColor, availableColors) {
  var arrayLimitValue = availableColors.length - 1;
  var currentIndex = availableColors.indexOf(currentColor);

  if (currentIndex < arrayLimitValue && currentIndex !== -1) {
    currentIndex++;
  } else if (currentIndex === arrayLimitValue) {
    currentIndex = 0;
  } else if (currentIndex === -1) {
    currentIndex = 2;
  }

  return availableColors[currentIndex];
}
