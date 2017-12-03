'use strict';

// Константы
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Библиотеки с вариантами имен, фамилий, цветов одежды, глаз и файерболов
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


/*
***********************************************************************************
***********************************************************************************
***
***       РАБОТА С ПОХОЖИМИ ВОЛШЕБНИКАМИ (СОЗДАНИЕ, ВСТАВКА В РАЗМЕТКУ etc).
***
***********************************************************************************
***********************************************************************************
*/

// Создание и заполнение массива похожих персонажей (заполняется объектами)
var similarWizards = [];
generateSimilarWizards(4, similarWizards);

/**
* Функция, заполняющая целевой массив сгенерированными объектами персонажей
* @function generateSimilarWizards
* @param {number} expectedNumber — необходимое количество сгенерированных объектов
* @param {array} destinationArray — целевой массив для заполнения
*/
function generateSimilarWizards(expectedNumber, destinationArray) {
  for (var i = 0; i < expectedNumber; i++) {
    destinationArray[i] = {
      name: getRandomName(availableNames, availableSurenames),
      coatColor: getRandomCoatColor(availableCoatColors),
      eyesColor: getRandomEyesColor(availableEyesColors)
    };
  }
}

/**
* Функция получения рандомных имени и фамилии для персонажа
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
* Функция получения рандомного цвета одежды для персонажа
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
* Функция получения рандомного цвета глаз для персонажа
* @function getRandomEyesColor
* @param {array} colorsArray — входной массив с доступными цветами
* @return {string} — сгенерированный цвет глаз
*/
function getRandomEyesColor(colorsArray) {
  var counterLimit = colorsArray.length - 1;
  var eyesColor = colorsArray[getRandomIndex(counterLimit)];

  return eyesColor;
}

// Получение, копирование и заполнение шаблонов с похожими волшебниками
// Вставка результата в соответствующий список в разметке.
//
// 4 готовых шаблона уходят во fragment -> fragment в список wizardsList ->
// -> wizardsList в секцию wizardsSection -> wizardsSection отрисовывается пользователю
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizardsSection = document.querySelector('.setup-similar');
var wizardsList = wizardsSection.querySelector('.setup-similar-list');

wizardsList.appendChild(fillSimilarWizardsTemplate(4));
wizardsSection.classList.remove('hidden');

/**
* Функция, создающая Document Fragment и заполняющая его шаблонами персонажей.
* @function fillSimilarWizardsTemplate
* @param {number} expectedNumber — необходимое количество заполненых шаблонов во фрагменте
* @return {object} fragment — document fragment с заполненными шаблонами
*/
function fillSimilarWizardsTemplate(expectedNumber) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < expectedNumber; i++) {
    var wizard = wizardTemplate.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = similarWizards[i].name;
    wizard.querySelector('.wizard-coat').style.fill = similarWizards[i].coatColor;
    wizard.querySelector('.wizard-eyes').style.fill = similarWizards[i].eyesColor;
    fragment.appendChild(wizard);
  }

  return fragment;
}


/*
***********************************************************************************
***********************************************************************************
***
***                 УПРАВЛЕНИЕ ОКНОМ НАСТРОЕК ИГРОКА (СОБЫТИЯ etc).
***
***********************************************************************************
***********************************************************************************
*/

// Получение непосредственно окна и управляющих кнопок
var playerSetup = document.querySelector('.setup');
var playerSetupOpenButton = document.querySelector('.setup-open');
var playerSetupCloseButton = playerSetup.querySelector('.setup-close');

// Механика открытия окна
playerSetupOpenButton.addEventListener('click', function () {
  openPlayerSetup();
});
playerSetupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPlayerSetup();
  }
});

// Механика закрытие окна
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


/*
***********************************************************************************
***********************************************************************************
***
***      ОСНОВНЫЕ НАСТРОЙКИ ИГРОКА (ВЫБОР ЦВЕТОВ, ОБНОВЛЕНИЕ ЗНАЧЕНИЙ ФОРМЫ).
***
***********************************************************************************
***********************************************************************************
*/

// Выбор цвета мантии для пользовательского персонажа
// Обновление значения скрытого input формы
var userCoatCover = document.querySelector('.setup-player .wizard-coat');
var userCoatInput = document.querySelector('.setup-player input[name="coat-color"]');

userCoatCover.addEventListener('click', function () {
  var userCoatCurrentColor = userCoatInput.value;
  userCoatInput.value = changeColor(userCoatCurrentColor, availableCoatColors);
  userCoatCover.style.fill = userCoatInput.value;
});

// Выбор цвета глаз для пользовательского персонажа
// Обновление значения скрытого input формы
var userEyesCover = document.querySelector('.setup-player .wizard-eyes');
var userEyesInput = document.querySelector('.setup-player input[name="eyes-color"]');

userEyesCover.addEventListener('click', function () {
  var userEyesCurrentColor = userEyesInput.value;
  userEyesInput.value = changeColor(userEyesCurrentColor, availableEyesColors);
  userEyesCover.style.fill = userEyesInput.value;
});

// Выбор цвета файерболов для пользовательского персонажа
// Обновление значения скрытого input формы
var userFireballCover = document.querySelector('.setup-player .setup-fireball-wrap');
var userFireballInput = userFireballCover.querySelector('input[name="fireball-color"]');

userFireballCover.addEventListener('click', function () {
  var userFireballCurrentColor = userFireballInput.value;
  userFireballInput.value = changeColor(userFireballCurrentColor, availableFireballColors);
  userFireballCover.style.backgroundColor = userFireballInput.value;
});

/**
* Функция, менящая цвета по порядку их следования во входных массивах (loop)
* @param {string} currentColor — текущий цвет, подлежащий изменению
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


/*
***********************************************************************************
***********************************************************************************
***
***               ВАЛИДАЦИЯ ТЕКСТОВЫХ ДАННЫХ ПРИ НАСТРОЙКЕ ИГРОКА.
***
***********************************************************************************
***********************************************************************************
*/

// Проверка валидности имени пользователя
var userNameInput = playerSetup.querySelector('.setup-user-name');

userNameInput.addEventListener('input', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Введенное имя слишком короткое (менее 2-х символов).');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Введенное имя слишком длинное (ограничение — 25 символов).');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Это поле обязательно к заполнению.');
  } else {
    userNameInput.setCustomValidity('');
  }
});
