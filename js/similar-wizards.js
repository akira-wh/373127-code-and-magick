'use strict';

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
var similarWizards = generateSimilarWizards(4);

/**
* Функция, заполняющая целевой массив сгенерированными объектами персонажей
*
* @function generateSimilarWizards
* @param {number} expectedNumber — необходимое количество сгенерированных объектов
* @return {array} — сгенерированный массив персонажей
*/
function generateSimilarWizards(expectedNumber) {
  var requestedWizards = [];

  for (var i = 0; i < expectedNumber; i++) {
    requestedWizards[i] = {
      name: getRandomName(window.libraries.AVAILABLE_NAMES, window.libraries.AVAILABLE_SURENAMES),
      coatColor: getRandomCoatColor(window.libraries.AVAILABLE_COAT_COLORS),
      eyesColor: getRandomEyesColor(window.libraries.AVAILABLE_EYES_COLORS)
    };
  }

  return requestedWizards;
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
  var characterName = namesArray[window.utils.getRandomInteger(0, counterLimit)];
  var characterSurename = surenamesArray[window.utils.getRandomInteger(0, counterLimit)];

  return characterName + ' ' + characterSurename;
}

/**
* Функция получения рандомного цвета одежды для персонажа
* @function getRandomCoatColor
* @param {array} colorsArray — входной массив с доступными цветами
* @return {string} — искомый цвет одежды
*/
function getRandomCoatColor(colorsArray) {
  var counterLimit = colorsArray.length - 1;
  var coatColor = colorsArray[window.utils.getRandomInteger(0, counterLimit)];

  return coatColor;
}

/**
* Функция получения рандомного цвета глаз для персонажа
* @function getRandomEyesColor
* @param {array} colorsArray — входной массив с доступными цветами
* @return {string} — искомый цвет глаз
*/
function getRandomEyesColor(colorsArray) {
  var counterLimit = colorsArray.length - 1;
  var eyesColor = colorsArray[window.utils.getRandomInteger(0, counterLimit)];

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
