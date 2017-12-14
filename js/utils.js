'use strict';

window.utils = {
  /**
  * Генерация случайного числа в указанном диапазоне (minValue и maxValue участвуют).
  *
  * @function getRandomInteger
  * @param {number} minValue — минимально допустимое число
  * @param {number} maxValue — максимально допустимое число
  * @return {number} — искомое случайное число
  */
  getRandomInteger: function getRandomInteger(minValue, maxValue) {
    var randomInteger = minValue + Math.random() * (maxValue + 1 - minValue);
    randomInteger = Math.floor(randomInteger);

    return randomInteger;
  }
};
