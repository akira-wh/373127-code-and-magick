'use strict';

// Библиотеки с вариантами имен, фамилий, цветов одежды и глаз
var availableNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var availableSurenames = ['Де Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var availableCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var availableEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// Массив персонажей, заполняющийся в цикле 4-мя похожими магами (объектами со сгенерированными свойствами)
var similarWizards = [];
generateSimilarWizards();

/**
* Функция, заполняющая массив с похожими волшебниками сгенерированными объектами этих волшебников
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

/**
* Функция, генерирующая случайное целое число от 0 и до установленного в параметре максимума
* @param {number} counterLimit — максимальное число (потолок диапазона)
* @return {number} — искомое случайное число
*/
function getRandomIndex(counterLimit) {
  return Math.round(0 - 0.5 + Math.random() * (counterLimit + 1));
}

/**
* Функция, клонирующая и заполняющая шаблон с данными похожих волшебников
* @function fillSImilarWizardsTemplate
* @return {object} fragment — document fragment с заполненными шаблонами волшебников
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

//
//
// Получение и отображение скрытого модального окна с настройками персонажей
var playerSetup = document.querySelector('.setup');
playerSetup.classList.remove('hidden');

// Получение и заполнение данными шаблона похожих персонажей
// 4 заполненных шаблона с волшебниками уходят во fragment -> fragment в список wizardsList ->
// -> wizardsList в секцию wizardsSection -> wizardsSection отрисовывается на странице
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizardsList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

fillSimilarWizardsTemplate();
wizardsList.appendChild(fragment);

var wizardsSection = playerSetup.querySelector('.setup-similar');
wizardsSection.classList.remove('hidden');
