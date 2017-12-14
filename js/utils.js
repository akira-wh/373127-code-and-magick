'use strict';

/*
***********************************************************************************
***********************************************************************************
***
***                           ВСПОМОГАТЕЛЬНЫЕ УТИЛИТЫ.
***
***********************************************************************************
***********************************************************************************
*/

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
  },

  /**
  * Функция вычисления рандомного целого/дробного числа (настраиваемый диапазон)
  * @function getRandomNumber
  * @param {number} min — минимальное число (включительно)
  * @param {number} max — максимальное число (не включая)
  * @param {number} precision — необходимое количество знаков после дробной точки (опционально)
  * @return {number} — результат рандома
  */
  getRandomNumber: function getRandomNumber(min, max, precision) {
    var randomFloat = Math.random() * (max - min) + min;

    if (precision === void 0 || precision === 0 || isNaN(precision)) {
      return randomFloat;
    } else {
      return randomFloat.toFixed(precision);
    }
  },

  /**
  * Функция поиска наибольшего значения из массива
  * @function getMaxElement
  * @param {array} someArray — массив
  * @return {number} — наибольшее значение из массива
  */
  getMaxElement: function getMaxElement(someArray) {
    var maxValue = 0;

    for (var i = 0; i < someArray.length; i++) {
      if (someArray[i] > maxValue) {
        maxValue = someArray[i];
      }
    }

    return maxValue;
  }
};
